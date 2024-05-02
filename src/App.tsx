import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';
import GlobalFonts from './styles/GlobalFonts';
import { Outlet } from 'react-router-dom';

import { useThemeStore } from '@stores/themeStore';

const App = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <GlobalFonts />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
