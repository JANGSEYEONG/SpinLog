import MetaThemeColor from '@components/background/MetaThemeColor';
import PartialBackground from '@components/background/PartialBackground';
import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';
import BottomNavigation from '@layout/BottomNavigation';
import TopNavigation from '@layout/TopNavigation';
import { PagePath } from '@models/navigation';
import styled, { useTheme } from 'styled-components';

import { useEffect, useState } from 'react';

// import DarkModeButton from '@components/button/DarkModeButton';

type MainNavProps = {
  currentDate: Date;
  isDemoMode: boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({
  children,
  currentDate,
  isDemoMode,
  previousMonth,
  nextMonth,
}: MainNavProps) => {
  const theme = useTheme();
  const mainColor = { color: theme.colors.white };
  const monthNavProps = { currentDate, previousMonth, nextMonth, ...mainColor };

  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    setShowBackground(true);
    return () => {
      setShowBackground(false);
    };
  }, []);
  return (
    <>
      <MetaThemeColor isBackgroundGreen />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopNavigation.TopBar.LogoWhiteButton />}
            centerContent={isDemoMode && <TopNavigation.TopBar.Title title="" isBackgroundGreen />}
            rightContent={
              <>
                {/* <DarkModeButton/> */}
                <TopNavigation.TopBar.Setting isWhite />
              </>
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
      <BottomNavigation location={PagePath.Main} />
      {showBackground && <PartialBackground height="36%" />}
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
