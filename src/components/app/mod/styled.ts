import styled from "styled-components/macro";

import * as s from "../../../styles";

export const Layout = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  // TODO: When making this value smaller, make sure the Settings component is
  // updated. At the moment it is not really responsive.
  minWidth: s.size(420),
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
  boxSizing: "border-box",
  display: "flex",
  flex: "1 0 0",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: s.grid(1),
  zIndex: 2,
});

export const AppSettingsLayout = styled.aside({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  padding: s.size(s.dimensions.settingsSpacing),
  pointerEvents: "none",
  zIndex: 3,
});

type AppSettingsProps = { opened: boolean; contentHeight: number | null };

export const AppSettings = styled.div.attrs((props: AppSettingsProps) => ({
  style: {
    ...(props.opened && {
      height: typeof props.contentHeight === "number" ? s.size(props.contentHeight) : "auto",
    }),
  },
}))(
  (props: AppSettingsProps) =>
    ({
      direction: "rtl", // To make the overflow cropping from the right side
      width: s.size(s.dimensions.settingsButtonSizeAndSpacing),
      height: s.size(s.dimensions.settingsButtonSizeAndSpacing),
      transition: s.animation.default,
      overflow: "hidden",
      pointerEvents: "auto",

      ...(props.opened && {
        width: s.size(s.dimensions.settingsWidth),
        maxWidth: "100%",
      }),
    } as const),
);

export const AppSettingsInner = styled.div({
  direction: "ltr", // Reset direction set in AppSettings component
  width: s.size(s.dimensions.settingsWidth),
});
