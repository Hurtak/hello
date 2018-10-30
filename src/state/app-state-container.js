import { Container } from "unstated";
import { getBingImageOfTheDay } from "../shared/api.js";
import * as constants from "../shared/constants.js";
import * as time from "../shared/time.js";
import images from "../images/images.ts";

const savedState = [
  "selectedView",
  "clockShowSeconds",
  "ageDateOfBirthTimestamp",
  "ageDateOfBirthValue",
  "imageSource",
  "settingsHidden"
];

export default class AppStateContainer extends Container {
  state = initLocalStorage({
    // Browser state
    online: navigator.onLine,

    // Menu states
    menuOpened: false,

    // Background image
    imageLocalIndex: null,
    imageBing: null,
    imageBingFetching: false,

    // App settings
    selectedView: constants.viewTypes.CLOCK,
    imageSource: constants.imageSourceTypes.BING,
    clockShowSeconds: false,
    ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
    ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),
    settingsHidden: false
  });

  get computed() {
    const app = this;

    return {
      imagesLocal: images,
      get imageLocal() {
        return images[app.state.imageLocalIndex || 0];
      },
      get imageSourceWithFallback() {
        switch (app.state.imageSource) {
          case constants.imageSourceTypes.LOCAL:
            return constants.imageSourceTypes.LOCAL;
          case constants.imageSourceTypes.BING:
            if (!app.state.online) return constants.imageSourceTypes.LOCAL;
            if (app.state.imageBing && app.state.imageBing.error === true)
              return constants.imageSourceTypes.LOCAL;
            return constants.imageSourceTypes.BING;
          default:
            return null;
        }
      },
      get imageUrl() {
        // TODO: maybe display cached image if it would be possible?

        const urlLocal = app.computed.imageLocal.url;
        switch (app.computed.imageSourceWithFallback) {
          case constants.imageSourceTypes.LOCAL:
            return urlLocal;
          case constants.imageSourceTypes.BING:
            if (app.state.imageBingFetching === true) return null;
            if (!app.state.imageBing) return null;
            return app.state.imageBing.data.url;
          default:
            return null;
        }
      }
    };
  }

  //
  // Image
  //

  initImage = async () => {
    // TODO: we should not acces state directly but in setState callback?
    // TODO: possible race condition if we switch settings multiple times?
    switch (this.computed.imageSourceWithFallback) {
      case constants.imageSourceTypes.LOCAL: {
        this.setImageLocalRandom();
        break;
      }

      case constants.imageSourceTypes.BING: {
        this.fetchImageBing();
        break;
      }

      default:
    }
  };

  // Image - Bing

  fetchImageBing = async () => {
    await this._setState({
      imageBingFetching: true
    });

    const imageData = await getBingImageOfTheDay();
    await this._setState({
      imageBing: imageData,
      imageBingFetching: false
    });
  };

  // Image - Local

  shiftImageLocalIndex = async change => {
    await this._setImageLocalIndex(state => {
      let newIndex = state.imageLocalIndex + change;
      if (newIndex > this.computed.imagesLocal.length - 1) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = this.computed.imagesLocal.length - 1;
      }

      return newIndex;
    });
  };

  setImageLocalRandom = () => {
    this._setImageLocalIndex(state => {
      const numberOfImages = this.computed.imagesLocal.length;

      const index = (() => {
        const getIndex = () => getRandomInt(0, numberOfImages - 1);

        if (numberOfImages < 2 || state.imageLocalIndex === null) {
          return getIndex();
        }

        while (true) {
          const index = getIndex();
          if (index !== state.imageLocalIndex) {
            return index;
          }
        }
      })();

      return index;
    });
  };

  _setImageLocalIndex = async cb => {
    await this._setState(state => {
      const newIndex = cb(state);

      return {
        imageLocalIndex: newIndex
      };
    });
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

// Local storage

const localStorageKeyPrefix = "STORAGE-";

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
