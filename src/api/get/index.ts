import axiosInstance from '@api/axios';
import { ExpenseFilterType } from '@models/expense';
import { EmotionKeys, Registers } from '@models/index';
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
    if (satisfaction === '') satisfaction = Registers.join(',');

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

export const fetchWordFrequencyByMbti = async (registerType: string) => {
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

export const fetchWordFrequencyByGender = async (registerType: string) => {
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
