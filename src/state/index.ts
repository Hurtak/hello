import { store } from "react-easy-state";

import { app } from "./components/app";
import { browser } from "./components/browser";
import { debug } from "./components/debug";
import { image } from "./components/image";
import { settings } from "./components/settings";
import { storage } from "./components/storage";

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
