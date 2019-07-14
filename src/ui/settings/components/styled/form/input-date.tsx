import React, { useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";

export const InputDate: React.FC<{
  min: string;
  max: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: string;
}> = ({ min, max, value, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <Wrapper>
      <Text>{children}</Text>

      <Input
        type="date"
        id={inputIdRef.current}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.label({
  //
});

const Input = styled.input({
  border: 0,
  marginLeft: s.grid(1.25),
  boxShadow: s.shadows.formFieldInset,
});

const Text = styled.span({
  ...s.text({ selectable: false }),
});
