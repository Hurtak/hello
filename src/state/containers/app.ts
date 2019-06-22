import { state } from "../state";
import { PerfTimer } from "../../utils/perf-log";
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
    const measureAppState = new PerfTimer("App state init");
    state.browser.initialize();
    state.storage.initialize();
    state.storage.retrieveAndUpdateState();
    state.image.setImageLocalRandom();
    state.image.fetchBingImage();
    measureAppState.measure();

    const measureFonts = new PerfTimer("Fonts");
    await loadAndInjectFonts();
    measureFonts.measure();

    state.app.initialized = true;
  },

  destroy() {
    state.browser.destroy();
    state.storage.initialize();
  },
};
