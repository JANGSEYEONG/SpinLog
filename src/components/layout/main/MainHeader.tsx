import styled from 'styled-components';
import SettingIcon from '@assets/images/icon/settingIcon.svg?react';
import Logo from '@assets/images/icon/logo.svg?react';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigator = useNavigate();

  return (
    <HeaderContainer>
      {/* #20240501.syjang, 로고 대신 날짜 선택 필터가 필요한 경우, props 넘겨받아 판단하고 분기하도록 수정하기
        예상되는 필요 props : 날짜 선택 헤더 여부, 날짜 선택 이벤트 발생 시 실행될 callback 메소드
      */}
      <SvgWithShadow>
        <Logo></Logo>
      </SvgWithShadow>
      <SettingButton
        onClick={() => {
          navigator('/setting');
        }}>
        <SettingIcon></SettingIcon>
      </SettingButton>
    </HeaderContainer>
  );
};

export default MainHeader;

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 15px;
`;
const SvgWithShadow = styled.svg`
  width: 125px;
  height: 26px;
  filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.2));
`;
const SettingButton = styled(SettingIcon)`
  width: 24px;
  height: 24px;
  color: #292d32; // svg 파일에 fill 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  stroke: currentColor; // 현재 컬러를 stroke 색상으로 사용
  stroke-width: 3; // svg 파일에 stroke 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  transition:
    color 0.2s,
    transform 0.2s,
    stroke-width 0.2s; // 트랜지션 추가
  cursor: pointer;
  &:hover {
    color: #555; // 마우스 호버 시 색상 변경
    transform: scale(1.1); // 10% 크기 증가
    stroke-width: 10;
  }
`;
