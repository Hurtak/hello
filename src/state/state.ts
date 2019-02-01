import { store } from "react-easy-state";
// import { clearStorage } from "../state/middleware-local-storage"; // TODO
import { images, IImage } from "../images/images";
import * as types from "../shared/types";
import { getRandomInt } from "../shared/random";
import { getBingImageOfTheDay } from "../shared/api";
import * as time from "../shared/time";

type State = {
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
};

type Computed = {
  imagesLocal: IImage[];
  imageLocal: IImage;
  imageSourceWithFallback: types.ImageSource | null;
  imageUrl: string | null;
};

type Actions = {
  toggleMenu: () => void;
  setImageLocalRandom: () => void;
  shiftImageLocalIndex: (direction: -1 | 1) => void;
  setImageLocalIndex: (index: number) => void;
  setSelectedView: (selectedView: any) => void;
  setImageSource: (imageSource: any) => void;
  toggleClockShowSeconds: () => void;
  setAgeDateOfBirth: (params: any) => void; // TODO: rename params?
  toggleSettingsHidden: () => void;
  resetAppState: () => void;
};

type Effects = {
  appInit: () => void;
};

const getInitialState = (): State => ({
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
});

type Store = State & Computed & Actions & Effects;

console.log("a");
export const state: Store = store<Store>({
  ...getInitialState(),

  //
  // Computed
  //
  get imagesLocal() {
    return images;
  },

  get imageLocal() {
    debugger;
    console.log("d");

    // return state.imagesLocal[state.imageLocalIndex];
    return this.imagesLocal[this.imageLocalIndex];
  },

  get imageSourceWithFallback() {
    switch (this.imageSource) {
      case "LOCAL":
        return "LOCAL";
      case "BING":
        if (!this.online) return "LOCAL";
        if (this.imageBing && this.imageBing.type === "ERROR") return "LOCAL";
        return "BING";
      default:
        return null;
    }
  },

  get imageUrl() {
    // TODO: maybe display cached image if it would be possible?
    return null;
    // TODO;

    // const urlLocal = this.imageLocal.url;
    // switch (this.imageSourceWithFallback) {
    //   case "LOCAL":
    //     return urlLocal;
    //   case "BING":
    //     switch (this.imageBing.type) {
    //       case "DONE":
    //         return this.imageBing.data.url;
    //       default:
    //         return null;
    //     }
    //   default:
    //     return null;
    // }
  },

  //
  // Actions
  //

  toggleMenu() {
    state.menuOpened = !state.menuOpened;
  },

  setImageLocalRandom() {
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
  },

  shiftImageLocalIndex(direction: -1 | 1) {
    let index = state.imageLocalIndex + direction;
    if (index > state.imagesLocal.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = state.imagesLocal.length - 1;
    }

    state.imageLocalIndex = index;
  },

  setImageLocalIndex(index: number) {
    state.imageLocalIndex = index;
  },

  setSelectedView(selectedView: types.View) {
    state.selectedView = selectedView;
  },

  setImageSource(imageSource: types.ImageSource) {
    state.imageSource = imageSource;
  },

  toggleClockShowSeconds() {
    state.clockShowSeconds = !state.clockShowSeconds;
  },

  setAgeDateOfBirth({ inputValue, parsedTimestamp }: any) {
    state.ageDateOfBirthValue = inputValue;
    if (parsedTimestamp) {
      state.ageDateOfBirthTimestamp = parsedTimestamp;
    }
  },

  toggleSettingsHidden() {
    state.settingsHidden = !state.settingsHidden;
  },

  resetAppState() {
    // TODO
    const initialState = getInitialState();
    for (const [key, value] of Object.entries(initialState)) {
      // TODO
      // appStateNew[key] = value;
    }

    // clearStorage();
    window.location.reload();
  },

  //
  // Effects
  //

  async appInit() {
    console.log("c");
    // TODO: we should not acces state directly but in setState callback?
    // TODO: possible race condition if we switch settings multiple times?
    switch (state.imageSourceWithFallback) {
      case "LOCAL": {
        state.setImageLocalRandom();
        break;
      }

      case "BING": {
        state.imageBing = { type: "FETCHING" };
        const imageData = await getBingImageOfTheDay();
        state.imageBing = imageData;
        break;
      }

      default:
    }
  }
});
