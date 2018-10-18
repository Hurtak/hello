import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React, { exclude: /StyledComponent|GlobalStyleComponent/ });
}

ReactDOM.render(<App />, document.getElementById("root"));
