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
