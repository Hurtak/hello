import React from "react";
import { GenericFormField } from "./generic-form-field";

export const Checkbox: React.FC<{
  checked: boolean;
  onChange: () => void;
  children: string;
}> = ({ checked, onChange, children }) => {
  return (
    <GenericFormField checked={checked} onChange={onChange} type="checkbox">
      {children}
    </GenericFormField>
  );
};
