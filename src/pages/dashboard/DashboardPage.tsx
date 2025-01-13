import Spinner from '@components/information/Spinner';
import TabLayout, { TabProps } from '@components/layout/TabLayout';
import useIsDemoMode from '@hooks/useIsDemo';
import useMonthNavigator from '@hooks/useMonthNavigator';
import { getRegisterTypeText } from '@models/expense';
import styled from 'styled-components';

import { useState } from 'react';

import TabContent from './components/TabContent';
import useDashboardData from './hooks/useDashboardData';
import NavigationLayout from './navigation';
import { DASHBOARD_TAB, type DashboardTabOption } from './type';

const DashboardPage = () => {
  const isDemoMode = useIsDemoMode();
  const monthNav = useMonthNavigator(); // monthNav.currentDate = 현재 선택된 월
  const navigationProps = { ...monthNav, isDemoMode };

  const [selectedTab, setSelectedTab] = useState<DashboardTabOption>(DASHBOARD_TAB.SPEND); // 지출 탭 기본 선택
  const registerType = selectedTab === DASHBOARD_TAB.SPEND ? 'SPEND' : 'SAVE';

  // react-query가 반응해야 하는 것 : slelectedTab 변경, monthNav.currentDate.getMonth()
  const { data, isLoading, error } = useDashboardData(
    monthNav.currentDate,
    selectedTab,
    registerType,
    isDemoMode,
  );

  const handleTabSelect = (tabId: DashboardTabOption) => {
    setSelectedTab(tabId as DashboardTabOption);
  };

  const tabData: TabProps<DashboardTabOption>[] = [
    {
      id: DASHBOARD_TAB.SPEND,
      label: getRegisterTypeText('SPEND'),
      content:
        !data || isLoading || error ? (
          <InfoWrapper>{error ? <div>An error occurred</div> : <Spinner />}</InfoWrapper>
        ) : (
          <TabContent currentDate={monthNav.currentDate} registerType={'SPEND'} data={data} />
        ),
    },
    {
      id: DASHBOARD_TAB.SAVE,
      label: getRegisterTypeText('SAVE'),
      content:
        !data || isLoading || error ? (
          <InfoWrapper>{error ? <div>An error occurred</div> : <Spinner />}</InfoWrapper>
        ) : (
          <TabContent currentDate={monthNav.currentDate} registerType={'SAVE'} data={data} />
        ),
    },
  ];

  return (
    <NavigationLayout {...navigationProps}>
      <DashboardContainer>
        <TabWrapper>
          <TabLayout tabs={tabData} selectedTab={selectedTab} onTabSelect={handleTabSelect} />
        </TabWrapper>
      </DashboardContainer>
    </NavigationLayout>
  );
};

export default DashboardPage;

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 10px;

  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
`;
