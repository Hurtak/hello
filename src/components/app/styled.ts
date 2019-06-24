import styled from "styled-components/macro";
import * as s from "../../styles/styles";

export const Layout = styled.div({
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  minWidth: s.size(300),
  padding: s.grid(1),
  overflow: "auto",
});

export const AppContent = styled.main({
  display: "flex",
  flex: "1 0 0",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  zIndex: s.zIndex.content,
});

export const BackgroundWrapper = styled.div({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: s.zIndex.background,
});

export const AppSettingsWrapper = styled.aside(
  (props: { opened: boolean; contentHeight: number | null }) => ({
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
      height: props.contentHeight ? s.size(props.contentHeight) : "auto",
    }),
  }),
);

export const AppSettings = styled.div({
  width: s.dimensions.settingsWidth,
  direction: "ltr", // Reset direction set in AppSettingsWrapper
});
