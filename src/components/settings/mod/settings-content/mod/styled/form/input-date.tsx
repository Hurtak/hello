import { FC, useRef } from "react";
import styled from "styled-components/macro";

import * as s from "../../../../../../../styles";
import { uuid } from "../../../../../../../utils/random";

export const InputDate: FC<{
  defaultValue: string;
  min: string;
  max: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: string;
}> = ({ defaultValue, min, max, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <Label>
      <Text>{children}</Text>

      <Input
        id={inputIdRef.current}
        type="date"
        defaultValue={defaultValue}
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

  color: s.color.black,
  border: 0,
  outline: 0,
  marginLeft: s.size(s.dimensions.formSpacing),
  boxShadow: s.shadow.formFieldInset,
  padding: `${s.grid(0.25)} ${s.grid(0.5)}`,

  ":focus-visible": {
    outlineWidth: s.grid(0.75),
    outlineStyle: "solid",
    outlineColor: s.color.whiteTransparent20,
  },
});

const Text = styled.span({
  ...s.text({ selectable: false }),
});
