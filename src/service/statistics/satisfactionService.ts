import type { Register } from '@models/index';
import axiosInstance from '@service/axios';

/* MBTI별 만족도 */
export const fetchSatisfactionByMbti = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get('/statistics/mbti/satisfactions/average', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchSatisfactionByMbti : ' + error);
  }
};

/* 성별 만족도 */
export const fetchSatisfactionByGender = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get('/statistics/gender/satisfactions/average', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchSatisfactionByGender : ' + error);
  }
};
