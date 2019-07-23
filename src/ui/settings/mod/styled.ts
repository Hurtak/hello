import styled from "styled-components/macro";
import * as s from "../../../styles";

export const SettingsWrapper = styled.section((props: { opened: boolean; hidden: boolean }) => ({
  boxSizing: "border-box",
  position: "relative",
  padding: s.grid(2),
  maxHeight: `calc(100vh - ${s.size(2 * s.dimensions.settingsSpacing)})`,
  overflow: props.opened ? "auto" : "hidden",
  backgroundColor: s.colors.blackTransparent40,

  ...(props.hidden && {
    opacity: 0,
    transition: s.animations.default,

    "&:hover": {
      opacity: 1,
    },
  }),
}));

export const ToggleButton = styled.button({
  boxSizing: "border-box",
  position: "absolute",
  overflow: "hidden", // When icon was rotating, it increased the outline size.
  top: s.size(s.dimensions.settingsButtonSpacing),
  right: s.size(s.dimensions.settingsButtonSpacing),
  border: 0,
  outline: 0,
  background: "transparent",
  padding: s.size(s.dimensions.settingsButtonPadding),
  cursor: "pointer",

  [`&${s.focusVisible}`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },
});

export const ToggleButtonSpacer = styled.div({
  float: "right",
  width: s.grid(7),
  height: s.grid(7),
});

export const ToggleButtonIconWrapper = styled.div((props: { rotated?: boolean }) => ({
  display: "flex",
  transition: s.animations.default,
  opacity: s.opacity.default,

  ...(props.rotated && {
    transform: "rotate(-360deg)",
  }),
}));
