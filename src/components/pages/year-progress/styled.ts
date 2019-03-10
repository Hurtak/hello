import styled from "styled-components/macro";
import * as s from "../../../styles/styles";

export const YearProgressWrapper = styled.div({
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  height: s.grid(8),
  padding: s.grid(0.25),
  marginTop: s.grid(1),
  border: `${s.grid(0.25)} solid ${s.colors.whiteTransparentDefault}`
});

export const YearProgressBar = styled.div({
  height: "100%",
  backgroundColor: s.colors.whiteTransparentDefault
});

export const YearProgressText = styled.div({
  ...s.text.text,

  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0
});
