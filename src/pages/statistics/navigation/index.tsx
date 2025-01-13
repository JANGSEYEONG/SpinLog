import MetaThemeColor from '@components/background/MetaThemeColor';
import BottomNavigation from '@layout/BottomNavigation';
import TopNavigation from '@layout/TopNavigation';
import { PagePath } from '@models/navigation';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  return (
    <>
      <MetaThemeColor />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={<TopNavigation.TopBar.Title title="둘러보기" />}
            rightContent={<TopNavigation.TopBar.Setting />}
          />
        }
      />
      {children}
      <BottomNavigation location={PagePath.Statistics} />
    </>
  );
};

export default NavigationLayout;
