import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../styles";

export const Button: React.FC<{
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
  color: s.colors.black,
  background: s.colors.white,
  boxShadow: s.shadows.buttons,
  cursor: "pointer",

  [`&${s.focusVisible}`]: {
    outlineWidth: s.grid(0.25),
    outlineStyle: "solid",
    outlineColor: s.colors.whiteTransparent40,
  },

  ":active": {
    position: "relative",
    left: s.size(1),
    top: s.size(1),
    boxShadow: "none",
  },
});
