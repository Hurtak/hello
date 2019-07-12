import { config } from "../../config";
import { logWarning } from "../../utils/logging";
import { state, State } from "..";

type SavedState = {
  version: number;

  rememberSettingsOpened: State["debug"]["rememberSettingsOpened"];

  imageSource: State["image"]["imageSource"];
  imageBingCached: State["image"]["imageBingCached"];

  opened: State["settings"]["opened"];
  selectedView: State["settings"]["selectedView"];
  clockShowSeconds: State["settings"]["clockShowSeconds"];
  ageDateOfBirthTimestamp: State["settings"]["ageDateOfBirthTimestamp"];
  ageDateOfBirthInputValue: State["settings"]["ageDateOfBirthInputValue"];
  cleanVersion: State["settings"]["cleanVersion"];
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

      rememberSettingsOpened: state.debug.rememberSettingsOpened,

      imageSource: state.image.imageSource,
      imageBingCached: state.image.imageBingCached,

      opened: state.settings.opened,
      selectedView: state.settings.selectedView,
      clockShowSeconds: state.settings.clockShowSeconds,
      ageDateOfBirthTimestamp: state.settings.ageDateOfBirthTimestamp,
      ageDateOfBirthInputValue: state.settings.ageDateOfBirthInputValue,
      cleanVersion: state.settings.cleanVersion,
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
      savedState.rememberSettingsOpened,

      savedState.imageSource,
      savedState.imageBingCached,

      savedState.opened,
      savedState.selectedView,
      savedState.clockShowSeconds,
      savedState.ageDateOfBirthTimestamp,
      savedState.ageDateOfBirthInputValue,
      savedState.cleanVersion,
    ].every(state => state != null);

    if (!stateValid) {
      logWarning("Error validating state retrieved from local storage", savedState);
      state.storage.clear();
      return;
    }

    state.debug.rememberSettingsOpened = savedState.rememberSettingsOpened;

    state.image.imageSource = savedState.imageSource;
    state.image.imageBingCached = savedState.imageBingCached;

    if (state.debug.rememberSettingsOpened) {
      state.settings.opened = savedState.opened;
    }
    state.settings.selectedView = savedState.selectedView;
    state.settings.clockShowSeconds = savedState.clockShowSeconds;
    state.settings.ageDateOfBirthTimestamp = savedState.ageDateOfBirthTimestamp;
    state.settings.ageDateOfBirthInputValue = savedState.ageDateOfBirthInputValue;
    state.settings.cleanVersion = savedState.cleanVersion;
  },

  clear(): void {
    try {
      window.localStorage.removeItem(config.localStorageKey);
    } catch (err) {
      logWarning("Error clearing app state from local storage", err);
    }
  },
};
