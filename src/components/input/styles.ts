import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 0px 10px 10px;
  font-size: 1rem;
  border: 1px solid #666;
  border-radius: 5px;

  :focus {
    -webkit-appearance: none;
    -webkit-box-shadow: 0px 0px 1px 2px
      ${(props) => props.theme.colors.secondary};
    box-shadow: 0px 0px 1px 2px ${(props) => props.theme.colors.secondary};

    @media (min-width: 768px) {
      -webkit-box-shadow: 0px 0px 1px 1px
        ${(props) => props.theme.colors.secondary};
      box-shadow: 0px 0px 1px 1px ${(props) => props.theme.colors.secondary};
    }
  }
`;
