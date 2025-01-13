import type { Register } from '@models/index';
import {
  fetchSatisfactionByGender,
  fetchSatisfactionByMbti,
} from '@service/statistics/satisfactionService';

import { useQuery } from 'react-query';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../../type';

const useSatisfactionData = (tabOption: StatisticsTabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchSatisfactionByMbti', register],
    () => fetchSatisfactionByMbti(register),
    {
      enabled: tabOption === STATISTICS_TAB.MBTI,
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchSatisfactionByGender', register],
    () => fetchSatisfactionByGender(register),
    {
      enabled: tabOption === STATISTICS_TAB.GENDER,
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useSatisfactionData;
