import { fetchMainData } from '@service/main/mainService';
import type { MainDataType, MainSubDataType } from '@service/main/types';
import { useDemoStore } from '@stores/demoStore';
import { formatYMD } from '@utils/dateUtils';

import { useQuery } from 'react-query';

const useMainData = (currentDate: Date, isDemoMode: boolean) => {
  const selectDate = formatYMD(currentDate, 'none');

  // Main Data : 예산, 월 작성 리스트
  // 메인 데이터는 "월" 이 바뀌면 재로딩
  const {
    data: mainData,
    isLoading: isLoadingMainData,
    error: mainDataError,
  } = useQuery<MainDataType>(
    ['fetchMainDataQueryKey', currentDate.getMonth()],
    () => fetchMainData<MainDataType>(selectDate),
    {
      enabled: !!selectDate && !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // Sub Data : 선택 날짜의 작성 요약 리스트
  const {
    data: subData,
    isLoading: isLoadingSubData,
    error: subDataError,
  } = useQuery<MainSubDataType>(
    ['fetchMainSubDataQueryKey', selectDate],
    () => fetchMainData<MainSubDataType>(selectDate, true),
    {
      enabled: !!selectDate && !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // [체험하기] 메인 데이터
  // Todo: MainData는 월이 바뀌지 않으면 캐싱 처리하기
  const demoMainData = useDemoStore((state) => state.getDemoMainData)(selectDate);
  const demoMainSubData = useDemoStore((state) => state.getDemoMainSubData)(selectDate);

  return {
    mainData: isDemoMode ? demoMainData : mainData,
    isLoadingMainData,
    mainDataError,
    subData: isDemoMode ? demoMainSubData : subData,
    isLoadingSubData,
    subDataError,
  };
};
export default useMainData;
