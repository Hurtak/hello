import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";

export const Link = styled.a({
  ...s.text(),

  display: "inline-block",
  textDecoration: "none",
  cursor: "pointer",
  borderBottomWidth: s.size(1),
  borderBottomStyle: "solid",
  borderBottomColor: s.colors.whiteTransparent70,
});
