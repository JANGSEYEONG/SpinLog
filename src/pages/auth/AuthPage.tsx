import { useAuthStore } from '@stores/authStore';
// import { Navigate, useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import GoSetting from '@components/information/GoSetting';

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestStorageAccess = async () => {
      if (document.hasStorageAccess) {
        try {
          const hasAccess = await document.hasStorageAccess();
          if (!hasAccess) {
            await document.requestStorageAccess();
            console.log('Storage access granted.');
          }
          // 권한이 부여되거나 이미 권한이 있는 경우 메인 페이지로 리디렉트
          useAuthStore.getState().setLoginState();
          navigate('/');
        } catch (error) {
          alert('Storage access denied.' + error);
          console.error('Storage access denied.', error);
          useAuthStore.getState().setLogoutState();
        }
      } else {
        useAuthStore.getState().setLogoutState();
        alert('Storage Access API is not supported by this browser.');
        console.log('Storage Access API is not supported by this browser.');
      }
    };

    requestStorageAccess();
  }, [navigate]);

  // const [searchParams] = useSearchParams();
  // const isFirstLogin = searchParams.get('isFirstLogin');

  // // 서버에서 인증 받아서 돌아오는 페이지.
  // // 정상적으로 redirect 되었으면 로그인 상태로 업데이트 시켜준다.
  // useAuthStore.getState().setLoginState();

  // // 최초 로그인일 경우 환경설정 유도 페이지로 이동
  // if (isFirstLogin === 'true') return <GoSetting />;
  // return <Navigate to="/" />;

  return (
    <div>
      <h1>Processing Authentication...</h1>
      <p>Please wait while we process your authentication.</p>
    </div>
  );
};

export default AuthPage;
