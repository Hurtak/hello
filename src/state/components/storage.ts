import { config } from "../../config";
import { logWarning } from "../../utils/logging";
import { state, State } from "..";

type SavedState = {
  version: number;

  debug: {
    rememberSettingsOpened: State["debug"]["rememberSettingsOpened"];
  };

  image: {
    imageSource: State["image"]["imageSource"];
    imageBingCached: State["image"]["imageBingCached"];
  };

  settings: {
    opened: State["settings"]["opened"];
    selectedView: State["settings"]["selectedView"];
    clockShowSeconds: State["settings"]["clockShowSeconds"];
    ageDateOfBirthTimestamp: State["settings"]["ageDateOfBirthTimestamp"];
    ageDateOfBirthInputValue: State["settings"]["ageDateOfBirthInputValue"];
    cleanVersion: State["settings"]["cleanVersion"];
  };
};

export const storage = {
  //
  // Actions
  //

  initialize(): void {
    window.addEventListener("beforeunload", () => {
      if (!state.debug.scheduledAppReset) {
        state.storage.save();
      }
      state.debug.scheduledAppReset = false;
    });
    state.storage.retrieveAndUpdateState();
  },

  save(): void {
    const savedState: SavedState = {
      // Version of local storage SavedState object, not used at the moment but might come in handy if we change
      // the structure in the future and want to detect the version or do some migrations
      version: 1,

      debug: {
        rememberSettingsOpened: state.debug.rememberSettingsOpened,
      },

      image: {
        imageSource: state.image.imageSource,
        imageBingCached: state.image.imageBingCached,
      },

      settings: {
        opened: state.settings.opened,
        selectedView: state.settings.selectedView,
        clockShowSeconds: state.settings.clockShowSeconds,
        ageDateOfBirthTimestamp: state.settings.ageDateOfBirthTimestamp,
        ageDateOfBirthInputValue: state.settings.ageDateOfBirthInputValue,
        cleanVersion: state.settings.cleanVersion,
      },
    };

    try {
      const serializedState = JSON.stringify(savedState);
      window.localStorage.setItem(config.localStorageKey, serializedState);
    } catch (err) {
      logWarning("Error saving app state to local storage", err);
    }
  },

  retrieveAndUpdateState(): void {
    const savedState: SavedState = (() => {
      try {
        const serializedState = window.localStorage.getItem(config.localStorageKey);
        if (!serializedState) return null;
        return JSON.parse(serializedState);
      } catch (err) {
        logWarning("Error retrieving saved app state from local storage", err);
        return null;
      }
    })();

    if (!savedState) return;

    const stateValid = [
      savedState.debug.rememberSettingsOpened,

      savedState.image.imageSource,
      savedState.image.imageBingCached,

      savedState.settings.opened,
      savedState.settings.selectedView,
      savedState.settings.clockShowSeconds,
      savedState.settings.ageDateOfBirthTimestamp,
      savedState.settings.ageDateOfBirthInputValue,
      savedState.settings.cleanVersion,
    ].every(state => state != null);

    if (!stateValid) {
      logWarning("Error validating state retrieved from local storage", savedState);
      state.storage.clear();
      return;
    }

    state.debug.rememberSettingsOpened = savedState.debug.rememberSettingsOpened;

    state.image.imageSource = savedState.image.imageSource;
    state.image.imageBingCached = savedState.image.imageBingCached;

    if (state.debug.rememberSettingsOpened) {
      state.settings.opened = savedState.settings.opened;
    }
    state.settings.selectedView = savedState.settings.selectedView;
    state.settings.clockShowSeconds = savedState.settings.clockShowSeconds;
    state.settings.ageDateOfBirthTimestamp = savedState.settings.ageDateOfBirthTimestamp;
    state.settings.ageDateOfBirthInputValue = savedState.settings.ageDateOfBirthInputValue;
    state.settings.cleanVersion = savedState.settings.cleanVersion;
  },

  clear(): void {
    try {
      window.localStorage.removeItem(config.localStorageKey);
    } catch (err) {
      logWarning("Error clearing app state from local storage", err);
    }
  },
};
