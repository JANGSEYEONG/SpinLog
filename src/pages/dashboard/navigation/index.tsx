import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';
import MetaThemeColor from '@components/background/MetaThemeColor';

import { PagePath } from '@models/navigation';

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
  const navigate = useNavigate();
  const monthNavProps = { currentDate, previousMonth, nextMonth };

  return (
    <>
      <MetaThemeColor />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<TopNavigation.TopBar.Title title="대시보드" />}
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
                onClick={() => {
                  navigate(PagePath.Setting);
                }}
              />
            }
          />
        }
        _Extension={
          <MonthNavWrapper>
            <MonthNavigatorBtn {...monthNavProps} />
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
