import axiosInstance from '@api/axios';
import { ExpenseFormType } from '@models/expense';
import type { UserFormType } from '@models/user';

/**
 * 입력 페이지 저장 쿼리
 * @param expenseData 게시글 데이터 (ExpenseFormType)
 * @returns
 */
export const saveExpense = async (expenseData: ExpenseFormType) => {
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
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] saveExpense : ' + error);
  }
};

/**
 * ai comment 데이터
 * @param articleId 게시글 Id
 * @returns
 */
export const fetchAIComment = async (articleId: string | undefined) => {
  try {
    const { data } = await axiosInstance.post('/articles/ai', {
      articleId: articleId,
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchAIComment : ' + error);
  }
};

/**
 * 유저 정보 저장 (환경설정)
 *
 * @param articleId 게시글 Id
 * @returns
 */
export const saveUserData = async (userData: UserFormType) => {
  try {
    const { data } = await axiosInstance.post('/users/details', {
      mbti: `${userData.EI}${userData.NS}${userData.TF}${userData.PJ}`,
      gender: userData.gender,
      budget: userData.budget,
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] saveUserData : ' + error);
  }
};
