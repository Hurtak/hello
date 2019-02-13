import styled from "styled-components/macro";
import * as s from "../../styles/styles";

type SettingsWrapperProps = {
  settingsHidden?: boolean;
};

export const SettingsWrapper = styled.section(
  (props: SettingsWrapperProps) => ({
    boxSizing: "border-box",
    position: "relative",
    padding: s.grid(2),
    overflow: "hidden",
    backgroundColor: s.colors.whiteTransparentDefault,
    ...(props.settingsHidden && {
      opacity: 0,
      transition: s.animations.default,
      "&:hover": {
        opacity: 1
      }
    })
  })
);

export const ToggleButton = styled.button({
  boxSizing: "border-box",
  position: "absolute",
  userSelect: "none",
  top: s.dimensions.settingsButtonSpacing,
  right: s.dimensions.settingsButtonSpacing,
  border: 0,
  background: "transparent",
  padding: s.dimensions.settingsButtonPadding,
  cursor: "pointer"
});

export const ToggleButtonSpacer = styled.div({
  float: "right",
  width: s.grid(8),
  height: s.grid(8)
});

export const ToggleButtonIcon = styled.img((props: { rotated?: boolean }) => ({
  display: "block",
  width: s.dimensions.settingsButtonSize,
  height: s.dimensions.settingsButtonSize,
  objectFit: "contain",
  transition: s.animations.default,
  opacity: s.opacity.default,
  ...(props.rotated && {
    transform: "rotate(-360deg)"
  })
}));

export const Heading = styled.h1({
  ...s.text.text,
  ...s.text.size18,

  paddingBottom: "0.25em"
});

export const HeadingSmall = styled.h2({
  ...s.text.text,
  ...s.text.size16,

  paddingBottom: "0.25em"
});

export const Text = styled.p({
  ...s.text.text
});

export const SettingsSectionsWrapper = styled.div({
  marginTop: s.grid(3)
});

export const SettingsSectionStyled = styled.section({
  marginTop: s.grid(2),

  "&:first-child": {
    marginTop: 0
  }
});

export const RadioLabel = styled.label({
  display: "block"
});

export const RadioText = styled.span({
  ...s.text.text,

  color: s.colors.white,
  marginLeft: s.grid(1)
});
