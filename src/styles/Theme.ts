import { DefaultTheme } from 'styled-components';

// 예시로 작성한 것이므로, 테마 이름과 내용 모두 수정 가능하나 styled.d.ts 내의 DefaultTheme type도 함께 수정해주셔야 합니다.
export const lightTheme: DefaultTheme = {
  backgroundColor: {
    layout: '#f4f4f4',
    navigation: '#ffffff',
    contentBox: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  topNavigation: {
    iconGray: '#bcbcbc',
    iconWhite: '#ffffff',
    titleWhite: '#ffffff',
    titleBlack: '#333331',
  },
  bottomNavigation: {
    icon: '#bcbcbc',
    title: '#a7acaa',
  },
  colors: {
    jade: '#c3ebe2',
    lightGreen: '#47cfb0',
    white: '#ffffff',
    black: '#000000',
    transparentBlack: 'rgba(0,0,0,0.1)',
    lightBlack: '#333331',
    lightRed: '#fc4873',
    red: '#ff0000',
    orange: '#f3905b',
    lightGray: '#dddddd',
    lightGray2: '#e3e3e3',
    lightGray3: '#e7e7e7',
    gray: '#cccccc',
    gray2: '#bcbcbc',
    darkLightGray: '#9f9f9f',
    darkLightGray2: '#767676',
    darkGray: '#575755',
  },
  shadows: {
    on: '0px -5px 10px -10px gray',
    under: '0px 5px 10px -10px gray',
    around: '0px 5px 14.56px 0px #5252521a',
  },
};

export const darkTheme: DefaultTheme = {
  backgroundColor: {
    layout: '#f4f4f4',
    navigation: '#ffffff',
    contentBox: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  topNavigation: {
    iconGray: '#bcbcbc',
    iconWhite: '#ffffff',
    titleWhite: '#ffffff',
    titleBlack: '#333331',
  },
  bottomNavigation: {
    icon: '#bcbcbc',
    title: '#a7acaa',
  },
  colors: {
    jade: '#c3ebe2',
    lightGreen: '#47cfb0',
    white: '#ffffff',
    black: '#000000',
    transparentBlack: 'rgba(0,0,0,0.1)',
    lightBlack: '#333331',
    lightRed: '#fc4873',
    red: '#ff0000',
    orange: '#f3905b',
    lightGray: '#dddddd',
    lightGray2: '#e3e3e3',
    lightGray3: '#e7e7e7',
    gray: '#cccccc',
    gray2: '#bcbcbc',
    darkLightGray: '#9f9f9f',
    darkLightGray2: '#767676',
    darkGray: '#575755',
  },
  shadows: {
    on: '0px -5px 10px -10px gray',
    under: '0px 5px 10px -10px gray',
    around: '0px 5px 14.56px 0px #5252521a',
  },
};
