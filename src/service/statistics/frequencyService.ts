import type { Register } from '@models/index';
import axiosInstance from '@service/axios';

/* mbti 단어별 빈도수 (wordcloud용) 데이터 */
export const fetchWordFrequencyByMbti = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get('/statistics/mbti/word/frequencies', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchWordFrequencyByMbti : ' + error);
  }
};

/* 성별 단어별 빈도수 (wordcloud용) 데이터 */
export const fetchWordFrequencyByGender = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get('/statistics/gender/word/frequencies', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchWordFrequencyByGender : ' + error);
  }
};
