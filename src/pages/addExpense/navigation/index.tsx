import MetaThemeColor from '@components/background/MetaThemeColor';
import TopNavigation from '@layout/TopNavigation';

import { useNavigate } from 'react-router-dom';

type AddNavProps = {
  children: React.ReactNode;
  title: string;
  hasPrev: boolean;
  prevStep: () => void;
};

const NavigationLayout = ({ children, title, hasPrev, prevStep }: AddNavProps) => {
  const navigate = useNavigate();
  return (
    <>
      <MetaThemeColor />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={
              hasPrev && (
                <TopNavigation.TopBar.PrevButton
                  onClick={() => {
                    prevStep();
                  }}
                />
              )
            }
            centerContent={<TopNavigation.TopBar.Title title={title} />}
            rightContent={
              <TopNavigation.TopBar.CloseButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
          />
        }
      />
      {children}
    </>
  );
};

export default NavigationLayout;
