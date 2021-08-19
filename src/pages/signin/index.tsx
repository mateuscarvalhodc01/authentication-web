import React, { useState } from 'react';
// COMPONENTS
import SigninComponent from './signin/index';
import ForgotPasswordComponent from './forgotPassword/index';
// STYLES
import * as S from './styles';
// ASSETS
import { LogoLight } from '~/assets/images';

const SigninPage: React.FC = () => {
  /**
   * CONTROLE DE ESTADO PARA O "Content Side"
   * Altera o formulário a ser exibido em "Content Side"
   * podendo alternar entre login e esqueci minha senha.
   */
  const [currentForm, setCurrentForm] = useState<'signin' | 'forgotPassword'>(
    'signin',
  );

  return (
    <S.Container>
      <S.ImageSide>
        <img src={LogoLight} alt="Authentication Logo" />
      </S.ImageSide>
      <S.ContentSide>
        {currentForm === 'signin' ? (
          <SigninComponent emitCurrentForm={setCurrentForm} />
        ) : (
          <ForgotPasswordComponent emitCurrentForm={setCurrentForm} />
        )}
      </S.ContentSide>
    </S.Container>
  );
};

export default SigninPage;
