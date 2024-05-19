import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';

import TabLayout, { TabProps } from '@components/layout/TabLayout';
import { useState } from 'react';
import SlideButton from './components/SlideButton';
import { format, subDays } from 'date-fns';
import CategoriesView from './components/CategoriesView';
import { Register } from '@models/index';
import { TabOption } from './type';
import MemoContainer from './components/Memo/MemoContainer';

const EmotionComponent = () => <div>감정 컴포넌트</div>;
const DailyComponent = () => <div>일별 컴포넌트</div>;
const SatisfactionComponent = () => <div>만족모 컴포넌트</div>;

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
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
        }></TopNavigation>
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
  const handleTabSelect = (tabId: TabOption) => {
    setSelectedTab(tabId);
  };

  const categories: { id: string; name: string; component: JSX.Element }[] = [
    { id: 'categoryEmotion', name: '감정', component: <EmotionComponent /> },
    { id: 'categoryDaily', name: '일별', component: <DailyComponent /> },
    {
      id: 'categoryMemo',
      name: '메모',
      component: <MemoContainer tabOption={selectedTab} register={registerType} />,
    },
    { id: 'categorySatisfaction', name: '만족도', component: <SatisfactionComponent /> },
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
  background-color: transparent;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;
