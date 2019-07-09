import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";

export const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ name, checked, disabled = false, onChange, children }) => {
  const inputId = useRef(uuid());
  const [labelHovered, setLabelHovered] = useState(false);

  return (
    <Wrapper>
      <Input
        id={inputId.current}
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        type="radio"
      />
      <Label
        htmlFor={inputId.current}
        onMouseEnter={() => setLabelHovered(true)}
        onMouseLeave={() => setLabelHovered(false)}
        checked={checked}
      >
        <Checkbox checked={checked} hovered={labelHovered}></Checkbox>
        <Text>{children}</Text>
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "row",
});

const Input = styled.input({
  ...s.visuallyHideInputFieldWhileStillInteractive,
});

const Label = styled.label((props: { checked: boolean }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: `${s.grid(0.25)} 0`,

  [`${Input}${s.focusVisible} + &`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },

  ...(!props.checked && {
    cursor: "pointer",
  }),
}));

const Checkbox: React.FC<{
  checked: boolean;
  hovered: boolean;
}> = ({ checked, hovered }) => {
  const dotVisible = checked || hovered;

  return (
    <CheckboxWrapper blue={checked}>
      {dotVisible && <CheckboxDot blue={hovered && !checked} />}
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div((props: { blue: boolean }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: s.grid(2),
  height: s.grid(2),
  borderRadius: "50%",
  background: props.blue ? s.colors.blue : s.colors.white,
  boxShadow: s.shadows.formFieldInset,
}));

const CheckboxDot = styled.div((props: { blue: boolean }) => ({
  width: s.grid(0.75),
  height: s.grid(0.75),
  borderRadius: "50%",
  background: props.blue ? s.colors.blue : s.colors.white,
  boxShadow: s.shadows.formField,
}));

const Text = styled.span({
  ...s.text(),

  marginLeft: s.grid(1.25),
});
