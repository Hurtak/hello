const prefix = "_XXX_";

export function initLocalStorage(keysToSave, state) {
  const newState = { ...state };

  for (const [key, value] of Object.entries(newState)) {
    if (!keysToSave.includes(key)) continue;

    const keyLocalStorage = `${prefix}${key}`;

    const savedItem = window.localStorage[keyLocalStorage];
    if (typeof savedItem === "string") {
      newState[key] = JSON.parse(savedItem);
    } else {
      window.localStorage[keyLocalStorage] = JSON.stringify(value);
    }
  }

  return newState;
}

export function saveToLocalStorage(keysToSave, state) {
  for (const [key, value] of Object.entries(state)) {
    if (!keysToSave.includes(key)) continue;

    const keyLocalStorage = `${prefix}${key}`;
    window.localStorage[keyLocalStorage] = JSON.stringify(value);
  }
}
