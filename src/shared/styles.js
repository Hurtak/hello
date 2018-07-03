import "glamor/reset"; // normalize.css
import * as glamor from "glamor";

export const grid = size => `${size * 8}px`;
export const gridRaw = size => size * 8;
export const size = size => `${size}px`;

// TODO: Delete unused variables.
export const colors = {
  white: "white",
  grayMain: "gray",
  grayChrome: "#f2f1f0",
  whiteTransparentALot: "rgba(0, 0, 0, 0.1)", // TODO: rename
  whiteTransparentDimmed: "rgba(0, 0, 0, 0.2)", // TODO: rename
  whiteTransparentDefault: "rgba(0, 0, 0, 0.4)", // TODO: rename
  whiteTransparentBright: "rgba(255, 255, 255, 0.7)"
};

export const text = {
  text: {
    margin: 0,
    padding: 0,
    fontSize: "14px",
    lineHeight: 1,
    color: colors.white,
    fontFamily: "Arial"
  },

  // Size modifiers
  size18: {
    fontSize: "18px"
  },
  size16: {
    fontSize: "16px"
  },

  // Appearence modifiers
  familyMonospace: {
    fontFamily: "Monospace"
  },
  familyLato: {
    fontFamily: "Lato",
    letterSpacing: "0.6px"
  }
};

export const animations = {
  default: "0.5s all ease"
};

export const opacity = {
  default: 0.8
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

  // Fonts
  glamor.css.insert(`
    /* latin-ext */
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      src: local('Lato Regular'), local('Lato-Regular'), url(/fonts/lato-latin-ext.woff2) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }

    /* latin */
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      src: local('Lato Regular'), local('Lato-Regular'), url(/fonts/lato-latin.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `);
}
