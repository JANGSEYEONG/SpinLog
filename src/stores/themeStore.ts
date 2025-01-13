import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_STORE_NAME } from './storeConfig';

type ThemeStoreType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create(
  persist<ThemeStoreType>(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: THEME_STORE_NAME,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
