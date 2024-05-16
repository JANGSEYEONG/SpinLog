import styled from 'styled-components';
import { useAuthStore } from '@stores/authStore';
import { Navigate } from 'react-router-dom';

import LogoIcon from '@assets/images/icon/logoGreen.svg?react';
import LogoIconTitle from '@assets/images/icon/logoTitle.svg?react';

import { flexColumnCenter } from '@styles/CommonStyles';
import SocialLogin from './components/socialLogin';

import axios from 'axios';

const First = () => {
  function onClick1() {
    axios
      .get('https://www.api-spinlog.shop/oauth2/fc', { withCredentials: true })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function onClick2() {
    axios
      .get('https://www.api-spinlog.shop/oauth2/sc', { withCredentials: true })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function onClick3() {
    axios
      .get('https://www.api-spinlog.shop/oauth2/test', { withCredentials: true })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <Button onClick={onClick1}>hello button1</Button>
      <Button onClick={onClick2}>hello button2</Button>
      <Button onClick={onClick3}>hello button3</Button>
    </div>
  );
};

const LoginPage = () => {
  // #20240501.syjang, 이미 로그인된 상태라면 메인 페이지로 보낸다.
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer>
      <LogoWrapper>
        <Logo />
        <LogoTitle />
      </LogoWrapper>
      <LoginButtonContainer>
        <SocialLogin provider={'kakao'} />
        <SocialLogin provider={'naver'} />
        {/* <SocialLogin provider={'google'} /> */}
      </LoginButtonContainer>
      <ExperienceWrapper>
        <ExperienceButton>체험하기</ExperienceButton>
      </ExperienceWrapper>
      <First />
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  ${flexColumnCenter}

  color: ${(props) => props.theme.colors.font};

  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;

  padding-top: 50px;
  padding: 10px;
`;

const LogoWrapper = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 45%;
`;

const Logo = styled(LogoIcon)`
  width: 100px;
  height: 100px;
`;

const LogoTitle = styled(LogoIconTitle)`
  width: 86px;
  height: 24px;
`;

const LoginButtonContainer = styled.div`
  ${flexColumnCenter}
  background-color: transparent;
  width: 100%;
  height: 35%;
`;
const ExperienceWrapper = styled.div`
  background-color: transparent;
  width: 100%;
  height: 20%;
  text-align: center;
`;

const ExperienceButton = styled.button`
  width: 350px;
  height: 35%;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.button};
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: medium;
  font-size: 18px;
  color: white;
`;

const Button = styled.button`
  border: 1px solid black;
`;
