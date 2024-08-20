import styled from 'styled-components';

import TabLayout, { TabProps } from '@components/layout/TabLayout';

import { useState } from 'react';

import type { TabOption } from './type';
import type { Register } from '@models/index';

import NavigationLayout from './navigation';
import SlideButton from './components/SlideButton';
import CategoriesView from './components/CategoriesView';
import MemoContainer from './components/Memo/MemoContainer';
import SatisfactionContainer from './components/Satisfaction/SatisfactionContainer';
import DailyAmountsContainer from './components/DailyAmount/DailyAmountsContainer';

import { format, subDays } from 'date-fns';
import EmotionalAmountChartContainer from './components/Emotion/EmotionalAmountChartContainer';

const StatisticsPage = () => {
  const [registerType, setRegisterType] = useState<Register>('SPEND');
  const [selectedTab, setSelectedTab] = useState<TabOption>('TAB_MBTI');

  const yesterday = subDays(new Date(), 1);
  const nintyDaysBefore = subDays(yesterday, 29);

  const handleRegisterTypeClick = () => {
    setRegisterType(registerType === 'SPEND' ? 'SAVE' : 'SPEND');
  };
  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId as TabOption);
  };

  const categories: { id: string; name: string; component: JSX.Element }[] = [
    {
      id: 'categoryEmotion',
      name: '감정',
      component: <EmotionalAmountChartContainer tabOption={selectedTab} register={registerType} />,
    },
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
        <SlideButton isChecked={registerType === 'SAVE'} onChange={handleRegisterTypeClick} />
        <Period>{`${format(nintyDaysBefore, 'yy.MM.dd')}~${format(yesterday, 'yy.MM.dd')} 기준`}</Period>
      </OptionContainer>
      <StatisticsContainer>
        <TabLayout tabs={tabData} selectedTab={selectedTab} onTabSelect={handleTabSelect} />
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
  color: ${(props) => props.theme.colors.gray2};
  font-size: 12px;
`;
const StatisticsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;
