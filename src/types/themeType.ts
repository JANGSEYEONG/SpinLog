export type themeState = {
  isDarkMode: boolean;
};

export type ThemeStoreType = themeState & {
  toggleTheme: () => void;
};
