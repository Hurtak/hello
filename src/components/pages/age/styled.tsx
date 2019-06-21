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
  bottom: "15%",
  width: "100%",
});

export const AgeBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  overflow: "hidden",
});

export const AgeText = styled.div({
  ...s.text({ family: "MONO_SPACE", selectable: false }),

  opacity: s.opacity.default,
  fontSize: s.gridPx(4),
});
