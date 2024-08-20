import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

import { UserStatus } from '@models/user';
import { PagePath } from '@models/navigation';

import MetaThemeColor from '@components/background/MetaThemeColor';

import SwipeContainer from './components/SwipeContainer';
import LoginButtonContainer from './components/LoginButtonContainer';

const LoginPage = () => {
  const { userStatus, setLogoutState } = useAuthStore((state) => {
    return {
      userStatus: state.userStatus,
      setLogoutState: state.setLogoutState,
      setDemoState: state.setDemoState,
    };
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const isLoginFail = searchParams.get('isLoginFail');
  const [handledLoginFail, setHandledLoginFail] = useState<boolean>(false);

  useEffect(() => {
    if (isLoginFail === 'true' && !handledLoginFail) {
      setLogoutState();
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      setHandledLoginFail(true);

      searchParams.delete('isLoginFail');
      setSearchParams(searchParams);
    }
  }, [isLoginFail, handledLoginFail, setLogoutState, searchParams, setSearchParams]);

  // #20240501.syjang, 이미 '로그인'된 상태라면 메인 페이지로 보낸다.
  // 데모가 아닌 진짜 로그인 상태일때만 바로 메인페이지로 이동
  if (userStatus === UserStatus.LoggedIn) return <Navigate to={PagePath.Main} />;

  // 데모 모드일 때도 로그인 페이지로 이동
  if (userStatus === UserStatus.Demo) return <Navigate to={PagePath.Main} />;

  return (
    <LoginContainer>
      <MetaThemeColor />
      <SwipeContainer />
      <LoginButtonContainer />
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;

  color: #bcbcbc;
  background-color: ${(props) => props.theme.backgroundColor.layout};
`;
