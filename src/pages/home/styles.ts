import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h2 {
    margin-bottom: 20px;
  }

  > button {
    width: 200px;
  }
`;
