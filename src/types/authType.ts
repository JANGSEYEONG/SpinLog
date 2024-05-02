// #20240429.syjang, 예시입니다. 추후 변경 가능합니다.

export type UserLoginStatus = 'LoggedIn' | 'Trial' | 'LoggedOut';
export type authState = {
  isLoggedIn: boolean;
  userId: number | null;
};
export type AuthStoreType = authState & {
  setLoginState: () => void;
  setLogoutState: () => void;
  setUserId: (id: number | null) => void;
};
