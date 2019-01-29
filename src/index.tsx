import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { StoreProvider } from "easy-peasy";
import { store } from "./state/app-state";

const StoreProviderAny = StoreProvider as any;

ReactDOM.render(
  <StoreProviderAny store={store}>
    <App />
  </StoreProviderAny>,
  document.getElementById("root")
);
