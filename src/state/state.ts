import { store } from "react-easy-state";
// import { clearStorage } from "../state/middleware-local-storage"; // TODO
import { stateBrowser } from "./state-browser";
import { stateImage } from "./state-image";
import { stateSettings } from "./state-settings";
import { getBingImageOfTheDay } from "../shared/api";

type Store = {
  browser: typeof stateBrowser;
  settings: typeof stateSettings;
  image: typeof stateImage;

  appInit: () => void;
};

export const state: Store = store<Store>({
  browser: stateBrowser,
  image: stateImage,
  settings: stateSettings,

  async appInit() {
    // TODO: we should not acces state directly but in setState callback?
    // TODO: possible race condition if we switch settings multiple times?
    switch (state.image.imageSourceWithFallback) {
      case "LOCAL": {
        state.image.setImageLocalRandom();
        break;
      }

      case "BING": {
        state.image.imageBing = { type: "FETCHING" };
        const imageData = await getBingImageOfTheDay();
        state.image.imageBing = imageData;
        break;
      }

      default:
    }
  }
});
