import { store } from "react-easy-state";

import { app } from "./components/app";
import { browser } from "./components/browser";
import { image } from "./components/image";
import { settings } from "./components/settings";
import { storage } from "./components/storage";

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
