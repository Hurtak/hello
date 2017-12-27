import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.js";
import * as stylesGlobal from "./styles/styles-global.js";

stylesGlobal.init();
ReactDOM.render(<App />, document.getElementById("root"));
