import { state } from "../state";

export const app = {
  //
  // State
  //

  initialized: false,

  //
  // Init/Destroy
  //

  async initialize() {
    state.browser.initialize();
    state.storage.initialize();
    state.storage.retrieveAndUpdateState();
    state.image.setImageLocalRandom();
    state.image.fetchBingImage();
    state.app.initialized = true;
  },

  destroy() {
    state.browser.destroy();
    state.storage.initialize();
  },
};
