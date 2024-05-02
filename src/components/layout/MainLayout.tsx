import styled from 'styled-components';
import MainHeader from '@layout/main/MainHeader';
import MainNavigator from '@layout/main/MainNavigator';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

// MainLayout은 상단 헤더와 하단 네비게이터가 있는 레이아웃 입니다.
const MainLayout: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <>
      <Layout>
        <MainHeader></MainHeader>
        <MainContent>{children}</MainContent>
        <MainNavigator></MainNavigator>
      </Layout>
    </>
  );
};

export default MainLayout;

const Layout = styled.div`
  color: ${(props) => props.theme.colors.font}; // 글자 색
  background-color: ${(props) => props.theme.colors.background}; // 배경 색
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainContent = styled.main`
  background-color: transparent;
  flex: 1;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
