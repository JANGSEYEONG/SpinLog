import MetaThemeColor from '@components/background/MetaThemeColor';
import PartialBackground from '@components/background/PartialBackground';
import BottomNavigation from '@layout/BottomNavigation';
import TopNavigation from '@layout/TopNavigation';
import { PagePath } from '@models/navigation';

import { useEffect, useState } from 'react';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
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
            centerContent={<TopNavigation.TopBar.Title title="내역 조회" isBackgroundGreen />}
            rightContent={<TopNavigation.TopBar.Setting isWhite />}
          />
        }
      />
      {children}
      <BottomNavigation location={PagePath.ExpenseListView} />
      {showBackground && <PartialBackground height="60px" />}
    </>
  );
};

export default NavigationLayout;
