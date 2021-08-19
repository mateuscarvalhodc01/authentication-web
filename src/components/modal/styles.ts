import styled from 'styled-components';

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000066;
  z-index: 99;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px 10px;
  margin: 15px;
  width: 100%;
  max-width: 560px;
  transform: translateY(-20px);
  @media (min-width: 768px) {
    max-height: calc(100vh - 40px);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

export const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: center;
    flex-direction: row;
  }
`;

export const ButtonConfirm = styled.button``;
