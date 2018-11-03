const savedState = [
  "selectedView",
  "clockShowSeconds",
  "ageDateOfBirthTimestamp",
  "ageDateOfBirthValue",
  "imageSource",
  "settingsHidden"
];

// Local storage

const localStorageKeyPrefix = "STORAGE-";

function initLocalStorage(state: any) {
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

function saveToLocalStorage(state: any) {
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
