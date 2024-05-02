import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// 모바일 크기의 화면을 정중앙에 배치시키는 최상단 레이아웃
const RootLayout = () => {
  return (
    <RootLayoutWrapper>
      <Outlet />
    </RootLayoutWrapper>
  );
};

export default RootLayout;

// 메인 프레임 크기 지정
const RootLayoutWrapper = styled.div`
  width: 390px;
  height: 844px;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  // 700px 까지는 가득 차도 될 것 같음.
  @media (max-width: 700px) {
    width: 100vw;
    height: 100vh;
  }
`;
