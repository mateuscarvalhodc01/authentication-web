import React from 'react';

import ButtonComponent from '~/components/button';
import { useAuth } from '~/hooks/auth';
import * as S from './styles';

const HomePage: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <S.Container>
      <h2>Parabéns! Você está em uma rota protegida.</h2>
      <ButtonComponent onClick={() => signOut()}>Logout</ButtonComponent>
    </S.Container>
  );
};

export default HomePage;
