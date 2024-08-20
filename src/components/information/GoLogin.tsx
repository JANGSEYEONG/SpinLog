import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

import GoLoginBird from '@assets/images/bird/goLoginBird.svg?react';
import useToast from '@hooks/useToast';

type GoLoginProps = {
  birdTop?: string; // 새 위치 조정 (텍스트 높이에 따라 조정 필요)
  message?: React.ReactNode;
};

const GoLogin = ({
  message = `'체험하기'에서는 이용할 수 없어요.`,
  birdTop = '115px',
}: GoLoginProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { setLogoutState } = useAuthStore((state) => {
    return { setLogoutState: state.setLogoutState };
  });
  const handleGoLogin = () => {
    const confirmResult = confirm(
      `'체험하기' 중 저장한 데이터가 초기화됩니다.\n 체험하기를 종료하시겠어요?`,
    );
    if (confirmResult) {
      setLogoutState();
      showToast('체험하기가 종료되었습니다.');
    }
  };
  return (
    <Container>
      <Message>
        <Bird $top={birdTop} />
        <Text>{message}</Text>
        <Text>로그인 하러 가보실까요?</Text>
      </Message>
      <Button $bottom="122px" onClick={handleGoLogin}>
        로그인 하러 가기
      </Button>
      <Button
        className="later"
        $bottom="50px"
        onClick={() => {
          navigate(-1);
        }}>
        나중에 할게요
      </Button>
    </Container>
  );
};

export default GoLogin;

const Container = styled.div`
  ${flexCenter}
  position: relative;
  width: 100%;
  height: 100%;
`;

const Message = styled.div`
  ${flexColumnCenter}
  position: relative;
  width: 100%;
  gap: 8px;
  margin-bottom: 190px;
`;

const Text = styled.div`
  ${flexColumnCenter}
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  margin-right: 40px;
`;

const Button = styled.div<{ $bottom: string }>`
  ${flexCenter}
  position: absolute;
  bottom: ${(props) => props.$bottom};
  width: 358px;
  height: 60px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.lightGreen};
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &.later {
    background-color: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.darkLightGray2};
  }
`;

const Bird = styled(GoLoginBird)<{ $top: string }>`
  position: absolute;
  top: ${(props) => props.$top};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;
