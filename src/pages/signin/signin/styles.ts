import styled from 'styled-components';

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

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  transform: translateY(-10px);

  > button {
    font-size: 0.9rem;
    background: transparent;
    color: #fff;
    position: relative;
    cursor: pointer;
    transition: 0.3s;

    :hover {
      font-weight: 600;
      font-size: 0.95rem;
    }

    :after {
      content: '';
      display: block;
      width: 0px;
      position: absolute;
      bottom: -5px;
      transition: 0.3s;
      background: ${(props) => props.theme.colors.primary};
    }

    :hover:after {
      width: 100%;
      height: 3px;
    }
  }

  @media (min-width: 768px) {
    > button {
      color: #515151;
    }
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
