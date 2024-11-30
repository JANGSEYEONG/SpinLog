import { Suspense } from 'react';
import { lazyWithRetries } from 'src/routes/lazyWithRetries';

import styled from 'styled-components';
import Spinner from '@components/information/Spinner';
import { flexColumnBetween, mainSection, overflowWithoutScroll } from '@styles/CommonStyles';

import NavigationLayout from './navigation';

import useMainData from './hooks/useMainData';
import useMonthNavigator from '@hooks/useMonthNavigator';
import useIsDemoMode from '@hooks/useIsDemo';

const Budget = lazyWithRetries(() => import('./components/Budget'));
const Calendar = lazyWithRetries(() => import('./components/Calendar'));
const DayExpenseListTop2 = lazyWithRetries(() => import('./components/DayExpenseTop2'));

const MainPage = () => {
  const isDemoMode = useIsDemoMode();
  // monthNav.currentDate : 현재 선택된 월
  const monthNav = useMonthNavigator(); // 헤더의 월 네비게이션
  const navigationProps = { ...monthNav, isDemoMode };
  const { mainData, isLoadingMainData, mainDataError, subData, isLoadingSubData, subDataError } =
    useMainData(monthNav.currentDate, isDemoMode);

  return (
    <NavigationLayout {...navigationProps}>
      <MainContainer>
        <BudgetContainer $isLoading={isLoadingMainData}>
          {!mainData || isLoadingMainData ? (
            <Spinner />
          ) : mainDataError ? (
            <div>An error occurred</div>
          ) : !mainData.budget ? (
            <div>예산 데이터 없음</div>
          ) : (
            <Suspense fallback={<Spinner />}>
              <Budget {...mainData.budget} />
            </Suspense>
          )}
        </BudgetContainer>
        <CalendarWrapper>
          {!mainData || isLoadingMainData ? (
            <Spinner />
          ) : mainDataError ? (
            <div>An error occurred</div>
          ) : !mainData.monthSpendList ? (
            <div>소비 데이터 없음</div>
          ) : (
            <Suspense fallback={<Spinner />}>
              <Calendar {...monthNav} data={mainData.monthSpendList} />
            </Suspense>
          )}
        </CalendarWrapper>
        <DayListContainer>
          {!subData || isLoadingSubData ? (
            <Spinner />
          ) : subDataError ? (
            <div>An error occurred</div>
          ) : !subData.daySpendList ? (
            <div>리스트 데이터 없음</div>
          ) : (
            <Suspense fallback={<Spinner />}>
              <DayExpenseListTop2 data={subData.daySpendList} currentDate={monthNav.currentDate} />
            </Suspense>
          )}
        </DayListContainer>
      </MainContainer>
    </NavigationLayout>
  );
};

export default MainPage;

const MainContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0 15px 15px 15px;

  ${overflowWithoutScroll}
`;

const BudgetContainer = styled.section<{ $isLoading: boolean }>`
  ${mainSection}
  ${flexColumnBetween}
  flex-direction:  ${(props) => (props.$isLoading ? 'row' : 'column')};
  min-height: 250px;
  width: 100%;
  margin-bottom: 16px;
`;
const CalendarWrapper = styled.section`
  ${mainSection}
  min-height: 150px;
  width: 100%;
  padding: 5px;
  margin-bottom: 16px;
`;
const DayListContainer = styled.section`
  ${mainSection}
  min-height: 170px;
  width: 100%;
`;
