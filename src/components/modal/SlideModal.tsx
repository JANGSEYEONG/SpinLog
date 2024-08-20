import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import ModalPortal from '@utils/ui/ModalPortal';
import useOutsideClick from '@hooks/useOutsideClick';
import { flexCenter } from '@styles/CommonStyles';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const SlideModal = ({ onClose, children }: ModalProps) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  // 모달 이외의 영역 클릭 시 닫히게 한다.
  useOutsideClick(modalRef, handleClose);

  return (
    <ModalPortal>
      <Overlay>
        <ModalWrap ref={modalRef}>{children}</ModalWrap>
      </Overlay>
    </ModalPortal>
  );
};

export default SlideModal;

// 슬라이드 업 애니메이션 정의
const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%); // 시작 위치는 화면 하단
  }
  to {
    transform: translateY(0); // 종료 위치는 원래 위치
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.backGroundColor.overlay};
  z-index: 9999;
`;

const ModalWrap = styled.div`
  ${flexCenter}
  width: 100%;
  height: fit-content;

  position: absolute; // fixed 인 부모 요소 기준으로 위치
  bottom: 0;
  left: 0;

  animation: ${slideUpAnimation} 0.2s ease-out forwards; // 애니메이션 적용
`;
