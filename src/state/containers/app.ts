import { state } from "../state";

export const app = {
  //
  // State
  //

  initialized: false,

  //
  // Actions
  //

  async loadImage() {
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
  },

  //
  // Init/Destroy
  //

  async initialize() {
    state.browser.initialize();
    state.storage.initialize();
    state.storage.retrieveAndUpdateState();
    await state.app.loadImage();
    state.app.initialized = true;
  },

  destroy() {
    state.browser.destroy();
    state.storage.initialize();
  }
};
