import { LogPerformance } from "../../utils/logging";
import { loadAndInjectFonts } from "../../styles";
import { state } from "..";

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
    state.image.initialize();
    performanceAppStateInit.measure();

    const performanceFonts = new LogPerformance("Fonts");
    await loadAndInjectFonts();
    performanceFonts.measure();

    state.app.initialized = true;
  },
};
