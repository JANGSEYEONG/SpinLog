import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // #20240429.syjang, '체험하기' 상태 분기 추가 필요
  // 1. 로그인 상태 가져오기
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 2. 로그인 상태라면 자식 컴포넌트 보여주고 아니라면 로그인 페이지로 이동
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
