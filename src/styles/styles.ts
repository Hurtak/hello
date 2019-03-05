export const gridRaw = (gridMultiple: number): number => gridMultiple * 8;

export const grid = (gridMultiple: number): string =>
  `${size(gridRaw(gridMultiple))}`;
export const gridPx = (gridMultiple: number): string =>
  `${gridRaw(gridMultiple)}px`;

export const size = (px: number): string => `${px / 16}rem`;

export const breakpointPxToEm = (px: number): string => `${px / 16}em`;

// NOTE: Only use px we want to have fixed sizes that have the same dimensions
// not affected by user font settings. Eg.: text in settings should be variable
// but lets say clock size should the the same unrelated to user font size settings.

// TODO: Delete unused variables.
export const colors = {
  white: "white",
  black: "black",

  grayMain: "gray",
  grayChrome: "#f2f1f0",

  orange: "orange", // TODO: hex

  whiteTransparentALot: "rgba(0, 0, 0, 0.1)", // TODO: rename
  whiteTransparentDimmed: "rgba(0, 0, 0, 0.2)", // TODO: rename
  whiteTransparentDefault: "rgba(0, 0, 0, 0.4)", // TODO: rename
  whiteTransparentBright: "rgba(255, 255, 255, 0.7)"
};

export const text = {
  text: {
    margin: 0,
    padding: 0,
    fontSize: size(14),
    lineHeight: 1,
    color: colors.white,
    fontFamily: "Arial"
  },

  // Size modifiers
  size16: {
    fontSize: size(16)
  },
  size18: {
    fontSize: size(18)
  },

  // Appearence modifiers
  familyMonospace: {
    fontFamily: "Monospace"
  }
};

export const animations = {
  default: "0.5s all ease"
};

export const opacity = {
  default: 0.8
};

export const zIndex = {
  settings: 10,
  content: 9,
  background: 8
};

const settingsButtonSize = gridRaw(5);
const settingsButtonPadding = gridRaw(1);
const settingsButtonSpacing = gridRaw(1);

const settingsButtonSizeAndSpacing =
  settingsButtonSize + 2 * settingsButtonPadding + 2 * settingsButtonSpacing;

export const dimensions = {
  settingsWidth: size(400),
  settingsButtonSize: settingsButtonSize,
  settingsButtonPadding: size(settingsButtonPadding),
  settingsButtonSpacing: size(settingsButtonSpacing),
  settingsButtonSizeAndSpacing: size(settingsButtonSizeAndSpacing)
};
