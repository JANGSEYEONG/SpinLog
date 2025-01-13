import AddIcon from '@assets/images/navigation/addExpense.svg?react';
import DashboardIcon from '@assets/images/navigation/dashboard.svg?react';
import MainIcon from '@assets/images/navigation/main.svg?react';
import StatisticsIcon from '@assets/images/navigation/statistics.svg?react';
import ViewIcon from '@assets/images/navigation/view.svg?react';
import { PagePath } from '@models/navigation';
import { flexBetween, flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

type BottomNavigationProps = {
  location: string;
};

const BottomNavigation = ({ location }: BottomNavigationProps) => {
  const navigator = useNavigate();

  return (
    <Wrapper>
      <NavItem
        className={`${location == PagePath.Main ? 'select' : ''}`}
        onClick={() => {
          navigator(PagePath.Main);
        }}>
        <NavIcon>
          <MainIcon />
        </NavIcon>
        <NavTitle>메인</NavTitle>
      </NavItem>
      <NavItem
        className={`${location == PagePath.Dashboard ? 'select' : ''}`}
        onClick={() => {
          navigator(PagePath.Dashboard);
        }}>
        <NavIcon>
          <DashboardIcon />
        </NavIcon>
        <NavTitle>대시보드</NavTitle>
      </NavItem>
      <NavItem
        onClick={() => {
          navigator(PagePath.AddExpense);
        }}>
        <NavIcon>
          <AddIcon />
        </NavIcon>
        <NavTitle>내용입력</NavTitle>
      </NavItem>
      <NavItem
        className={`${location == PagePath.ExpenseListView ? 'select' : ''}`}
        onClick={() => {
          navigator(PagePath.ExpenseListView);
        }}>
        <NavIcon>
          <ViewIcon />
        </NavIcon>
        <NavTitle>조회</NavTitle>
      </NavItem>
      <NavItem
        className={`${location == PagePath.Statistics ? 'select' : ''}`}
        onClick={() => {
          navigator(PagePath.Statistics);
        }}>
        <NavIcon>
          <StatisticsIcon />
        </NavIcon>
        <NavTitle>둘러보기</NavTitle>
      </NavItem>
    </Wrapper>
  );
};

export default BottomNavigation;

const Wrapper = styled.nav`
  ${flexBetween}
  flex-shrink: 0;

  width: 100%;
  height: 95px; // 하단 네비게이션 바 높이

  background-color: ${(props) => props.theme.backgroundColor.navigation};
  box-shadow: ${(props) => props.theme.shadows.on};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
`;

const NavItem = styled.div`
  ${flexColumnCenter}
  width: 50px;
  height: 50px;
  gap: 5px;

  &.select > a,
  &.select > div {
    color: ${(props) => props.theme.colors.lightGreen};
  }

  &.select > div {
    font-weight: 800;
  }
`;

const NavIcon = styled.a`
  width: 24px;
  height: 24px;
  color: ${(props) => props.theme.bottomNavigation.icon};
`;
const NavTitle = styled.div`
  color: ${(props) => props.theme.bottomNavigation.title};
  font-size: 12px;
  font-weight: 500;
`;
