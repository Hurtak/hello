import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../../styles/styles";

export const GenericFormField: React.FC<{
  checked: boolean;
  disabled?: boolean;
  name?: string;
  type: "checkbox" | "radio";
  onChange: () => void;
  children: string;
}> = ({ type, name, checked, disabled = false, onChange, children }) => {
  return (
    <Label>
      <Input type={type} name={name} checked={checked} disabled={disabled} onChange={onChange} />
      <Text>{children}</Text>
    </Label>
  );
};

const Label = styled.label({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `${s.grid(0.25)} 0`,

  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(255, 255 ,255, 0.3)",
  },
});

const Input = styled.input({});

const Text = styled.span({
  ...s.text(),

  marginLeft: s.grid(1.25),
});
