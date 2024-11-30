import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserStatus, type UserStatusType } from '@models/user';
import {
  ACCESS_TOKEN_NAME,
  AUTH_STORE_NAME,
  CURRENT_VERSION,
  DEMO_STORE_NAME,
} from './storeConfig';
import { initDemoState } from './services/demoService';
import { useDemoStore } from './demoStore';

type AuthStoreType = {
  userStatus: UserStatusType;
  setLoginState: () => void;
  setLogoutState: () => void;
  setDemoState: () => void;
};

export const useAuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
      userStatus: UserStatus.LoggedOut,
      setLoginState: () =>
        set(() => ({
          userStatus: UserStatus.LoggedIn,
        })),
      setLogoutState: () => {
        // 로컬스토리지 access_token 삭제
        window.localStorage.removeItem(ACCESS_TOKEN_NAME);
        // 로컬스토리지 Demo Data 삭제
        window.localStorage.setItem(DEMO_STORE_NAME, JSON.stringify(initDemoState()));
        // DemoStore 초기화
        useDemoStore.getState().initDemoExpenses();

        set(() => ({
          userStatus: UserStatus.LoggedOut,
        }));
      },
      setDemoState: () => {
        // 필요하면 상태 로컬스토리지에 저장하기
        // window.localStorage.setItem('demo_mode', 'true');
        set(() => ({
          userStatus: UserStatus.Demo,
        }));
      },
    }),
    {
      name: AUTH_STORE_NAME,
      storage: createJSONStorage(() => localStorage),
      version: CURRENT_VERSION,
      migrate: (persistedState, version) => {
        if (version === undefined || version < CURRENT_VERSION) {
          // 버전이 없거나 현재 버전(CURRENT_VERSION)보다 낮은 경우
          window.localStorage.removeItem(ACCESS_TOKEN_NAME);
        }
        return persistedState as AuthStoreType; // 상태를 변경하지 않고 그대로 반환
      },
    },
  ),
);

// 로컬스토리지에 이전에 저장한 토큰이 존재한다면, login state
const initializeUser = () => {
  //#20241117.syjang, 무조건 데모 모드로 넘어가게 세팅
  // useAuthStore.getState().setDemoState();

  if (import.meta.env.MODE === 'development') {
    // demo mode 개발로 주석처리
    //useAuthStore.getState().setLoginState();
  } else {
    // const accessToken = window.localStorage.getItem(ACCESS_TOKEN_NAME);
    // if (accessToken) {
    //   useAuthStore.getState().setLoginState();
    // } else {
    //   // 토큰 없으면 서비스 오픈 시 무조건 로그아웃 스테이트가 맞음
    //   useAuthStore.getState().setLogoutState();
    // }
  }
};
initializeUser();
