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
  padding: s.grid(1)
});

type AppContentProps = {
  maxWidth?: boolean;
  center?: boolean;
};

export const AppContent = styled.main((props: AppContentProps) => ({
  display: "flex",
  flex: "1 0 0",
  flexDirection: "column",
  width: "100%",
  zIndex: s.zIndex.content,
  ...(props.center && {
    justifyContent: "center",
    alignItems: "center"
  }),
  ...(props.maxWidth && {
    maxWidth: s.size(1200)
  })
}));

export const BackgroundWrapper = styled.div({
  zIndex: s.zIndex.background
});

type AppMenuWrapperProps = {
  opened: boolean;
  menuHeight: number | null;
};

export const AppMenuWrapper = styled.aside((props: AppMenuWrapperProps) => ({
  position: "absolute",
  direction: "rtl", // To make the overflow cropping from the right side
  top: s.grid(1),
  right: s.grid(1),
  width: s.dimensions.menuButtonSizeAndSpacing,
  height: s.dimensions.menuButtonSizeAndSpacing,
  transition: "0.5s all ease",
  overflow: "hidden",
  zIndex: s.zIndex.menu,
  ...(props.opened && {
    width: s.dimensions.menuWidth,
    height: props.menuHeight ? s.size(props.menuHeight) : "auto"
  })
}));

export const AppMenu = styled.div({
  width: s.dimensions.menuWidth,
  direction: "ltr" // Reset direction set in AppMenuWrapper
});
