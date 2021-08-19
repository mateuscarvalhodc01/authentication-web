import styled from 'styled-components';

export const Label = styled.label`
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  vertical-align: middle;
  position: relative;
  padding-left: 22px;
  cursor: pointer;
  transition: 0.3s;
  color: #fff;


  @media (min-width: 768px) {
    color: #515151;

    &:hover {
      color: #888;
    }
  }
}
`;

export const Span = styled.span`
  height: 15px;
  width: 15px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 3px #666;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  &:after {
    content: '';
    height: 15px;
    width: 15px;
    background: ${(props) => props.theme.colors.primary};
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 5px;
    transition: 300ms ease-in-out 0s;
  }
`;

export const Input = styled.input`
  background: #fff;
  margin-right: 4px;
  cursor: pointer;

  display: none;

  &:checked + ${Span}:after {
    transform: translate(-50%, -50%) scale(1);
  }
`;
