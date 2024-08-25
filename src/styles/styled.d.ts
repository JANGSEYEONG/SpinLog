// import original module declarations
import 'styled-components';

// #20240425.syjang, Theme.ts 내에서 테마 수정 시 type DefaultTheme 변경이 필요합니다.
declare module 'styled-components' {
  export type DefaultTheme = {
    bgImage: string;
    backgroundColor: {
      layout: string;
      navigation: string;
      contentBox: string;
      overlay: string;
    };
    topNavigation: {
      iconGray: string;
      iconWhite: string;
      titleWhite: string;
      titleBlack: string;
    };
    bottomNavigation: {
      icon: string;
      title: string;
    };
    colors: {
      jade: string;
      lightGreen: string;
      white: string;
      black: string;
      lightBlack: string;
      transparentBlack: string;
      lightRed: string;
      red: string;
      orange: string;
      lightGray: string;
      lightGray2: string;
      lightGray3: string;
      gray: string;
      gray2: string;
      darkLightGray: string;
      darkLightGray2: string;
      darkGray: string;
    };
    shadows: {
      on: string;
      under: string;
      around: string;
    };
  };
}
