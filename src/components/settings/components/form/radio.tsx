import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../../styles/styles";
import { GenericFormField } from "./generic-form-field";

export const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ name, checked, disabled = false, onChange, children }) => (
  <GenericFormField
    checked={checked}
    disabled={disabled}
    name={name}
    onChange={onChange}
    type="radio"
  >
    {children}
  </GenericFormField>
);
