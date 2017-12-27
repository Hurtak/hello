export const grid = size => `${size * 8}px`;

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
