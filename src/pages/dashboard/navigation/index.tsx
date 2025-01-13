import MetaThemeColor from '@components/background/MetaThemeColor';
import MonthNavigatorButton from '@components/button/MonthNavigatorButton';
import BottomNavigation from '@layout/BottomNavigation';
import TopNavigation from '@layout/TopNavigation';
import { PagePath } from '@models/navigation';
import styled from 'styled-components';

type DashboardNavProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({
  children,
  currentDate,
  previousMonth,
  nextMonth,
}: DashboardNavProps) => {
  const monthNavProps = { currentDate, previousMonth, nextMonth };

  return (
    <>
      <MetaThemeColor />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<TopNavigation.TopBar.Title title="대시보드" />}
            rightContent={<TopNavigation.TopBar.Setting />}
          />
        }
        _Extension={
          <MonthNavWrapper>
            <MonthNavigatorButton {...monthNavProps} />
          </MonthNavWrapper>
        }
      />
      {children}
      <BottomNavigation location={PagePath.Dashboard} />
    </>
  );
};

export default NavigationLayout;

const MonthNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
`;
