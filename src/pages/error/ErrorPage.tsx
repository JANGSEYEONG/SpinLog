import styled, { useTheme } from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';
import ErrorBird from '@assets/images/bird/errorBird.svg?react';

import { useNavigate } from 'react-router-dom';

import MetaThemeColor from '@components/background/MetaThemeColor';
import { PagePath } from '@models/navigation';
import { useAuthStore } from '@stores/authStore';

type ErrorPageProps = {
  isRootError?: boolean;
};

const ErrorPage = ({ isRootError = false }: ErrorPageProps) => {
  const navigator = useNavigate();
  const theme = useTheme();

  const { setLogoutState } = useAuthStore((state) => {
    return { setLogoutState: state.setLogoutState };
  });
  const handleReturn = () => {
    if (isRootError) {
      setLogoutState();
      navigator(PagePath.Login);
    } else {
      navigator(PagePath.Main);
    }
  };
  return (
    <Container>
      <MetaThemeColor />
      <ErrorBird></ErrorBird>
      {isRootError ? (
        <Text style={{ color: theme.backgroundColor.layout }}>예기치 않은 에러가 발생했어요</Text>
      ) : (
        <Text>원하는 페이지를 찾을 수 없어요</Text>
      )}

      <Button
        onClick={
          handleReturn
        }>{`${isRootError ? '로그인 페이지로 돌아가기' : '홈으로 돌아가기'}`}</Button>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  position: relative;
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  padding-bottom: 150px;
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.darkLightGray2};
  font-size: 16px;
  font-weight: 700;
`;

const Button = styled.div`
  ${flexCenter}
  position: absolute;
  bottom: 50px;
  width: 358px;
  height: 60px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.lightGreen};
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
