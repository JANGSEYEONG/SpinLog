import type { Register } from '@models/common';
import axiosInstance from '@service/axios';

/* MBTI별 일별 소비 */
export const fetchDailyAmountsByMbti = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get('/statistics/mbti/daily/amounts/sum', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchDailyAmountsByMbti : ' + error);
  }
};

/* 성별 일별 소비 */
export const fetchDailyAmountsByGender = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get('/statistics/gender/daily/amounts/sum', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchDailyAmountsByGender : ' + error);
  }
};
