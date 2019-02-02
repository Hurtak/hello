import { store } from "react-easy-state";

import { stateApp } from "./state-app";
import { stateBrowser } from "./state-browser";
import { stateImage } from "./state-image";
import { stateSettings } from "./state-settings";
import { stateLocalStorage } from "./state-local-storage";

export type State = {
  app: typeof stateApp;
  browser: typeof stateBrowser;
  settings: typeof stateSettings;
  image: typeof stateImage;
  localStorage: typeof stateLocalStorage;
};

export const state: State = store<State>({
  app: stateApp,
  browser: stateBrowser,
  image: stateImage,
  settings: stateSettings,
  localStorage: stateLocalStorage
});
