import * as time from "../shared/time";
import * as types from "../shared/types";

export interface IState {
  // Browser state
  online: boolean;

  // Menu states
  menuOpened: boolean;

  // Background image
  imageLocalIndex: number;
  imageBing: types.HttpData<{
    url: string;
    title?: string;
    link?: string;
    description: string;
  }>;

  // App settings
  selectedView: types.View;
  imageSource: types.ImageSource;
  clockShowSeconds: boolean;
  ageDateOfBirthTimestamp: number;
  ageDateOfBirthValue: string;
  settingsHidden: boolean;
}

export const getInitialState = () => {
  const initialState: IState = {
    // Browser state
    online: navigator.onLine,

    // Menu states
    menuOpened: false,

    // Background image
    imageLocalIndex: 0,
    imageBing: { type: "INITIAL" },

    // App settings
    selectedView: "CLOCK",
    imageSource: "LOCAL",
    clockShowSeconds: false,
    ageDateOfBirthTimestamp: Date.UTC(1990, 0, 1),
    ageDateOfBirthValue: time.timestampToDateInputValue(Date.UTC(1990, 0, 1)),
    settingsHidden: false
  };

  return initialState;
};

export const savedState: (keyof IState)[] = [
  "selectedView",
  "imageSource",
  "clockShowSeconds",
  "ageDateOfBirthTimestamp",
  "ageDateOfBirthValue",
  "settingsHidden"
];
