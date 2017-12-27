import "glamor/reset"; // normalize.css
import * as glamor from "glamor";
import * as s from "./styles-shared.js";

function init() {
  // Resets
  glamor.css.global("body", {
    margin: 0
  });

  // General styles
  glamor.css.global("body", {
    backgroundColor: s.colors.grayChrome,

    // https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll
    position: "relative"
  });
}

export { init };
