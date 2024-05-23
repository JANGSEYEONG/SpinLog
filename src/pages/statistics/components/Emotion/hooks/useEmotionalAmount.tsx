import { Register } from '@models/index';
import { TabOption } from '../../../type';
import { useQuery } from 'react-query';
import { fetchEmotionAmountsByGender, fetchEmotionAmountsByMbti } from '@api/get';

const useEmotionalAmount = (tabOption: TabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchEmotionAmountsByMbti', register],
    () => fetchEmotionAmountsByMbti(register),
    {
      enabled: tabOption === 'TAB_MBTI',
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchEmotionAmountsByGender', register],
    () => fetchEmotionAmountsByGender(register),
    {
      enabled: tabOption === 'TAB_GENDER',
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useEmotionalAmount;
