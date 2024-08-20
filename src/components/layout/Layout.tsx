import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';
import ToastMessage from '@components/information/ToastMessage';

import { Outlet } from 'react-router-dom';

// 모바일 크기의 화면을 정중앙에 배치시키는 최상단 레이아웃
const Layout = () => {
  return (
    <LayoutContainer>
      <Outlet />
      {/* 포탈을 사용해 모달을 붙일 id 생성 */}
      <div id="background-root"></div>
      <div id="modal-root"></div>
      <div id="loading-root"></div>
      <ToastMessage />
    </LayoutContainer>
  );
};

export default Layout;

// 메인 프레임 크기 지정
const LayoutContainer = styled.div`
  ${flexColumnCenter}

  width: 390px;
  height: 844px;
  background-color: ${(props) => props.theme.backgroundColor.layout};

  overflow: hidden;

  position: relative; // 모달의 부모 기준이 되기 위함.

  z-index: 0;
  @media (max-width: 700px) {
    width: 100vw;
    height: 100vh;
  }

  @media (max-height: 850px) {
    //width: 100vw;
    height: 100vh;
  }
`;
