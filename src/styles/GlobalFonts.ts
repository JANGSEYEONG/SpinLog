import { createGlobalStyle } from 'styled-components';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'SUIT';
    font-weight: 100 900;
    font-display: swap;
    src: url('/assets/fonts/SUIT/SUIT-Variable.woff2') format('woff2-variations'),
          url('/assets/fonts/SUIT/SUIT-Variable.ttf') format('truetype');
  }
`;

export default GlobalFonts;
