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

export const BackgroundWrapper = styled.div({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
});

export const AppContent = styled.main({
  display: "flex",
  flex: "1 0 0",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  zIndex: 2,
});

type AppSettingsProps = { opened: boolean; contentHeight: number | null };

export const AppSettingsWrapper = styled.aside.attrs((props: AppSettingsProps) => ({
  style: props.opened && {
    width: s.dimensions.settingsWidth,
    height: typeof props.contentHeight === "number" ? s.size(props.contentHeight) : "auto",
  },
}))({
  position: "absolute",
  direction: "rtl", // To make the overflow cropping from the right side
  top: s.grid(1),
  right: s.grid(1),
  width: s.dimensions.settingsButtonSizeAndSpacing,
  height: s.dimensions.settingsButtonSizeAndSpacing,
  transition: s.animations.default,
  overflow: "hidden",
  zIndex: 3,
});

export const AppSettings = styled.div({
  width: s.dimensions.settingsWidth,
  direction: "ltr", // Reset direction set in AppSettingsWrapper
});
