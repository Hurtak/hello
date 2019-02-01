import pick from "lodash/pick";
import merge from "lodash/merge";
import throttle from "lodash/throttle";

const localStorageKey = "__helloAppState";
const throttleMs = 500;

let firstRun = true;

const saveState = throttle((savedState: string[], store: any) => {
  const state = store.getState().app;
  const filteredState = pick(state, savedState);
  saveToLocalStorage(filteredState);
}, throttleMs);

const addListeners = () => {
  window.addEventListener("beforeunload", () => {
    saveState.flush();
  });
};

export const middlewareLocalStorage = (savedState: any) => (store: any) => (
  next: any
) => (action: any) => {
  if (firstRun) {
    addListeners();
    firstRun = false;
  }

  const nextState = next(action);
  saveState(savedState, store);
  return nextState;
};

export const loadState = (defaultState: any) => {
  const savedState = loadFromLocalStorage();
  return merge(defaultState, savedState);
};

export function clearStorage() {
  try {
    localStorage.removeItem(localStorageKey);
  } catch (err) {
    console.log(err);
  }
}

function saveToLocalStorage(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return null;
  }
}
