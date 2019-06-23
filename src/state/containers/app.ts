import { state } from "../state";
import { LogPerformance } from "../../utils/logging";
import { loadAndInjectFonts } from "../../styles/fonts";

export const app = {
  //
  // State
  //

  initialized: false,

  //
  // Init/Destroy
  //

  async initialize() {
    const performanceAppStateInit = new LogPerformance("App state init");
    state.browser.initialize();
    state.storage.initialize();
    state.storage.retrieveAndUpdateState();
    state.image.setImageLocalRandom();
    state.image.fetchBingImage();
    performanceAppStateInit.measure();

    const performanceFonts = new LogPerformance("Fonts");
    await loadAndInjectFonts();
    performanceFonts.measure();

    state.app.initialized = true;
  },

  destroy() {
    state.browser.destroy();
    state.storage.initialize();
  },
};
