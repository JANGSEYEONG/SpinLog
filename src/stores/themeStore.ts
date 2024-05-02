import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeStoreType } from '../types/themeType';

// #20240429.syjang, persist 미들웨어를 사용해 로컬스토리지에 저장
export const useThemeStore = create(
  persist<ThemeStoreType>(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-settings',
      getStorage: () => localStorage,
    },
  ),
);
