import React, { useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";
import { formInputTextSpacing } from "./form-shared";

export const InputDate: React.FC<{
  value: string;
  min: string;
  max: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: string;
}> = ({ value, min, max, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <Label>
      <Text>{children}</Text>

      <Input
        id={inputIdRef.current}
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    </Label>
  );
};

const Label = styled.label({});

const Input = styled.input({
  ...s.text({ family: "NUMBERS" }),

  color: s.colors.black,
  border: 0,
  marginLeft: formInputTextSpacing,
  boxShadow: s.shadows.formFieldInset,
  padding: `${s.grid(0.25)} ${s.grid(0.5)}`,
});

const Text = styled.span({
  ...s.text({ selectable: false }),
});
