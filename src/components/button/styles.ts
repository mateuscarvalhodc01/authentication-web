import styled from 'styled-components';

export const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  padding: 10px 0px;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;

  &:disabled {
    cursor: default;
  }

  &:disabled::after {
    width: 0%;
    height: 0%;
  }
`;
