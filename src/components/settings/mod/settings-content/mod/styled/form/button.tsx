import { VFC } from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";

export const Button: VFC<{
  onClick: () => void;
  children: string;
}> = ({ onClick, children }) => {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button({
  ...s.text({ selectable: false }),

  padding: `${s.grid(0.75)} ${s.grid(1)}`,
  border: 0,
  outline: 0,
  color: s.color.black,
  background: s.color.white,
  boxShadow: s.shadow.buttons,
  cursor: "pointer",

  ":focus-visible": {
    outlineWidth: s.grid(0.5),
    outlineStyle: "solid",
    outlineColor: s.color.whiteTransparent40,
  },

  ":active": {
    position: "relative",
    left: s.size(1),
    top: s.size(1),
    boxShadow: "none",
  },
});
