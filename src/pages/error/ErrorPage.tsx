import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';
import ErrorBird from '@assets/images/bird/errorBird.svg?react';

import { useNavigate } from 'react-router-dom';

import MetaThemeColor from '@components/background/MetaThemeColor';

const ErrorPage = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <MetaThemeColor color="#F4F4F4" />
      <ErrorBird></ErrorBird>
      <Text>원하는 페이지를 찾을 수 없어요</Text>
      <Button
        onClick={() => {
          navigator('/');
        }}>
        홈으로 돌아가기
      </Button>
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
  color: #767676;
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
  background-color: #47cfb0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
