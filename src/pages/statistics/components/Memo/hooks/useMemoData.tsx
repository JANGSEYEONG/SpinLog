import type { Register } from '@models/common';
import {
  fetchWordFrequencyByGender,
  fetchWordFrequencyByMbti,
} from '@service/statistics/frequencyService';

import { useQuery } from 'react-query';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../../type';

const useMemoData = (tabOption: StatisticsTabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchWordFrequencyByMbti', register],
    () => fetchWordFrequencyByMbti(register),
    {
      enabled: tabOption === STATISTICS_TAB.MBTI,
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchWordFrequencyByGender', register],
    () => fetchWordFrequencyByGender(register),
    {
      enabled: tabOption === STATISTICS_TAB.GENDER,
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useMemoData;
