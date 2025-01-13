import type { Register } from '@models/common';
import {
  fetchDailyAmountsByGender,
  fetchDailyAmountsByMbti,
} from '@service/statistics/dailyAmountService';

import { useQuery } from 'react-query';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../../type';

const useDailyAmountsData = (tabOption: StatisticsTabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchDailyAmountsByMbti', register],
    () => fetchDailyAmountsByMbti(register),
    {
      enabled: tabOption === STATISTICS_TAB.MBTI,
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchDailyAmountsByGender', register],
    () => fetchDailyAmountsByGender(register),
    {
      enabled: tabOption === STATISTICS_TAB.GENDER,
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useDailyAmountsData;
