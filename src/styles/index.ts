import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body,
  #root {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    font-family: 'Open Sans', sans-serif;
    font-size: 10px;

    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;

    @media (min-width: 992px) {
      font-size: 18px;
    };
  }

  a {
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    border: 0;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
  }

  ul {
    list-style: none;
    text-align: left;
    padding: 0;
  }

  svg {
    overflow: visible;
  }

  .input-error {
    color: red;
    font-size: 0.8rem;
    padding-left: 7px;
    text-align: left;
    margin-top: 5px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    position: relative;
    transition: .3s;
  }

  button:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 0%;
    border-radius: 5px;
    background-color: #ffffff33;
    transition: .3s;
  }

  button:hover:after {
    width: 100%;
    height: 100%;
  }

  button:active:after {
    width: 0%;
    height: 0%;
    transition: .1s;
  }
`;
