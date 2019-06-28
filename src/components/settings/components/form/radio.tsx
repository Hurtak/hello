import React from "react";
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
