import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 10px;
}
body {
  font-family: monospace;
  font-weight: bold;
  margin: 0;
}
*, *:before, *:after {
    box-sizing: inherit;
}
`;