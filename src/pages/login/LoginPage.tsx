import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

import LogoIcon from '@assets/images/icon/logoGreen.svg?react';
import LogoIconTitle from '@assets/images/icon/logoTitleGray.svg?react';
import LoginBird from '@assets/images/bird/loginBird.svg?react';

import MetaThemeColor from '@components/background/MetaThemeColor';

import kakaoImg from '@assets/images/login/kakao.png';
import naverImg from '@assets/images/login/naver.png';
import googleImg from '@assets/images/login/google.png';

const LoginPage = () => {
  // #20240501.syjang, 이미 로그인된 상태라면 메인 페이지로 보낸다.
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const AUTH_URL = `https://www.api-spinlog.shop/api/users/login`;

  return (
    <LoginContainer>
      <MetaThemeColor color="#F4F4F4" />
      <LogoWrapper>
        <Logo />
        <LogoTitle />
      </LogoWrapper>
      <LogoText>
        소비 중 감정 발현 시<br />
        소비내역과 감정일기 가계부
      </LogoText>
      <LoginButtonContainer>
        <LoginButton href={`${AUTH_URL}/kakao`}>
          <Bird />
          <Img src={kakaoImg} />
        </LoginButton>
        <LoginButton href={`${AUTH_URL}/naver`}>
          <Img src={naverImg} />
        </LoginButton>
        <LoginButton href={`${AUTH_URL}/google`}>
          <Img src={googleImg} />
        </LoginButton>
      </LoginButtonContainer>
      {/* <ExperienceWrapper>
        <ExperienceButton>체험하기</ExperienceButton>
      </ExperienceWrapper> */}
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;

  color: #bcbcbc;
  background-color: ${(props) => props.theme.colors.background};
`;

const LogoWrapper = styled.div`
  ${flexColumnCenter}
  width: 100%;
`;

const Logo = styled(LogoIcon)`
  margin-top: 100px;
`;

const LogoTitle = styled(LogoIconTitle)`
  margin-top: 5px;
`;

const LogoText = styled.div`
  margin-top: 23px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
`;

const LoginButtonContainer = styled.div`
  ${flexColumnCenter}
  margin-top: 142px;
  background-color: transparent;
  width: 100%;
  height: 35%;
  gap: 12px;
`;

const LoginButton = styled.a`
  width: 358px;
  height: 60px;

  position: relative;
  overflow: visible;
  z-index: 1;

  cursor: pointer;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};
`;

const Img = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

const Bird = styled(LoginBird)`
  position: absolute;
  top: -77px;
  right: -20px;
  z-index: -1;
`;

// 1차 배포 - 체험하기 숨김처리
// const ExperienceWrapper = styled.div`
//   background-color: transparent;
//   width: 100%;
//   height: 20%;
//   text-align: center;
// `;

// const ExperienceButton = styled.button`
//   width: 350px;
//   height: 35%;
//   border-radius: 6px;
//   background-color: ${(props) => props.theme.colors.button};
//   font-family: 'Noto Sans KR', sans-serif;
//   font-weight: medium;
//   font-size: 18px;
//   color: white;
// `;
