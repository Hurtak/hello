import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";

export const Link = styled.a({
  ...s.text(),

  display: "inline-block",
  textDecoration: "none",
  cursor: "pointer",
  borderBottomWidth: s.size(1),
  borderBottomStyle: "solid",
  borderBottomColor: s.color.whiteTransparent70,
  outline: 0,

  [`&${s.focusVisible}`]: {
    backgroundColor: s.color.whiteTransparent40,
    outlineWidth: s.grid(0.25),
    outlineStyle: "solid",
    outlineColor: s.color.whiteTransparent40,
  },
});
