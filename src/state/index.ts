import { store } from "react-easy-state";

import { app } from "./mod/app";
import { browser } from "./mod/browser";
import { debug } from "./mod/debug";
import { image } from "./mod/image";
import { settings } from "./mod/settings";
import { storage } from "./mod/storage";
import { config } from "../config";

export type State = {
  app: typeof app;
  browser: typeof browser;
  debug: typeof debug;
  image: typeof image;
  settings: typeof settings;
  storage: typeof storage;
};

export const state: State = store<State>({
  app,
  browser,
  debug,
  image,
  settings,
  storage,
});

if (config.isDev) {
  window._state = state;
}
