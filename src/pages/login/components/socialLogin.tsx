// import axios from 'axios';
import styled from 'styled-components';
import { useAuthStore } from '@stores/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type ProviderName = 'naver' | 'kakao'; //| 'google'

type ButtonProps = {
  provider: ProviderName;
};

type SocialLoginProps = {
  provider: ProviderName;
};

const SocialLogin = ({ provider }: SocialLoginProps) => {
  // const AUTH_URL = `${import.meta.env.VITE_SPINLOG_SERVER_URL}/oauth2/authorization/${provider}`; // api 서버 돌아가면 변경할 것
  // const AUTH_URL = `${import.meta.env.VITE_NGROK_URL}/oauth2/authorization/${provider}`;
  //const navigate = useNavigate();
  //const { setLoginState } = useAuthStore((state) => {
  //  return { setLoginState: state.setLoginState };
  //});

  const handleClickLogin = async () => {
    try {
      const response = await axios.get('https://www.api-spinlog.shop/api/users/login/kakao');
      console.log(response.data);
      alert();
    } catch (error) {
      console.error('Error fetching article: ', error);
      alert(error);
    }

  };

  return <Button provider={provider} onClick={handleClickLogin} />;
};

export default SocialLogin;

const Button = styled.button<ButtonProps>`
  background-image: ${(props) =>
    props.provider === 'kakao'
      ? 'url("https://i.ibb.co/2cdRQ7x/kakao-login-large-wide.png")'
      : props.provider === 'naver'
        ? 'url("https://i.ibb.co/Pj8Mfpv/naver-login-large-wide.png")'
        : ''}; // google 로그인 이미지 삽입
  // : 'url("https://i.ibb.co/dsadsadsa/google-login-large-wide.png")'};
  background-size: 100%;
  cursor: pointer;
  width: 21.874rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  margin: 5px;
`;
