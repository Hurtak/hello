import { FC, useRef } from "react";
import styled from "styled-components/macro";

import { Icon } from "../../../../../../../icons";
import * as s from "../../../../../../../styles";
import { uuid } from "../../../../../../../utils/random";
import {
  CheckBoxRadioInput,
  checkBoxRadioLabelStyles,
  CheckBoxRadioText,
  CheckBoxRadioWrapper,
  formBoxStyles,
} from "./form-shared";

export const InputCheckBox: FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ checked, disabled = false, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <CheckBoxRadioWrapper>
      <CheckBoxRadioInput
        type="checkbox"
        id={inputIdRef.current}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Label htmlFor={inputIdRef.current}>
        <CheckboxComponent>
          <CheckboxCheckWrapper>
            <Icon type="CHECK" width={1.25} height={1.25} color={s.color.white} />
          </CheckboxCheckWrapper>
        </CheckboxComponent>
        <CheckBoxRadioText>{children}</CheckBoxRadioText>
      </Label>
    </CheckBoxRadioWrapper>
  );
};

const Label = styled.label({
  ...checkBoxRadioLabelStyles(CheckBoxRadioInput),
});

const CheckboxComponent = styled.div({
  ...formBoxStyles(CheckBoxRadioInput, Label),

  borderRadius: s.borderRadius.input,
});

const CheckboxCheckWrapper = styled.div({
  visibility: "hidden",
  [`${CheckBoxRadioInput}:checked + ${Label} &`]: {
    visibility: "visible",
  },
});
