import { state } from "./state";

export const stateApp = {
  initialized: false,

  async init() {
    state.localStorage.retrieve();

    switch (state.image.imageSourceWithFallback) {
      case "LOCAL": {
        state.image.setImageLocalRandom();
        break;
      }

      case "BING": {
        state.image.fetchBingImage();
        break;
      }
    }

    state.app.initialized = true;
  }
};
