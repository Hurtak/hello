import { store } from "react-easy-state";

import { app } from "./containers/app";
import { browser } from "./containers/browser";
import { image } from "./containers/image";
import { settings } from "./containers/settings";
import { storage } from "./containers/storage";

export type State = {
  app: typeof app;
  browser: typeof browser;
  settings: typeof settings;
  image: typeof image;
  storage: typeof storage;
};

export const state: State = store<State>({
  app,
  browser,
  image,
  settings,
  storage,
});
