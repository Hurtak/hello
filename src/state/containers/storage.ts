import { state, State } from "../state";

const localStorageKey = "__helloAppState";

type SavedState = {
  imageSource: State["image"]["imageSource"];
  imageBingCached: State["image"]["imageBingCached"];

  selectedView: State["settings"]["selectedView"];
  clockShowSeconds: State["settings"]["clockShowSeconds"];
  ageDateOfBirthTimestamp: State["settings"]["ageDateOfBirthTimestamp"];
  ageDateOfBirthInputValue: State["settings"]["ageDateOfBirthInputValue"];
  settingsHidden: State["settings"]["settingsHidden"];
};

export const storage = {
  //
  // Actions
  //

  save(): void {
    const savedState: SavedState = {
      imageSource: state.image.imageSource,
      imageBingCached: state.image.imageBingCached,

      selectedView: state.settings.selectedView,
      clockShowSeconds: state.settings.clockShowSeconds,
      ageDateOfBirthTimestamp: state.settings.ageDateOfBirthTimestamp,
      ageDateOfBirthInputValue: state.settings.ageDateOfBirthInputValue,
      settingsHidden: state.settings.settingsHidden
    };

    try {
      const serializedState = JSON.stringify(savedState);
      window.localStorage.setItem(localStorageKey, serializedState);
    } catch (err) {
      console.warn("Error saving app state to local storage", err);
    }
  },

  retrieveAndUpdateState(): void {
    const savedState: SavedState = (() => {
      try {
        const serializedState = window.localStorage.getItem(localStorageKey);
        if (!serializedState) return null;
        return JSON.parse(serializedState);
      } catch (err) {
        console.warn(
          "Error retrieving saved app state from local storage",
          err
        );
        return null;
      }
    })();

    if (!savedState) return;

    const stateValid = [
      savedState.imageSource,
      savedState.imageBingCached,
      savedState.selectedView,
      savedState.clockShowSeconds,
      savedState.ageDateOfBirthTimestamp,
      savedState.ageDateOfBirthInputValue,
      savedState.settingsHidden
    ].every(state => state !== undefined);

    if (!stateValid) {
      console.warn("Error validating state retrieved from local storage");
      state.storage.clear();
      return;
    }

    state.image.imageSource = savedState.imageSource;
    state.image.imageBingCached = savedState.imageBingCached;
    state.settings.selectedView = savedState.selectedView;
    state.settings.clockShowSeconds = savedState.clockShowSeconds;
    state.settings.ageDateOfBirthTimestamp = savedState.ageDateOfBirthTimestamp;
    state.settings.ageDateOfBirthInputValue =
      savedState.ageDateOfBirthInputValue;
    state.settings.settingsHidden = savedState.settingsHidden;
  },

  clear(): void {
    try {
      window.localStorage.removeItem(localStorageKey);
    } catch (err) {
      console.warn("Error clearing app state from local storage", err);
    }
  },

  //
  // Init/Destroy
  //

  initialize() {
    window.addEventListener("beforeunload", beforeUnload);
  },

  destroy() {
    window.removeEventListener("beforeunload", beforeUnload);
  }
};

function beforeUnload() {
  if (!state.settings.scheduledAppReset) {
    state.storage.save();
  }
  state.settings.scheduledAppReset = false;
}
