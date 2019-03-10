import styled from "styled-components/macro";
import * as s from "../../styles/styles";

export const ClockBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  userSelect: "none",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

const breakpoints = {
  500: `@media (max-width: ${s.breakpointPxToEm(500)})`,
  380: `@media (max-width: ${s.breakpointPxToEm(380)})`,
  280: `@media (max-width: ${s.breakpointPxToEm(280)})`,
  180: `@media (max-width: ${s.breakpointPxToEm(180)})`
};

export const ClockText = styled.div({
  ...s.text.text,
  ...s.text.familyMonospace,

  fontSize: s.gridPx(10),
  color: s.colors.white,
  opacity: s.opacity.default,

  [breakpoints[500]]: {
    fontSize: s.gridPx(8)
  },
  [breakpoints[380]]: {
    fontSize: s.gridPx(6)
  },
  [breakpoints[280]]: {
    fontSize: s.gridPx(4)
  },
  [breakpoints[180]]: {
    fontSize: s.gridPx(3)
  }
});

export const Colon = styled.span({
  position: "relative",
  top: "-9px",
  margin: "0 -6px",
  fontSize: "0.8em",

  [breakpoints[500]]: {
    top: "-8px",
    margin: "0 -5px"
  },
  [breakpoints[380]]: {
    top: "-6px",
    margin: "0 -4px"
  },
  [breakpoints[280]]: {
    top: "-4px",
    margin: "0 -3px"
  },
  [breakpoints[180]]: {
    top: "-3px",
    margin: "0 -2px"
  }
});