import { useNavigate } from 'react-router-dom';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import MetaThemeColor from '@components/background/MetaThemeColor';
import { PagePath } from '@models/navigation';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
      <MetaThemeColor />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<TopNavigation.TopBar.Title title="둘러보기" />}
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
                onClick={() => {
                  navigate(PagePath.Setting);
                }}
              />
            }
          />
        }
      />
      {children}
      <BottomNavigation location={PagePath.Statistics} />
    </>
  );
};

export default NavigationLayout;
