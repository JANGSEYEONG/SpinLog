import TopNavigation from '@layout/TopNavigation';
import { useThemeStore } from '@stores/themeStore';
import styled from 'styled-components';
import type { NavLayoutProps } from '../../types/navigationTypes';

const NavigationLayout = ({ children }: NavLayoutProps) => {
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<div>환경설정</div>}
            rightContent={TopNavigation.TopBar.CloseButton}
          />
        }></TopNavigation>
      {children}
    </>
  );
};

// #20240429.syjang, 환경설정 테스트 페이지입니다. 추후 테마 변경 시 아래와 같이 가져다 쓰면 됩니다.
const SettingPage = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => {
    return { isDarkMode: state.isDarkMode, toggleTheme: state.toggleTheme };
  });

  return (
    <NavigationLayout>
      <SettingContainer>
        <button
          onClick={() => {
            toggleTheme();
          }}>
          {isDarkMode ? 'Dark' : 'Light'}
        </button>
      </SettingContainer>
    </NavigationLayout>
  );
};

export default SettingPage;

const SettingContainer = styled.div`
  width: 100%;
  height: 100%;
`;
