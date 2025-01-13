import useToast from '@hooks/useToast';
import { logoutUser } from '@service/user/userService';
import { useAuthStore } from '@stores/authStore';

import { useMutation } from 'react-query';

const useLogout = (isDemoMode: boolean) => {
  const { showToast } = useToast();

  const logoutMutation = useMutation(logoutUser, {
    onSuccess: (data) => {
      useAuthStore.getState().setLogoutState();
      showToast('로그아웃되었습니다.');
      console.log(`로그아웃 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      showToast('로그아웃에 실패했습니다.');
      console.error(`로그아웃 실패: ${error}`);
    },
  });

  // 체험하기 종료
  const demoLogoutMutation = {
    mutate: () => {
      useAuthStore.getState().setLogoutState();
      showToast('체험하기가 종료되었습니다.');
    },
  };

  if (isDemoMode) return demoLogoutMutation;
  return logoutMutation;
};

export default useLogout;
