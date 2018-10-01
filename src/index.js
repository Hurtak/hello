import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import { GlobalStyles } from "./shared/styles.js";

ReactDOM.render(
  <div>
    <GlobalStyles />
    <App />
  </div>,
  document.getElementById("root")
);
