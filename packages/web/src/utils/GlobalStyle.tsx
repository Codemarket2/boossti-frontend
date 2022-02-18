import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  button {
    outline: none !important;
  }
  .ck-balloon-panel_caret_se{
    z-index: 99991 !important;
  }
`;

export default GlobalStyle;
