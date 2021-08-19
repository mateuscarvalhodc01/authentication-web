import React from 'react';

import { Container, ErrorMessage } from './styles';

interface IError {
  message: string;
}

const ErrorComponent: React.FC<IError> = ({ message }) => {
  return (
    <Container>
      <ErrorMessage>{message}</ErrorMessage>
    </Container>
  );
};

export default ErrorComponent;
