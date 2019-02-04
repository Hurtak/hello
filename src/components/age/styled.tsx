import styled from "styled-components/macro";
import * as s from "../../styles/styles";

export const Wrapper = styled.div({
  position: "relative",
  flexGrow: 1,
  userSelect: "none"
});

export const AgePosition = styled.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "15%",
  width: "100%"
});

export const AgeBox = styled.div({
  padding: `${s.grid(2)} ${s.grid(2.5)}`,
  backgroundColor: s.colors.whiteTransparentDefault,
  overflow: "hidden"
});

export const AgeText = styled.div({
  ...s.text.text,
  ...s.text.familyMonospace,

  color: s.colors.white,
  opacity: s.opacity.default,
  fontSize: s.size(24),
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});
