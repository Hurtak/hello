import { Container } from "unstated";
import { getBingImageOfTheDay } from "../shared/api.js";
import * as types from "../shared/constants.js";
import * as time from "../shared/time.js";
import images from "../images/images.js";

const savedState = [
  "selectedView",
  "clockShowSeconds",
  "ageDateOfBirthTimestamp",
  "ageDateOfBirthValue",
  "imageSource",
  "settingsHidden"
];

export default class AppStateContainer extends Container {
  constructor(props) {
    super(props);

    this.state = initLocalStorage({
      // Menu states
      menuOpened: false,

      // Background image
      imageLocal: null,
      imageBing: null,

      // App settings
      selectedView: types.viewTypes.CLOCK,
      imageSource: types.imageSourceTypes.LOCAL,
      clockShowSeconds: false,
      ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
      ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),
      settingsHidden: false
    });
  }

  //
  // Image
  //

  initImage = async () => {
    // TODO: possible race condition if we switch settings multiple times?
    this._setState(state => {
      // TODO: we should not acces state directly but in setState callback
      switch (state.imageSource) {
        case types.imageSourceTypes.LOCAL: {
          return {
            imageLocal: {
              imageIndex: null,
              numberOfImages: images.length
            }
          };
        }

        case types.imageSourceTypes.BING: {
          this.fetchBingImage();
        }
      }
    });
  };

  fetchBingImage = async () => {
    await this._setState(state => ({
      imageBing: {
        ...state.imageBing,
        isFetching: true
      }
    }));

    const imageData = await getBingImageOfTheDay();
    if (!imageData.error) {
      await this._setState({
        imageBing: {
          isFetching: false,
          ...imageData.data
        }
      });
    } else {
      // TODO: handle and dispaly errors
    }
  };

  //
  // Settings
  //

  toggleMenu = async () => {
    await this._setState(state => ({
      menuOpened: !state.menuOpened
    }));
  };

  setViewType = async selectedView => {
    await this._setState({ selectedView });
  };

  setImageSource = async imageSource => {
    this._setState({ imageSource });
  };

  toggleClockShowSeconds = async () => {
    await this._setState(state => ({
      clockShowSeconds: !state.clockShowSeconds
    }));
  };

  setAgeDateOfBirth = async ({ inputValue, parsedTimestamp }) => {
    await this._setState(state => ({
      ageDateOfBirthValue: inputValue,
      ageDateOfBirthTimestamp: parsedTimestamp
        ? parsedTimestamp
        : state.ageDateOfBirthTimestamp
    }));
  };

  toggleSettingsHidden = async () => {
    await this._setState(state => ({ settingsHidden: !state.settingsHidden }));
  };

  //
  // Debug
  //

  resetAppState = async () => {
    clearLocalStorage();
    window.location.reload();
  };

  //
  // Local helper functions
  //

  _setState = async (...args) => {
    await this.setState(...args);
    saveToLocalStorage(this.state);
  };
}

function initLocalStorage(state) {
  const newState = { ...state };

  for (const [key, value] of Object.entries(newState)) {
    if (!savedState.includes(key)) continue;

    const keyLocalStorage = getPrefixedStorageKey(key);

    const savedItem = window.localStorage[keyLocalStorage];
    if (typeof savedItem === "string") {
      newState[key] = JSON.parse(savedItem);
    } else {
      window.localStorage[keyLocalStorage] = JSON.stringify(value);
    }
  }

  return newState;
}

// Local storage

const localStorageKeyPrefix = "STORAGE-";

function saveToLocalStorage(state) {
  for (const [key, value] of Object.entries(state)) {
    if (!savedState.includes(key)) continue;

    const keyLocalStorage = getPrefixedStorageKey(key);
    window.localStorage[keyLocalStorage] = JSON.stringify(value);
  }
}

function clearLocalStorage() {
  const keysToDelete = Object.keys(window.localStorage).filter(key =>
    key.startsWith(localStorageKeyPrefix)
  );

  for (const key of keysToDelete) {
    delete window.localStorage[key];
  }
}

function getPrefixedStorageKey(key) {
  return localStorageKeyPrefix + key;
}

// Misc functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
