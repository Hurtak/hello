import { createStore } from "easy-peasy";
import { getInitialState, savedState } from "./state";
import * as computed from "./computed";
import * as effects from "./effects";
import * as actions from "./actions";
import { middlewareLocalStorage, loadState } from "./middleware-local-storage";

const model = {
  ...loadState(getInitialState()),
  ...computed,
  ...effects,
  ...actions
};

export const store = createStore(model, {
  middleware: [middlewareLocalStorage(savedState)]
});
