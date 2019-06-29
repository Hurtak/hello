/*
 * Colors
 */

// TODO: Delete unused variables.
export const colors = {
  white: "white",
  black: "black",

  grayMain: "gray",
  grayChrome: "#f2f1f0",

  orange: "orange",

  whiteTransparentALot: "rgba(0, 0, 0, 0.1)", // TODO: rename
  whiteTransparentDimmed: "rgba(0, 0, 0, 0.2)", // TODO: rename
  whiteTransparentDefault: "rgba(0, 0, 0, 0.4)", // TODO: rename
  whiteTransparentBright: "rgba(255, 255, 255, 0.7)",
};

/*
 * Fonts
 */

export const text = ({
  size: fontSize = "TEXT",
  weight = "DEFAULT",
  family = "DEFAULT",
  selectable = true,
}: {
  size?: "TEXT" | "HEADING_SMALL" | "HEADING";
  weight?: "DEFAULT" | "BOLD";
  family?: "DEFAULT" | "NUMBERS";
  selectable?: boolean;
} = {}): React.CSSProperties => ({
  margin: 0,
  padding: 0,

  fontSize: (() => {
    switch (fontSize) {
      case "TEXT":
        return size(15);
      case "HEADING_SMALL":
        return size(18);
      case "HEADING":
        return size(24);
    }
  })(),
  fontFamily: (() => {
    switch (family) {
      case "DEFAULT":
        return "Roboto";
      case "NUMBERS":
        return "Lato";
    }
  })(),
  fontWeight: (() => {
    switch (weight) {
      case "DEFAULT":
        return 400;
      case "BOLD":
        return 700;
    }
  })(),
  userSelect: (() => {
    switch (selectable) {
      case true:
        return "auto";
      case false:
        return "none";
    }
  })(),

  lineHeight: 1,

  color: colors.white,
});

/*
 * Grid, sizing
 */

const gridMultiple = 8;

export const gridToPx = (grid: number): number => grid * gridMultiple;
export const pxToGrid = (grid: number): number => grid / gridMultiple;

// NOTE: Only use px we want to have fixed sizes that have the same dimensions
// not affected by user font settings. Eg.: text in settings should be variable
// but lets say clock size should the the same unrelated to user font size settings.
export const size = (px: number): string => `${px / 16}rem`;
export const sizeFixed = (px: number): string => `${px}px`;
export const grid = (grid: number): string => size(gridToPx(grid));
export const gridFixed = (grid: number): string => sizeFixed(gridToPx(grid));

/*
 * Breakpoints
 */

const breakpointPxToEm = (px: number): string => `${px / 16}em`;
export const maxWidthBreakpoint = (px: number): string =>
  `@media (max-width: ${breakpointPxToEm(px)})`;

/*
 * Dimensions
 */

const settingsButtonSize = gridToPx(5);
const settingsButtonPadding = gridToPx(1);
const settingsButtonSpacing = gridToPx(1);

const settingsButtonSizeAndSpacing =
  settingsButtonSize + 2 * settingsButtonPadding + 2 * settingsButtonSpacing;

export const dimensions = {
  settingsWidth: size(400),
  settingsButtonSize: settingsButtonSize,
  settingsButtonPadding: size(settingsButtonPadding),
  settingsButtonSpacing: size(settingsButtonSpacing),
  settingsButtonSizeAndSpacing: size(settingsButtonSizeAndSpacing),
};

/*
 * Mixins
 */
export const itemsSpacing = ({
  direction,
  size,
}: {
  direction: "ROW" | "COLUMN";
  size: number;
}) => {
  const marginDirection = direction === "ROW" ? "marginLeft" : "marginTop";

  return {
    "& + &": {
      [marginDirection]: grid(size),
    },
  };
};

/*
 * Other shared styles
 */

export const animations = {
  default: "0.5s all ease",
  backgroundImage: "opacity 0.3s ease",
};

export const opacity = {
  default: 0.7,
};
