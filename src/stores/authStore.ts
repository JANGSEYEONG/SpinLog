import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthStoreType } from '../types/authType';

export const useAuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
      isLoggedIn: false,
      userId: null,

      setLoginState: () =>
        set(() => ({
          isLoggedIn: true,
        })),

      setLogoutState: () =>
        set(() => ({
          isLoggedIn: false,
        })),

      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: 'auth-state',
      getStorage: () => localStorage,
    },
  ),
);

// // #20240429.syjang, 예시임, 나중에 로그인 토큰 어디에 저장할지에 따라 다름. 우선 false로 return
// const initializeUser = () => {
//   //const accessToken = localStorage.getItem('access_Token');
//   //accessToken ? useAuthStore.getState().setLoginState() : useAuthStore.getState().setLogoutState();
//   useAuthStore.getState().setLogoutState();
// };

// initializeUser();
