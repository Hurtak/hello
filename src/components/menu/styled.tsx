import styled from "styled-components/macro";
import * as s from "../../styles/styles";

type MenuWrapperProps = {
  settingsHidden?: boolean;
};

export const MenuWrapper = styled.section((props: MenuWrapperProps) => ({
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
}));

export const ToggleButton = styled.button({
  boxSizing: "border-box",
  position: "absolute",
  userSelect: "none",
  top: s.dimensions.menuButtonSpacing,
  right: s.dimensions.menuButtonSpacing,
  border: 0,
  background: "transparent",
  padding: s.dimensions.menuButtonPadding,
  cursor: "pointer"
});

export const ToggleButtonSpacer = styled.div({
  float: "right",
  width: s.grid(8),
  height: s.grid(8)
});

type ToggleButtonIconProps = {
  rotated?: boolean;
};

export const ToggleButtonIcon = styled.img((props: ToggleButtonIconProps) => ({
  display: "block",
  width: s.dimensions.menuButtonSize,
  height: s.dimensions.menuButtonSize,
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

export const MenuSectionsWrapper = styled.div({
  marginTop: s.grid(3)
});

export const MenuSectionStyled = styled.section({
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
