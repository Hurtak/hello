import React from "react";
import styled from "styled-components/macro";
import { IconWarning } from "../icon";
import * as s from "../../styles/styles";

export const SettingsWrapper = styled.section(
  (props: { settingsHidden?: boolean }) => ({
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
  overflow: "hidden", // When icon was rotating, it increased the outline size.
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

export const ToggleButtonIconWrapper = styled.div(
  (props: { rotated?: boolean }) => ({
    display: "flex",
    transition: s.animations.default,
    opacity: s.opacity.default,
    ...(props.rotated && {
      transform: "rotate(-360deg)"
    })
  })
);

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

export const Warning: React.FC = ({ children }) => (
  <WarningTextWrapper>
    <WarningTextIcon>
      <IconWarning color={s.colors.orange} width={16} height={16} />
    </WarningTextIcon>
    <WarningText>{children}</WarningText>
  </WarningTextWrapper>
);

const WarningTextWrapper = styled.div({
  display: "flex",
  alignItems: "center"
});

const WarningTextIcon = styled.div({
  marginRight: s.grid(1)
});

const WarningText = styled.p({
  ...s.text.text,
  display: "inline-block",
  color: s.colors.orange
});

export const SettingsSectionsWrapper = styled.div({
  marginTop: s.gridRaw(3)
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

  marginLeft: s.grid(1)
});
