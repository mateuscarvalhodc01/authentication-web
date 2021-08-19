import styled from 'styled-components';
import { BackArrow, BackArrowLight } from '~/assets/icons';

export const FormContainer = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  transform: translateY(-40px);

  > img {
    width: 75%;
    margin-bottom: 30px;
  }

  > .backButton {
    position: absolute;
    left: 0;
    top: -50px;
    font-weight: 400;
    font-size: 0.9rem;
    color: #fff;
    background: transparent;
  }

  > .backButton:before {
    content: '';
    display: inline-block;
    width: 25px;
    height: 25px;
    background-image: url(${BackArrowLight});
    background-size: contain;
    margin-right: 5px;
  }

  @media (min-width: 768px) {
    > img {
      display: none;
    }

    > .backButton {
      color: #000;
    }

    > .backButton:before {
      background-image: url(${BackArrow});
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const Text = styled.p`
  font-size: 1.3rem;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    color: #000;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h4 {
    margin-bottom: 20px;
  }

  > button {
    width: 50%;
    min-width: 250px;
  }
`;
