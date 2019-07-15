import React, { useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";
import {
  checkBoxRadioLabelStyles,
  CheckBoxRadioWrapper,
  CheckBoxRadioInput,
  CheckBoxRadioText,
  formBoxStyles,
} from "./form-shared";

export const InputRadio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ name, checked, disabled = false, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <CheckBoxRadioWrapper>
      <CheckBoxRadioInput
        id={inputIdRef.current}
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Label htmlFor={inputIdRef.current}>
        <RadioComponent>
          <RadioDot />
        </RadioComponent>
        <CheckBoxRadioText>{children}</CheckBoxRadioText>
      </Label>
    </CheckBoxRadioWrapper>
  );
};

const Label = styled.label({
  ...checkBoxRadioLabelStyles,

  // TODO: use onFocusVisible React event once it becomes standardized
  [`${CheckBoxRadioInput}${s.focusVisible} + &`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },

  [`${CheckBoxRadioInput}:hover:not(:checked) + &`]: {
    cursor: "pointer",
  },
});

const RadioComponent = styled.div({
  ...formBoxStyles(CheckBoxRadioInput, Label),
  borderRadius: "50%",
});

const RadioDot = styled.div({
  width: s.grid(0.75),
  height: s.grid(0.75),
  borderRadius: "50%",
  boxShadow: s.shadows.formField,

  visibility: "hidden",
  [`${CheckBoxRadioInput}:checked + ${Label} &`]: {
    visibility: "visible",
    backgroundColor: s.colors.white,
  },
});
