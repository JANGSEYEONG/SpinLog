import styled from 'styled-components';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import TabLayout, { TabProps } from '@components/layout/TabLayout';
import MetaThemeColor from '@components/background/MetaThemeColor';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TabOption } from './type';
import type { Register } from '@models/index';

import SlideButton from './components/SlideButton';
import CategoriesView from './components/CategoriesView';
import MemoContainer from './components/Memo/MemoContainer';
import SatisfactionContainer from './components/Satisfaction/SatisfactionContainer';
import DailyAmountsContainer from './components/DailyAmount/DailyAmountsContainer';

import { format, subDays } from 'date-fns';

const EmotionComponent = () => <div>감정 컴포넌트</div>;

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
      <MetaThemeColor color="#F4F4F4" />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle>둘러보기</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }
      />
      {children}
      <BottomNavigation location="statistics" />
    </>
  );
};

const StatisticsPage = () => {
  const [registerType, setRegisterType] = useState<Register>('SPEND');
  const [selectedTab, setSelectedTab] = useState<TabOption>('TAB_MBTI');

  const today = format(new Date(), 'yyyy.MM.dd');
  const nintyDaysBefore = format(subDays(new Date(), 90), 'yyyy.MM.dd');

  const handleRegisterTypeClick = (isSpend: boolean) => {
    setRegisterType(isSpend ? 'SAVE' : 'SPEND');
  };
  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId as TabOption);
  };

  const categories: { id: string; name: string; component: JSX.Element }[] = [
    { id: 'categoryEmotion', name: '감정', component: <EmotionComponent /> },
    {
      id: 'categoryDaily',
      name: '일별',
      component: <DailyAmountsContainer tabOption={selectedTab} register={registerType} />,
    },
    {
      id: 'categoryMemo',
      name: '메모',
      component: <MemoContainer tabOption={selectedTab} register={registerType} />,
    },
    {
      id: 'categorySatisfaction',
      name: '만족도',
      component: <SatisfactionContainer tabOption={selectedTab} register={registerType} />,
    },
  ];

  const tabData: TabProps<TabOption>[] = [
    {
      id: 'TAB_MBTI',
      label: 'MBTI별',
      content: <CategoriesView categories={categories} />,
    },
    {
      id: 'TAB_GENDER',
      label: '성별',
      content: <CategoriesView categories={categories} />,
    },
  ];

  return (
    <NavigationLayout>
      <OptionContainer>
        <SlideButton onClick={handleRegisterTypeClick} />
        <Period>{`${today}~${nintyDaysBefore}기준`}</Period>
      </OptionContainer>
      <StatisticsContainer>
        <TabLayout
          tabs={tabData}
          selectedTab={selectedTab}
          onTabSelect={handleTabSelect}
          tabHeaderColor="#9F9F9F"
          activeTabHeaderColor="#575755"
          indicatorColor="#575755"
        />
      </StatisticsContainer>
    </NavigationLayout>
  );
};

export default StatisticsPage;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
`;

const Period = styled.div`
  color: #bcbcbc;
  font-size: 12px;
`;
const StatisticsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;
