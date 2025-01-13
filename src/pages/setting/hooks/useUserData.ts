import type { UserSettingDataType } from '@service/user/types';
import { fetchUserData } from '@service/user/userService';
import { useDemoStore } from '@stores/demoStore';

import { useQuery } from 'react-query';

const useUserData = (isDemoMode: boolean) => {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error,
  } = useQuery<UserSettingDataType>(['fetchUserDataQueryKey'], () => fetchUserData(), {
    enabled: !isDemoMode,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // [체험하기] 유저 환경설정 데이터
  const demoUserData = useDemoStore((state) => state.userSettings);

  return {
    userData: isDemoMode ? demoUserData : userData,
    isLoadingUserData,
    error,
  };
};
export default useUserData;
