import styled from "styled-components/macro";
import * as s from "../../../styles";

export const SettingsWrapper = styled.div(
  (props: { opened: boolean; hiddenUnlessHovered: boolean }) => ({
    ...s.boxBackground,

    maxHeight: `calc(100vh - ${s.size(2 * s.dimensions.settingsSpacing)})`,
    overflow: props.opened ? "auto" : "hidden",

    ...(props.hiddenUnlessHovered && {
      opacity: 0,
      transition: s.animation.default,

      "&:hover": {
        opacity: 1,
      },
    }),
  }),
);

export const SettingsStyled = styled.section({
  boxSizing: "border-box",
  position: "relative",
  padding: s.grid(2),
});

export const ToggleButton = styled.button({
  boxSizing: "border-box",
  position: "absolute",
  overflow: "hidden", // When icon was rotating, it increased the outline size.
  top: s.size(s.dimensions.settingsButtonSpacing),
  right: s.size(s.dimensions.settingsButtonSpacing),
  padding: s.size(s.dimensions.settingsButtonPadding),
  border: 0,
  outline: 0,
  background: "transparent",
  cursor: "pointer",

  ":focus-visible": {
    backgroundColor: s.color.whiteTransparent20,
  },
});

export const ToggleButtonSpacer = styled.div({
  float: "right",
  width: s.grid(7),
  height: s.grid(7),
});

export const ToggleButtonIconWrapper = styled.div((props: { rotated?: boolean }) => ({
  display: "flex",
  transition: s.animation.default,
  opacity: s.opacity.default,

  ...(props.rotated && {
    transform: "rotate(-360deg)",
  }),
}));
