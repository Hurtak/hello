import { VFC, useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../../../utils/random";
import * as s from "../../../../../../../styles";
import {
  checkBoxRadioLabelStyles,
  CheckBoxRadioWrapper,
  CheckBoxRadioInput,
  CheckBoxRadioText,
  formBoxStyles,
} from "./form-shared";

export const InputRadio: VFC<{
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
  ...checkBoxRadioLabelStyles(CheckBoxRadioInput),

  [`${CheckBoxRadioInput}:checked + &`]: {
    cursor: "auto",
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
  boxShadow: s.shadow.formField,

  visibility: "hidden",
  [`${CheckBoxRadioInput}:checked + ${Label} &`]: {
    visibility: "visible",
    backgroundColor: s.color.white,
  },
});
