import styled from "styled-components/macro";
import * as s from "../../../styles/styles";

export const Wrapper = styled.div({
  position: "relative",
  flexGrow: 1,
});

export const AgePosition = styled.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  left: 0,
  top: "80%",
  width: "100%",
});

export const AgeBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,

  [s.maxWidthBreakpoint(600)]: {
    transform: "scale(0.8)",
  },
});

export const AgeText = styled.div({
  ...s.text({ family: "NUMBERS", selectable: false }),

  opacity: s.opacity.default,
  fontSize: s.gridPx(4),
});
