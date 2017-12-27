import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.js";
import * as styles from "./shared/styles.js";

styles.globalStyles();
ReactDOM.render(<App />, document.getElementById("root"));
