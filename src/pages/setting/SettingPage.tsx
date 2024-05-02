import { useThemeStore } from '@stores/themeStore';
import styled from 'styled-components';

// #20240429.syjang, 환경설정 테스트 페이지입니다. 추후 테마 변경 시 아래와 같이 가져다 쓰면 됩니다.
const SettingPage = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => {
    return { isDarkMode: state.isDarkMode, toggleTheme: state.toggleTheme };
  });

  return (
    <SettingContainer>
      <button
        onClick={() => {
          toggleTheme();
        }}>
        {isDarkMode ? 'Dark' : 'Light'}
      </button>
    </SettingContainer>
  );
};

export default SettingPage;

const SettingContainer = styled.div``;
