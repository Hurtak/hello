import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../styles/styles";

export const Checkbox: React.FC<{
  checked: boolean;
  onChange: () => void;
  children: string;
}> = ({ checked, onChange, children }) => {
  return (
    <CheckboxLabel>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxText>{children}</CheckboxText>
    </CheckboxLabel>
  );
};

const CheckboxLabel = styled.label({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: s.grid(0.5),
});

const CheckboxInput = styled.input({});

const CheckboxText = styled.span({
  ...s.text(),

  marginLeft: s.grid(0.5),
});
