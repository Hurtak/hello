import { Container } from "unstated";
import * as types from "../shared/constants.js";
import * as time from "../shared/time.js";

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

      // App settings
      selectedView: types.viewTypes.CLOCK,

      imageSource: types.imageSourceTypes.LOCAL,

      clockShowSeconds: false,

      ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
      ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),

      settingsHidden: false
    });
  }

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

  resetAppState = async () => {
    clearLocalStorage();
    window.location.reload();
  };

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
