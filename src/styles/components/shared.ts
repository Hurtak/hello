/*
 * Grid, sizing
 */

const gridMultiple = 8;

export const gridRawToRawSize = (grid: number): number => grid * gridMultiple;
export const rawSizeToGridRaw = (grid: number): number => grid / gridMultiple;

// NOTE: Only use px we want to have fixed sizes that have the same dimensions
// not affected by user font settings. Eg.: text in settings should be variable
// but lets say clock size should the the same unrelated to user font size settings.
export const size = (px: number): string => `${px / 16}rem`;
export const sizeFixed = (px: number): string => `${px}px`;
export const grid = (grid: number): string => size(gridRawToRawSize(grid));
export const gridFixed = (grid: number): string => sizeFixed(gridRawToRawSize(grid));

/*
 * Colors
 */

// TODO: Delete unused variables.
export const colors = {
  pageBackground: "#f2f1f0", // Keep in sync with index.html body background style

  white: "white",
  black: "black",

  grayMain: "#dedede",

  orange: "orange",

  blue: "#488af5",
  blueDark: "#1d6ff4",

  blackTransparent10: "rgba(0, 0, 0, 0.1)",
  blackTransparent20: "rgba(0, 0, 0, 0.2)",
  blackTransparent30: "rgba(0, 0, 0, 0.3)",
  blackTransparent40: "rgba(0, 0, 0, 0.4)",

  whiteTransparent70: "rgba(255, 255, 255, 0.7)",
  whiteTransparent20: "rgba(255, 255, 255, 0.2)",
};

export const shadows = {
  formFieldInset: `${size(1)} ${size(1)} ${size(3)} ${colors.blackTransparent20} inset`,
  formField: `${size(1)} ${size(1)} ${size(3)} ${colors.blackTransparent30}`,
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
 * Breakpoints
 */

const breakpointPxToEm = (px: number): string => `${px / 16}em`;
export const maxWidthBreakpoint = (px: number): string =>
  `@media (max-width: ${breakpointPxToEm(px)})`;

/*
 * Dimensions
 */

const settingsButtonSize = gridRawToRawSize(5);
const settingsButtonPadding = gridRawToRawSize(1);
const settingsButtonSpacing = gridRawToRawSize(1);

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
  horizontal = false,
  size,
}: {
  horizontal?: boolean;
  size: number;
}) => {
  const marginDirection = horizontal ? "marginLeft" : "marginTop";

  return {
    "& + &": {
      [marginDirection]: grid(size),
    },
  };
};

export const visuallyHideInputFieldWhileStillInteractive: React.CSSProperties = {
  // Make sure the input is still there for screen readers and for the browser
  // and for the "focus" events, but hide him visually.
  position: "absolute",
  zIndex: -1,
  pointerEvents: "none",
  opacity: 0,
};

export const focusVisible = ".focus-visible:focus";

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
