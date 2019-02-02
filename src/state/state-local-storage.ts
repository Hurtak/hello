import { state, State } from "./state";

const localStorageKey = "__helloAppState";

type SavedState = {
  imageSource: State["image"]["imageSource"];
  selectedView: State["settings"]["selectedView"];
  clockShowSeconds: State["settings"]["clockShowSeconds"];
  ageDateOfBirthTimestamp: State["settings"]["ageDateOfBirthTimestamp"];
  ageDateOfBirthInputValue: State["settings"]["ageDateOfBirthInputValue"];
  settingsHidden: State["settings"]["settingsHidden"];
};

export const stateLocalStorage = {
  save(): void {
    const savedState: SavedState = {
      imageSource: state.image.imageSource,
      selectedView: state.settings.selectedView,
      clockShowSeconds: state.settings.clockShowSeconds,
      ageDateOfBirthTimestamp: state.settings.ageDateOfBirthTimestamp,
      ageDateOfBirthInputValue: state.settings.ageDateOfBirthInputValue,
      settingsHidden: state.settings.settingsHidden
    };

    try {
      const serializedState = JSON.stringify(savedState);
      localStorage.setItem(localStorageKey, serializedState);
    } catch (err) {
      console.warn("Error saving app state to local storage", err);
    }
  },

  retrieve(): void {
    const savedState: SavedState = (() => {
      try {
        const serializedState = localStorage.getItem(localStorageKey);
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
      savedState.selectedView,
      savedState.clockShowSeconds,
      savedState.ageDateOfBirthTimestamp,
      savedState.ageDateOfBirthInputValue,
      savedState.settingsHidden
    ].every(state => state !== undefined);

    if (!stateValid) {
      console.warn("Error validating state retrieved from local storage");
      state.localStorage.clear();
      return;
    }

    state.image.imageSource = savedState.imageSource;
    state.settings.selectedView = savedState.selectedView;
    state.settings.clockShowSeconds = savedState.clockShowSeconds;
    state.settings.ageDateOfBirthTimestamp = savedState.ageDateOfBirthTimestamp;
    state.settings.ageDateOfBirthInputValue =
      savedState.ageDateOfBirthInputValue;
    state.settings.settingsHidden = savedState.settingsHidden;
  },

  clear(): void {
    try {
      localStorage.removeItem(localStorageKey);
    } catch (err) {
      console.warn("Error clearing app state from local storage", err);
    }
  }
};

window.addEventListener("beforeunload", () => {
  if (!state.settings.scheduledAppReset) {
    state.localStorage.save();
  }
  state.settings.scheduledAppReset = false;
});
