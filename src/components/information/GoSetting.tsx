import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import SettingBird from '@assets/images/bird/settingBird.svg?react';
import { useNavigate } from 'react-router-dom';

const GoSetting = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Message>
        <SettingBird />
        <Text>예산과 프로필을 설정하면</Text>
        <Text>서비스를 똑똑하게 이용할 수 있어요</Text>
      </Message>
      <Button
        bottom="122px"
        onClick={() => {
          navigate('/setting?isFirstLogin=true');
        }}>
        환경설정으로 가기
      </Button>
      <Button
        className="later"
        bottom="50px"
        onClick={() => {
          navigate('/');
        }}>
        나중에 할게요
      </Button>
    </Container>
  );
};

export default GoSetting;

const Container = styled.div`
  ${flexCenter}
  position: relative;
  width: 100%;
  height: 100%;
`;

const Message = styled.div`
  ${flexColumnCenter}
  gap: 5px;
  margin-bottom: 190px;
`;

const Text = styled.div`
  color: #767676;
  font-size: 16px;
  font-weight: 700;
`;

const Button = styled.div<{ bottom: string }>`
  ${flexCenter}
  position: absolute;
  bottom: ${(props) => props.bottom};
  width: 358px;
  height: 60px;
  border-radius: 6px;
  background-color: #47cfb0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &.later {
    background-color: #dddddd;
    color: #767676;
  }
`;
