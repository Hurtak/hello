import styled from "styled-components/macro";
import * as s from "../../../styles/styles";

export const Wrapper = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ClockBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.blackTransparent40,

  [s.maxWidthBreakpoint(900)]: {
    transform: "scale(0.9)",
  },
  [s.maxWidthBreakpoint(600)]: {
    transform: "scale(0.8)",
  },
  [s.maxWidthBreakpoint(450)]: {
    transform: "scale(0.6)",
  },
});

export const TextWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  opacity: s.opacity.default,
});

export const Text = styled.div({
  ...s.text({ family: "NUMBERS", selectable: false, weight: "BOLD" }),

  // Precise positioning so font edges are perfectly aligned
  position: "relative",
  top: s.sizeFixed(-2),

  fontSize: s.gridFixed(13),
  color: s.colors.white,
});

export const ColonWrapper = styled.div({
  position: "relative",
  top: s.sizeFixed(2),
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  padding: `${s.sizeFixed(30)} ${s.sizeFixed(8)}`,
});

export const ColonCircle = styled.div({
  borderRadius: "50%",
  width: s.sizeFixed(16),
  height: s.sizeFixed(16),
  backgroundColor: s.colors.white,
});
