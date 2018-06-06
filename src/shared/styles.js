import "glamor/reset"; // normalize.css
import * as glamor from "glamor";

export const grid = size => `${size * 8}px`;
export const gridRaw = size => size * 8;

// TODO: Delete unused variables.
export const colors = {
  white: "white",
  grayMain: "gray",
  grayChrome: "#f2f1f0",
  whiteTransparentALot: "rgba(0, 0, 0, 0.1)", // TODO: rename
  whiteTransparentDimmed: "rgba(0, 0, 0, 0.2)",
  whiteTransparentDefault: "rgba(0, 0, 0, 0.4)",
  whiteTransparentBright: "rgba(0, 0, 0, 0.8)"
};

export const blur = {
  default: "blur(5px)",
  wide: "blur(80px)"
};

export const text = {
  text: {
    margin: 0,
    padding: 0,
    fontSize: "14px",
    lineHeight: 1,
    color: colors.white,
    fontFamily: "Arial",
  },

  // Size modifiers
  heading: {
    fontSize: "18px"
  },
  headingSmall: {
    fontSize: "16px"
  },

  // Appearence modifiers
  monospace: {
    fontFamily: "Monospace"
  }
};

export const zIndex = {
  menu: 10
};

const menuButtonSize = gridRaw(5);
const menuButtonPadding = gridRaw(1);
const menuButtonSpacing = gridRaw(1);

const menuButtonSizeAndSpacing =
  menuButtonSize + 2 * menuButtonPadding + 2 * menuButtonSpacing;

export const dimensions = {
  menuWidth: "400px",
  menuButtonSize: menuButtonSize + "px",
  menuButtonPadding: menuButtonPadding + "px",
  menuButtonSpacing: menuButtonSpacing + "px",
  menuButtonSizeAndSpacing: menuButtonSizeAndSpacing + "px"
};

export function globalStyles() {
  // Resets
  glamor.css.global("body", {
    margin: 0
  });

  // General styles
  glamor.css.global("body", {
    backgroundColor: colors.grayChrome,

    // https://stackoverflow.com/questions/8635799/overflow-xhidden-still-can-scroll
    position: "relative"
  });
}
