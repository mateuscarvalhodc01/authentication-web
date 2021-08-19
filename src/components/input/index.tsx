import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import * as S from './styles';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputComponent: React.FC<IInput> = ({ name, type = 'text', ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <S.Input
        name={name}
        ref={inputRef}
        type={type}
        onFocus={clearError}
        {...rest}
      />
      {error && <p className="input-error">{error}</p>}
    </>
  );
};

export default InputComponent;
