import { Container } from "unstated";
import { getBingImageOfTheDay } from "../shared/api";
import * as time from "../shared/time";
import * as types from "../shared/types";
import images from "../images/images";

const savedState = [
  "selectedView",
  "clockShowSeconds",
  "ageDateOfBirthTimestamp",
  "ageDateOfBirthValue",
  "imageSource",
  "settingsHidden"
];

export default class AppStateContainer extends Container<any> {
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
    selectedView: "CLOCK",
    imageSource: "BING",
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
      get imageSourceWithFallback(): types.ImageSource | null {
        switch (app.state.imageSource) {
          case "LOCAL":
            return "LOCAL";
          case "BING":
            if (!app.state.online) return "LOCAL";
            if (app.state.imageBing && app.state.imageBing.error === true)
              return "LOCAL";
            return "BING";
          default:
            return null;
        }
      },
      get imageUrl() {
        // TODO: maybe display cached image if it would be possible?

        const urlLocal = app.computed.imageLocal.url;
        switch (app.computed.imageSourceWithFallback) {
          case "LOCAL":
            return urlLocal;
          case "BING":
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
      case "LOCAL": {
        this.setImageLocalRandom();
        break;
      }

      case "BING": {
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

  shiftImageLocalIndex = async (change: number) => {
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

function getPrefixedStorageKey(key: string): string {
  return localStorageKeyPrefix + key;
}

// Misc functions

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}