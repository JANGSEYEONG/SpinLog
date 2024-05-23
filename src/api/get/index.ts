import axiosInstance from '@api/axios';
import { ExpenseFilterType } from '@models/expense';
import {
  EmotionKey,
  EmotionKeys,
  Gender,
  MBTI,
  MbitFactor,
  Register,
  Registers,
} from '@models/index';
import { formatYMD } from '@utils/index';

/**
 * 메인 페이지 데이터 (예산, 달력, 요약 정보)
 * @param selectDate 조회하고자 하는 날짜
 * @param isSelectDay 달력에서 날짜를 선택한 것인지 여부
 * @returns
 */
export const fetchMainData = async (selectDate: string, isSelectDay = false) => {
  try {
    const { data } = await axiosInstance.get('/articles/main', {
      params: {
        selectDate,
        isSelectDay: isSelectDay,
      },
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchMainData : ' + error);
  }
};

/**
 * 소비 상세 조회 데이터
 * @param articleId
 * @returns
 */
export const fetchExpenseById = async (articleId: string | undefined) => {
  try {
    const { data } = await axiosInstance.get(`/articles/${articleId}`);
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchExpenseById : ' + error);
  }
};

/**
 * 소비 리스트 조회 (검색)
 * @param page 페이징 카운트
 * @param params 필터 조건
 * @returns
 */
export const fetchExpensesByCondition = async (page: number = 0, params: ExpenseFilterType) => {
  try {
    // 데이터 가공하기
    // 1. 배열이 비어있을 경우, 모두 선택 조건 (`!` 연산자 쓰려다가, 확실하게 빈 문자열인지 체크로 변경)
    // 2. 배열은 "," 를 구분자로 보낸다.

    let registerType = params.registerType.join(',');
    if (registerType === '') registerType = Registers.join(',');

    let satisfaction = params.satisfaction.join(',');
    if (satisfaction === '') satisfaction = [1, 2, 3, 4, 5].join(',');

    let emotion = params.emotion.join(',');
    if (emotion === '') emotion = EmotionKeys.join(',');

    const { data } = await axiosInstance.get('/articles', {
      params: {
        page,
        registerType,
        emotion,
        from: formatYMD(params.from, 'none'),
        to: formatYMD(params.to, 'none'),
        satisfaction,
        word: params.word,
      },
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchExpensesByCondition : ' + error);
  }
};

/**
 * 환경설정(내 정보) 데이터
 * @returns email, mbti, gender, budget
 */
export const fetchUserData = async () => {
  try {
    const { data } = await axiosInstance.get(`/users/details`);
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchUserData : ' + error);
  }
};

/**
 * mbti 단어별 빈도수 (wordcloud용) 데이터
 * */

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

/**
 * 성별 단어별 빈도수 (wordcloud용) 데이터
 */

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

/**
 * 대시보드 데이터
 * @returns satisfactionAverage, emotionAmountTotal, dailyAmount
 */
export const fetchDashboardData = async (selectDate: string, registerType: Register) => {
  try {
    const { data } = await axiosInstance.get(`/articles/dashboard`, {
      params: {
        selectDate,
        registerType,
      },
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchDashboardData : ' + error);
  }
};

/**
 * MBTI별 만족도
 */

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

/**
 * 성별 만족도
 */

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

/**
 * MBTI별 일별 소비
 */

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

/**
 * 성별 일별 소비
 */

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

/**
 * MBTI별 감정별 금액 평균
 */

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

/**
 * 성별 감정별 금액 평균
 */

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
