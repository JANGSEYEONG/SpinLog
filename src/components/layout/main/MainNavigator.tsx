import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainNavigator = () => {
  const navigator = useNavigate();
  return (
    <NavContainer>
      <NavItem
        onClick={() => {
          navigator('/');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>메인</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/dashboard');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>대시보드</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/list');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>조회</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/write');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>입력</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator('/setting');
        }}>
        <NavIcon></NavIcon>
        <NavTitle>환경설정</NavTitle>
      </NavItem>
    </NavContainer>
  );
};

export default MainNavigator;

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.navBackground};
  box-shadow: ${(props) => props.theme.shadows.on};
  padding-left: 20px;
  padding-right: 20px;
`;

const NavItem = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NavIcon = styled.a`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  background-image: linear-gradient(135deg, beige 1%, ${(props) => props.theme.colors.navFont});
  margin-bottom: 15px;
  //background-color: ${(props) => props.theme.colors.navFont};
`;
const NavTitle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(props) => props.theme.colors.navFont};
`;
