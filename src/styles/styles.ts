export const gridRaw = (gridMultiple: number): number => gridMultiple * 8;

export const grid = (gridMultiple: number): string => `${size(gridRaw(gridMultiple))}`;
export const gridPx = (gridMultiple: number): string => `${gridRaw(gridMultiple)}px`;

export const size = (px: number): string => `${px / 16}rem`;

export const breakpointPxToEm = (px: number): string => `${px / 16}em`;

export const maxWidthBreakpoint = (px: number): string =>
  `@media (max-width: ${breakpointPxToEm(px)})`;

// NOTE: Only use px we want to have fixed sizes that have the same dimensions
// not affected by user font settings. Eg.: text in settings should be variable
// but lets say clock size should the the same unrelated to user font size settings.

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

export const text = ({
  size: fontSize = "DEFAULT",
  weight = "DEFAULT",
  family = "DEFAULT",
  selectable = true,
}: {
  size?: "DEFAULT" | "16" | "18";
  weight?: "DEFAULT" | "BOLD";
  family?: "DEFAULT" | "MONO_SPACE";
  selectable?: boolean;
} = {}) => ({
  margin: 0,
  padding: 0,

  fontSize: (() => {
    switch (fontSize) {
      case "DEFAULT":
        return size(14);
      case "16":
        return size(16);
      case "18":
        return size(18);
    }
  })(),
  fontFamily: (() => {
    switch (family) {
      case "DEFAULT":
        return "Arial";
      case "MONO_SPACE":
        return "Monospace";
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
  userSelect: ((): React.CSSProperties["userSelect"] => {
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

export const animations = {
  default: "0.5s all ease",
  backgroundImage: "opacity 0.3s ease",
};

export const opacity = {
  default: 0.8,
};

export const zIndex = {
  settings: 10,
  content: 9,
  background: 8,
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
  settingsButtonSizeAndSpacing: size(settingsButtonSizeAndSpacing),
};
