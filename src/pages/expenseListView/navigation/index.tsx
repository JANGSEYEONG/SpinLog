import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import Background from '@components/background';
import MetaThemeColor from '@components/background/MetaThemeColor';

import { PagePath } from '@models/navigation';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

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
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                onClick={() => {
                  navigate(PagePath.Setting);
                }}
              />
            }
          />
        }
      />
      {children}
      <BottomNavigation location={PagePath.ExpenseListView} />
      {showBackground && <Background height="60px" />}
    </>
  );
};

export default NavigationLayout;
