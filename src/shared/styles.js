import "glamor/reset"; // normalize.css
import * as glamor from "glamor";

export const grid = size => `${size * 8}px`;

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

const fontShared = {
  margin: 0,
  padding: 0,
  color: "white",
  fontFamily: "Monospace",
  lineHeight: 1
};

export const fonts = {
  medium: {
    ...fontShared,
    fontSize: "14px"
  }
};

export const zIndex = {
  menu: 10
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