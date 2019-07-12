import { getBingImageOfTheDay, HttpData, BingData } from "../../utils/api";
import { getRandomInt } from "../../utils/random";
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

  get imageSourceWithFallback(): ImageSource | null {
    switch (state.image.imageSource) {
      case "LOCAL":
        return "LOCAL";
      case "BING":
        if (!state.browser.online) {
          return "LOCAL";
        } else if (state.image.imageBingCached) {
          return "BING";
        } else if (state.image.imageBing && state.image.imageBing.type === "ERROR") {
          return "LOCAL";
        } else {
          return "BING";
        }

      default:
        return null;
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
        switch (state.image.imageBing.type) {
          case "DONE":
            return state.image.imageBing.data.url;
          default:
            return null;
        }
      default:
        return null;
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
    }
  },

  setImageSource(imageSource: ImageSource): void {
    state.image.imageSource = imageSource;
    if (imageSource === "BING") {
      if (state.image.imageBing.type === "INITIAL" || state.image.imageBing.type === "ERROR") {
        state.image.fetchBingImage();
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
