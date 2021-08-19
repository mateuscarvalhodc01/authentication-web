import React, { useRef, useEffect, InputHTMLAttributes } from 'react';

import { useField } from '@unform/core';

import { Input, Label, Span } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const CheckboxComponent: React.FC<InputProps> = ({ name, children }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.checked;
      },
      setValue: (ref, checked) => {
        ref.current.checked = checked;
      },
      clearValue: (ref) => {
        ref.current.checked = false;
      },
    });
  }, [fieldName, registerField]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Label>
        <Input ref={inputRef} type="checkbox" id="checkbox" name={name} />
        {children}
        <Span />
      </Label>
    </div>
  );
};

export default CheckboxComponent;
