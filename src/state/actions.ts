import { getRandomInt } from "../shared/random";
import { clearStorage } from "./middleware-local-storage";
import { IState, getInitialState } from "./state";

export const imageBindFetch = (state: IState) => {
  state.imageBing = { type: "FETCHING" };
};

export const imageBindFetched = (
  state: IState,
  imageData: IState["imageBing"]
) => {
  state.imageBing = imageData;
};

export const shiftImageLocalIndex = (state: any, direction: -1 | 1) => {
  let index = state.imageLocalIndex + direction;
  if (index > state.imagesLocal.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = state.imagesLocal.length - 1;
  }

  state.imageLocalIndex = index;
};

export const setImageLocalRandom = (state: any) => {
  const numberOfImages = state.imagesLocal.length;

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

  state.imageLocalIndex = index;
};

export const setImageLocalIndex = (state: any, index: number) => {
  state.imageLocalIndex = index;
};

export const toggleMenu = (state: any) => {
  state.menuOpened = !state.menuOpened;
};

export const setViewType = (state: any, selectedView: any) => {
  state.selectedView = selectedView;
};

export const setImageSource = (state: any, imageSource: any) => {
  state.imageSource = imageSource;
};

export const toggleClockShowSeconds = (state: any) => {
  state.clockShowSeconds = !state.clockShowSeconds;
};

export const setAgeDateOfBirth = (
  state: any,
  { inputValue, parsedTimestamp }: any
) => {
  state.ageDateOfBirthValue = inputValue;
  if (parsedTimestamp) {
    state.ageDateOfBirthTimestamp = parsedTimestamp;
  }
};

export const toggleSettingsHidden = (state: any) => {
  state.settingsHidden = !state.settingsHidden;
};

export const resetAppState = (state: any) => {
  const initialState = getInitialState();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }

  clearStorage();
  window.location.reload();
};
