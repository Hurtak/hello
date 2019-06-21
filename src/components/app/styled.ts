import styled from "styled-components/macro";
import * as s from "../../styles/styles";

export const AppWrapper = styled.div({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: s.grid(1),
});

export const AppContent = styled.main((props: { maxWidth?: boolean; center?: boolean }) => ({
  display: "flex",
  flex: "1 0 0",
  flexDirection: "column",
  width: "100%",
  zIndex: s.zIndex.content,
  ...(props.center && {
    justifyContent: "center",
    alignItems: "center",
  }),
  ...(props.maxWidth && {
    maxWidth: s.size(1200),
  }),
}));

export const BackgroundWrapper = styled.div({
  zIndex: s.zIndex.background,
});

export const AppSettingsWrapper = styled.aside(
  (props: { opened: boolean; height: number | null }) => ({
    position: "absolute",
    direction: "rtl", // To make the overflow cropping from the right side
    top: s.grid(1),
    right: s.grid(1),
    width: s.dimensions.settingsButtonSizeAndSpacing,
    height: s.dimensions.settingsButtonSizeAndSpacing,
    transition: s.animations.default,
    overflow: "hidden",
    zIndex: s.zIndex.settings,
    ...(props.opened && {
      width: s.dimensions.settingsWidth,
      height: props.height ? s.size(props.height) : "auto",
    }),
  }),
);

export const AppSettings = styled.div({
  width: s.dimensions.settingsWidth,
  direction: "ltr", // Reset direction set in AppSettingsWrapper
});
