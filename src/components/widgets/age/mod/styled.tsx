import styled from "styled-components/macro";

import * as s from "../../../../styles";

export const Wrapper = styled.div({
  width: "100%",
  height: "100%",
  position: "relative",
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
  ...s.boxBackground,

  padding: `${s.grid(2)} ${s.grid(2.5)}`,

  [s.maxWidthBreakpoint(600)]: {
    transform: "scale(0.8)",
  },
});

export const AgeText = styled.div({
  ...s.text({ family: "NUMBERS", selectable: false }),

  opacity: s.opacity.default,
  fontSize: s.gridFixed(4),
});
