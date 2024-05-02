import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  // #20240425.syjang, 여기부터는 임의로 넣은 것 입니다. 수정 가능
  input { 
      box-sizing: border-box;
      border: none;
      outline:none
  }
  input:checked {
      border: none
  }
  button {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
    padding: 0;
  }
  a {
    text-decoration: none;
    outline: none;
    &:hover, &:active {
      text-decoration: none;
    }
      color: #222;
  }

  * {
    box-sizing: border-box;
  }

  // App.tsx에서 ThemeProvider 내부에 GlobalStyles을 선언했기에, 테마 가져다 쓸 수 있음.
  
  // body-background image 여기서 지정
  body {
    background-image: url(${(props) => props.theme.bgImage});
    background-size: cover;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden; // 모바일 화면에서 세로, 가로 스크롤 방지
  }

`;

export default GlobalStyles;
