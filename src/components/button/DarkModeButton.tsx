import { useThemeStore } from '@stores/themeStore';

const DarkModeButton = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  return <button onClick={toggleTheme}>{isDarkMode ? '다크하다' : '라이트하다'}</button>;
};

export default DarkModeButton;
