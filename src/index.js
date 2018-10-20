import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import { Provider } from "unstated";

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React, {
    exclude: /Consumer|Subscribe|StyledComponent|GlobalStyleComponent/
  });
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
