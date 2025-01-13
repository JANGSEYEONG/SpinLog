import type { Register } from '@models/index';
import {
  fetchEmotionAmountsByGender,
  fetchEmotionAmountsByMbti,
} from '@service/statistics/emotionAmountService';

import { useQuery } from 'react-query';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../../type';

const useEmotionalAmount = (tabOption: StatisticsTabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchEmotionAmountsByMbti', register],
    () => fetchEmotionAmountsByMbti(register),
    {
      enabled: tabOption === STATISTICS_TAB.MBTI,
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchEmotionAmountsByGender', register],
    () => fetchEmotionAmountsByGender(register),
    {
      enabled: tabOption === STATISTICS_TAB.GENDER,
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useEmotionalAmount;
