import useOutSideClick from '@hooks/useOutsideClick';
import { flexCenter } from '@styles/CommonStyles';
import ModalPortal from '@utils/ui/ModalPortal';
import styled from 'styled-components';

import { useRef } from 'react';

type ModalProps = {
  onClose: () => void; // 모달창 닫기 함수를 넘겨받는다.
  children: React.ReactNode;
  isFullScreen?: boolean; // 모달창이 화면 전체를 덮는지 여부
};

const Modal = ({ onClose, isFullScreen = false, children }: ModalProps) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  // 모달 이외의 영역 클릭 시 닫히게 한다.
  useOutSideClick(modalRef, handleClose);

  return (
    <ModalPortal>
      <Overlay>
        <ModalWrap ref={modalRef} $full={isFullScreen}>
          {children}
        </ModalWrap>
      </Overlay>
    </ModalPortal>
  );
};

export default Modal;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.backgroundColor.overlay};
  z-index: 9999;
`;

const ModalWrap = styled.div<{ $full: boolean }>`
  ${flexCenter}

  height: ${(props) => (props.$full ? '100%' : 'fit-content')};
  width: ${(props) => (props.$full ? '100%' : 'fit-content')};

  position: absolute; // fixed 인 부모 요소 기준으로 위치
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
