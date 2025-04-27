import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
  }

  button:focus, input:focus, select:focus, textarea:focus {
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyles; 