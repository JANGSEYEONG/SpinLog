import { UserStatus } from '@models/user';
import { useAuthStore } from '@stores/authStore';

const useIsDemoMode = (): boolean => {
  const userStatus = useAuthStore((state) => state.userStatus);
  return userStatus === UserStatus.Demo;
};

export default useIsDemoMode;
