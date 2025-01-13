import useToast from '@hooks/useToast';
import type { UserFormType } from '@models/user';
import { saveUserData } from '@service/user/userService';
import { useDemoStore } from '@stores/demoStore';

import { useMutation } from 'react-query';

const useSaveUserData = (isDemoMode: boolean) => {
  const { showToast } = useToast();
  const setDemoUserSetting = useDemoStore((state) => state.setDemoUserSetting); // 체험하기용

  const saveUserMutation = useMutation(saveUserData, {
    onSuccess: (data) => {
      showToast('저장했습니다.');
      console.log(`유저 데이터 저장 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`유저 데이터 저장 실패: ${error}`);
    },
  });

  // [체험하기] 예산 저장 로직
  const saveDemoUserMutaion = {
    mutate: (data: UserFormType) => {
      setDemoUserSetting(parseInt(data.budget));
      showToast('저장했습니다.');
      console.log(`demo user save: ${JSON.stringify(data)}`);
    },
    isLoading: false,
  };
  if (isDemoMode) return saveDemoUserMutaion;
  return saveUserMutation;
};

export default useSaveUserData;
