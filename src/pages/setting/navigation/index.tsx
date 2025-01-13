import MetaThemeColor from '@components/background/MetaThemeColor';
import TopBar from '@components/layout/TopBar';
import TopNavigation from '@layout/TopNavigation';
import { PagePath } from '@models/navigation';

import { useNavigate, useSearchParams } from 'react-router-dom';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isFirstLogin = searchParams.get('isFirstLogin');
  const handlePrev = () => {
    if (isFirstLogin === 'true') navigate(PagePath.Main);
    else navigate(-1);
  };
  return (
    <>
      <MetaThemeColor />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopBar.PrevButton onClick={handlePrev} />}
            centerContent={<TopNavigation.TopBar.Title title="내 정보" />}
          />
        }
      />
      {children}
    </>
  );
};

export default NavigationLayout;
