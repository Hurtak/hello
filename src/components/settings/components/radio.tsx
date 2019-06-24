import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../styles/styles";

export const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = props => (
  <RadioLabel>
    <input
      type="radio"
      name={props.name}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    />
    <RadioText>{props.children}</RadioText>
  </RadioLabel>
);

const RadioLabel = styled.label({
  display: "block",
});

const RadioText = styled.span({
  ...s.text(),

  marginLeft: s.grid(1),
});
