/*
 * Grid, sizing
 */

const gridMultiple = 8;

// NOTE: Only use px we want to have fixed sizes that have the same dimensions
// not affected by user font settings. Eg.: text in settings should be variable
// but lets say clock size should the the same unrelated to user font size settings.
export const size = (px: number): string => `${px / 16}rem`;
export const sizeFixed = (px: number): string => `${px}px`;
export const sizeNumber = (px: number): number => px;

export const grid = (grid: number): string => size(gridNumber(grid));
export const gridFixed = (grid: number): string => sizeFixed(gridNumber(grid));
export const gridNumber = (grid: number): number => grid * gridMultiple;

export const gridNumberToSizeNumber = (grid: number): number => grid * gridMultiple;
export const sizeNumberToGridNumber = (size: number): number => size / gridMultiple;

/*
 * Colors / Shared values
 */

export const colors = {
  pageBackground: "#f2f1f0", // Keep in sync with index.html body background style

  white: "white",
  black: "black",

  gray: "#dedede",

  orange: "#f7b71d",

  blue: "#488af5",
  blueDark: "#1d6ff4",

  blackTransparent20: "rgba(0, 0, 0, 0.2)",
  blackTransparent30: "rgba(0, 0, 0, 0.3)",
  blackTransparent40: "rgba(0, 0, 0, 0.4)",

  whiteTransparent20: "rgba(255, 255, 255, 0.2)",
  whiteTransparent40: "rgba(255, 255, 255, 0.4)",
  whiteTransparent70: "rgba(255, 255, 255, 0.7)",
};

export const shadows = {
  formFieldInset: `${size(1)} ${size(1)} ${size(3)} ${colors.blackTransparent20} inset`,
  formField: `${size(1)} ${size(1)} ${size(3)} ${colors.blackTransparent30}`,
  buttons: `${size(1)} ${size(1)} ${size(3)} ${size(1)} ${colors.blackTransparent20}`,
};

const backgroundImageAnimationDurationSeconds = 0.3;
export const animations = {
  default: "0.5s all ease",
  backgroundImageAnimationDurationSeconds,
  backgroundImage: `opacity ${backgroundImageAnimationDurationSeconds}s ease`,
};

export const opacity = {
  default: 0.7,
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
 * Dimensions
 */

const settingsButtonSize = gridNumber(5);
const settingsButtonPadding = gridNumber(1);
const settingsButtonSpacing = gridNumber(1);

const settingsButtonSizeAndSpacing =
  settingsButtonSize + 2 * settingsButtonPadding + 2 * settingsButtonSpacing;

export const dimensions: { [key: string]: number } = {
  formSpacing: gridNumber(1.25),
  formInputBoxSize: gridNumber(2),

  settingsSpacing: gridNumber(1),

  settingsButtonSize: settingsButtonSize,
  settingsButtonPadding: settingsButtonPadding,
  settingsButtonSpacing: settingsButtonSpacing,
  settingsButtonSizeAndSpacing: settingsButtonSizeAndSpacing,
};

/*
 * Mixins
 */

const breakpointPxToEm = (px: number): string => `${px / 16}em`;
export const maxWidthBreakpoint = (px: number): string =>
  `@media (max-width: ${breakpointPxToEm(px)})`;

export const visuallyHideInputFieldWhileStillInteractive: React.CSSProperties = {
  // Make sure the input is still there for screen readers and for the browser
  // and for the "focus" events, but hide him visually.
  position: "absolute",
  zIndex: -1,
  pointerEvents: "none",
  opacity: 0,
};

export const focusVisible = ".focus-visible:focus";
