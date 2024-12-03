import { ReactNode } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';
import { UserStatus } from '@models/user';
import { PagePath } from '@models/navigation';

import GoLogin from '@components/information/GoLogin';

type ProtectedRouteProps = {
  allowDemoMode?: boolean;
  children: ReactNode;
};

const ProtectedRoute = ({ allowDemoMode = false, children }: ProtectedRouteProps) => {
  // 1. 현재 로그인 상태 가져오기
  const { userStatus, setDemoState } = useAuthStore();

  // 1-1. 강제 데모 모드 체크
  const [searchParams] = useSearchParams();
  const searchParamDemo = searchParams.get('isDemo');

  // 2. 로그인 상태면 자식 컴포넌트 보여주기
  if (userStatus === UserStatus.LoggedIn) return children;

  // 3. 데모 상태인 경우
  if (userStatus === UserStatus.Demo || searchParamDemo === 'true') {
    if (userStatus !== UserStatus.Demo) {
      setDemoState();
    }
    // 데모가 허용된 페이지는 이동, 아니라면 로그인 유도 컴포넌트 보여주기
    return allowDemoMode ? children : <GoLogin />;
  }

  // 4. 로그인, 데모 상태가 아닌 경우
  return <Navigate to={PagePath.Login} />;
};

export default ProtectedRoute;
