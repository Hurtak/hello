import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { StoreProvider } from "easy-peasy";
import { store } from "./state/app-state";

if (process.env.NODE_ENV !== "production") {
  // const { whyDidYouUpdate } = require("why-did-you-update");
  // whyDidYouUpdate(React, {
  //   // exclude: /Consumer|Subscribe|StyledComponent|GlobalStyleComponent/
  // });
}

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
