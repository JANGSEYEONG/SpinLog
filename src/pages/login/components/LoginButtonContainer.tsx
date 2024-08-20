import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

import LoginBird from '@assets/images/bird/loginBird.svg?react';
import kakaoImg from '@assets/images/login/kakao.png';
import naverImg from '@assets/images/login/naver.png';
import googleImg from '@assets/images/login/google.png';

import { PagePath } from '@models/navigation';

const LoginButtonContainer = () => {
  const AUTH_URL = `https://www.api-spinlog.shop/api/users/login`;

  const navigate = useNavigate();
  const { setDemoState } = useAuthStore((state) => {
    return {
      setDemoState: state.setDemoState,
    };
  });

  // 이벤트 핸들러는 JSX를 반환하지 않기 때문에 useNavigate로 페이지 이동 필요
  // 데모 로그인 처리
  const handleClickDemo = () => {
    setDemoState();
    navigate(PagePath.Main);
  };
  return (
    <Container>
      <Button href={`${AUTH_URL}/kakao`}>
        <Bird />
        <Img src={kakaoImg} />
      </Button>
      <Button href={`${AUTH_URL}/naver`}>
        <Img src={naverImg} />
      </Button>
      <Button href={`${AUTH_URL}/google`}>
        <Img src={googleImg} />
      </Button>
      <ExperienceButton onClick={handleClickDemo}>체험하기</ExperienceButton>
    </Container>
  );
};

export default LoginButtonContainer;

const Container = styled.div`
  ${flexColumnCenter}
  background-color:transparent;
  width: 100%;
  height: 40%;
  gap: 12px;
`;

const Button = styled.a`
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

const ExperienceButton = styled.button`
  width: 358px;
  height: 50px;
  margin-top: 10px;

  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.lightGreen};

  color: white;
  font-size: 18px;
  font-weight: 500;
`;
