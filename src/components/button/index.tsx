import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const ButtonComponent: React.FC<IButton> = ({
  type = 'button',
  isLoading = false,
  children,
  ...rest
}) => {
  return (
    <S.Button type={type} disabled={isLoading} {...rest}>
      {isLoading ? 'Carregando...' : children}
    </S.Button>
  );
};

export default ButtonComponent;
