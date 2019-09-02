import { getBingImageOfTheDay, HttpData, BingData } from "../../utils/api";
import { getRandomInt } from "../../utils/random";
import { never } from "../../utils/never";
import { images, Image } from "../../images";
import { state } from "..";

type ImageSource = "LOCAL" | "BING";

export const image = {
  //
  // State
  //

  imageSource: "BING" as ImageSource,

  imageLocalIndex: 0,

  imageBing: { type: "INITIAL" } as HttpData<BingData>,
  imageBingCached: null as BingData | null,

  //
  // Computed
  //

  get imagesLocal(): Image[] {
    return images;
  },

  get imageLocal(): Image {
    return state.image.imagesLocal[state.image.imageLocalIndex];
  },

  get imageBingWithFallback(): BingData | null {
    if (state.image.imageBing.type === "DONE") {
      return state.image.imageBing.data;
    } else if (state.image.imageBingCached) {
      return state.image.imageBingCached;
    }
    return null;
  },

  get imageSourceWithFallback(): ImageSource {
    switch (state.image.imageSource) {
      case "LOCAL":
        return "LOCAL";

      case "BING":
        if (!state.browser.online) {
          return "LOCAL";
        } else {
          return "BING";
        }

      default:
        return never(state.image.imageSource);
    }
  },

  get imageUrl(): string | null {
    // TODO: maybe display cached image if it would be possible?

    const urlLocal = state.image.imageLocal.url;
    switch (state.image.imageSourceWithFallback) {
      case "LOCAL":
        return urlLocal;

      case "BING":
        if (state.image.imageBingCached) {
          return state.image.imageBingCached.url;
        }

        // TODO: does this branch do anything?
        switch (state.image.imageBing.type) {
          case "DONE":
            return state.image.imageBing.data.url;
          case "INITIAL":
          case "FETCHING":
          case "ERROR":
            return null;
          default:
            return never(state.image.imageBing);
        }

      default:
        return never(state.image.imageSourceWithFallback);
    }
  },

  //
  // Actions
  //

  initialize(): void {
    state.image.setImageLocalRandom();
    state.image.fetchBingImage();
  },

  async fetchBingImage(): Promise<void> {
    state.image.imageBing = { type: "FETCHING" };
    const imageData = await getBingImageOfTheDay();

    state.image.imageBing = imageData;
    switch (state.image.imageBing.type) {
      case "DONE":
        state.image.imageBingCached = state.image.imageBing.data;
        break;
      case "INITIAL":
      case "FETCHING":
      case "ERROR":
        break;
      default:
        never(state.image.imageBing);
    }
  },

  setImageSource(imageSource: ImageSource): void {
    state.image.imageSource = imageSource;

    switch (imageSource) {
      case "BING": {
        switch (state.image.imageBing.type) {
          case "INITIAL":
          case "ERROR": {
            state.image.fetchBingImage();
            break;
          }
          case "FETCHING":
          case "DONE": {
            break;
          }
          default: {
            never(state.image.imageBing);
          }
        }
        break;
      }
      case "LOCAL": {
        break;
      }
      default: {
        never(imageSource);
      }
    }
  },

  setImageLocalRandom() {
    const numberOfImages = state.image.imagesLocal.length;

    const index: number = (() => {
      const getIndex = () => getRandomInt(0, numberOfImages - 1);

      if (numberOfImages < 2 || state.image.imageLocalIndex === null) {
        return getIndex();
      }

      while (true) {
        const index = getIndex();
        if (index !== state.image.imageLocalIndex) {
          return index;
        }
      }
    })();

    state.image.imageLocalIndex = index;
  },

  shiftImageLocalIndex(direction: -1 | 1): void {
    let index = state.image.imageLocalIndex + direction;
    if (index > state.image.imagesLocal.length - 1) {
      index = 0;
    } else if (index < 0) {
      index = state.image.imagesLocal.length - 1;
    }

    state.image.imageLocalIndex = index;
  },
};
