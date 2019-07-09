import React, { useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";
import { formBoxStyles, formLabelStyles, Wrapper, Input, Text } from "./form-styles";

export const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ name, checked, disabled = false, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <Wrapper>
      <Input
        id={inputIdRef.current}
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        type="radio"
      />
      <Label htmlFor={inputIdRef.current}>
        <RadioComponent>
          <RadioDot />
        </RadioComponent>
        <Text>{children}</Text>
      </Label>
    </Wrapper>
  );
};

const Label = styled.label({
  ...formLabelStyles,

  // TODO: use onFocusVisible React event once it becomes standardized
  [`${Input}${s.focusVisible} + &`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },

  [`${Input}:hover:not(:checked) + &`]: {
    cursor: "pointer",
  },
});

const RadioComponent = styled.div({
  ...formBoxStyles(Input, Label),
  borderRadius: "50%",
});

const RadioDot = styled.div({
  width: s.grid(0.75),
  height: s.grid(0.75),
  borderRadius: "50%",
  boxShadow: s.shadows.formField,

  visibility: "hidden",
  [`${Input}:checked + ${Label} &`]: {
    visibility: "visible",
    backgroundColor: s.colors.white,
  },
});
