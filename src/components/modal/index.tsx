import React from 'react';

import { Background, Container, ModalBody } from './styles';

interface ModalProps {
  dismissModal: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ dismissModal, children }) => {
  return (
    <Background
      onClick={() => {
        dismissModal();
      }}
    >
      <Container
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalBody>{children}</ModalBody>
      </Container>
    </Background>
  );
};

export default ModalComponent;
