import type { ExpenseFilterType } from '@models/expense';
import { EmotionKeys, Registers } from '@models/index';
import { formatYMD } from '@utils/dateUtils';

import axiosInstance from '../axios';
import type { ExpenseAICommentType, ExpenseDetailDataType, ExpenseListDataType } from './types';

/* 소비 내역 저장 (입력 페이지) */
export const saveExpenseData = async (expenseData: ExpenseDetailDataType) => {
  try {
    // data 가공 필요 시 여기서 처리
    const { data } = await axiosInstance.post('/articles', {
      content: expenseData.content,
      amount: expenseData.amount,
      spendDate: expenseData.spendDate,
      event: expenseData.event,
      thought: expenseData.thought,
      emotion: expenseData.emotion,
      satisfaction: expenseData.satisfaction,
      reason: expenseData.reason,
      improvements: expenseData.improvements,
      registerType: expenseData.registerType,
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] saveExpenseData : ' + error);
  }
};

/* 소비 내역 수정 (디테일 페이지) */
export const updateExpenseData = async (
  articleId: string | undefined,
  expenseData: ExpenseDetailDataType,
) => {
  try {
    // data 가공 필요 시 여기서 처리
    const { data } = await axiosInstance.patch(`/articles/${articleId}`, {
      content: expenseData.content,
      amount: expenseData.amount,
      spendDate: expenseData.spendDate,
      event: expenseData.event,
      thought: expenseData.thought,
      emotion: expenseData.emotion,
      satisfaction: expenseData.satisfaction,
      reason: expenseData.reason,
      improvements: expenseData.improvements,
      registerType: expenseData.registerType,
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] updateExpenseData : ' + error);
  }
};

/* 소비 내역 삭제 (디테일 페이지) */
export const deleteExpenseById = async (articleId: string | undefined) => {
  try {
    const { data } = await axiosInstance.delete(`/articles/${articleId}`);
    return data;
  } catch (error) {
    throw new Error(`[서버 통신 오류] deleteExpenseById : ${articleId}, ${error}`);
  }
};

/* 소비 상세 조회 (디테일 페이지) */
export const fetchExpenseById = async (
  articleId: string | undefined,
): Promise<ExpenseDetailDataType> => {
  try {
    const { data } = await axiosInstance.get(`/articles/${articleId}`);
    const amount: string = data.data.amount?.toString() || ''; // 서버에서는 number 형태로 받는다. (null인 경우가 있어서 `?` 예외처리)
    return { ...data.data, amount };
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchExpenseById : ' + error);
  }
};

/* AI 한마디 받아오기 (디테일 페이지) */
export const fetchAIComment = async (
  articleId: string | undefined,
): Promise<ExpenseAICommentType> => {
  try {
    const { data } = await axiosInstance.post('/articles/ai', {
      articleId: articleId,
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchAIComment : ' + error);
  }
};

/**
 * 소비 리스트 조회 (검색)
 * @param page 페이징 카운트
 * @param params 필터 조건
 * @returns
 */
export const fetchExpensesByCondition = async (
  page: number = 0,
  params: ExpenseFilterType,
): Promise<ExpenseListDataType> => {
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
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchExpensesByCondition : ' + error);
  }
};
