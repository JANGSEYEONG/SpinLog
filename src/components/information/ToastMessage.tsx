import styled, { keyframes } from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import { useToastStore } from '@stores/toastStore';

const ToastMessage = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <MessageContainer>
      {toasts.map((toast) => (
        <Message key={toast.id} $show={toast.isVisible}>
          {toast.message}
        </Message>
      ))}
    </MessageContainer>
  );
};

export default ToastMessage;

const fadeInUp = keyframes`
  from {
    transform:translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const MessageContainer = styled.div`
  ${flexColumnCenter}
  position: absolute;
  width: 100%;
  bottom: 30px;
  gap: 10px;

  z-index: 10000; // 다른 요소들 위에 나타나도록 z-index 추가 (모달창 z-index가 9999)
`;

const Message = styled.div<{ $show: boolean }>`
  ${flexCenter}
  min-width: 230px;
  height: 52px;
  padding: 0 10px;
  background: ${(props) => props.theme.colors.jade};
  border-radius: 40px;
  color: ${(props) => props.theme.colors.darkGray};

  animation: ${(props) => (props.$show ? fadeInUp : fadeOut)} 0.5s linear;
  transition: opacity 0.5s linear;
  opacity: ${(props) => (props.$show ? 1 : 0)};
`;
