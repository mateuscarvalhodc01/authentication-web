import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
`;

export const ImageSide = styled.div`
  display: none;

  > img {
    width: 40%;
  }

  @media (min-width: 768px) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
  }
`;

export const ContentSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;

  > form {
    width: 100%;
  }

  @media (min-width: 768px) {
    background: #f1f1f1;
  }
`;

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

  @media (min-width: 768px) {
    > img {
      display: none;
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const Text = styled.p`
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #fff;

  @media (min-width: 768px) {
    color: #000;
  }

  &.signup {
    font-size: 1rem;
    text-align: center;
  }
`;

export const Span = styled.span`
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    font-size: 1.1rem;
  }

  :after {
    content: '';
    display: block;
    width: 0px;
    height: 3px;
    position: absolute;
    bottom: -5px;
    left: 0;
    transition: 0.3s;
    background: ${(props) => props.theme.colors.primary};
  }

  :hover:after {
    width: 100%;
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
