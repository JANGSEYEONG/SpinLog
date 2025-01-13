import type { EmotionKey, Gender, MBTI, MbitFactor, Register } from '@models/index';
import axiosInstance from '@service/axios';

/* MBTI별 감정별 금액 평균 */
export type EmotionAmountsByMbtiDto = {
  mbti: MBTI;
  mbtiEmotionAmountAverages: {
    mbtiFactor: MbitFactor;
    emotionAmountAverages: { emotion: EmotionKey; amountAverage: number }[];
  }[];
};

export const fetchEmotionAmountsByMbti = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get<{
      data: EmotionAmountsByMbtiDto;
    }>('/statistics/mbti/emotion/amounts/average', {
      params: {
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchEmotionAmountsByMbti : ' + error);
  }
};

/* 성별 감정별 금액 평균 */
export type EmotionAmountsByGenderDto = {
  gender: Gender;
  emotionAmountAverages: { emotion: EmotionKey; amountAverage: number }[];
}[];

export const fetchEmotionAmountsByGender = async (registerType: Register) => {
  try {
    const { data } = await axiosInstance.get<{ data: EmotionAmountsByGenderDto }>(
      '/statistics/gender/emotion/amounts/average',
      {
        params: {
          registerType,
        },
      },
    );
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchEmotionAmountsByGender : ' + error);
  }
};
