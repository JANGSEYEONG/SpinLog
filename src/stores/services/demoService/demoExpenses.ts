import type { ExpenseFilterType, ExpenseSummaryType } from '@models/expense';
import type { ExpenseDetailDataType, ExpenseListDataType } from '@service/expense/types';
import { MAX_EXPENSE_SIZE } from '@stores/storeConfig';
import { formatFromServer } from '@utils/dateUtils';

import type { DemoStoreType } from './types';
import { getFilteredExpensesByCondition } from './util';

export const getDemoExpenseById = (get: () => DemoStoreType, articleId: string) => {
  return get().demoExpenses.find((expense) => expense.articleId === parseInt(articleId));
};

export const addDemoExpense = (
  set: (fn: (state: DemoStoreType) => void) => void,
  get: () => DemoStoreType,
  expense: ExpenseDetailDataType,
) => {
  if (get().demoExpenses.length >= MAX_EXPENSE_SIZE) return -1;
  const saveArticleId: number = get().nextArticleId;
  set((state) => {
    state.demoExpenses.push({
      ...expense,
      articleId: state.nextArticleId,
    });
    state.nextArticleId += 1;
  });
  return saveArticleId;
};

export const updateDemoExpense = (
  set: (fn: (state: DemoStoreType) => void) => void,
  articleId: string,
  data: ExpenseDetailDataType,
) => {
  set((state) => {
    const index = state.demoExpenses.findIndex(
      (expense) => expense.articleId === parseInt(articleId),
    );
    if (index !== -1) {
      state.demoExpenses[index] = { ...state.demoExpenses[index], ...data };
    }
  });
};

export const deleteDemoExpense = (
  set: (fn: (state: DemoStoreType) => void) => void,
  articleId: string,
) => {
  set((state) => {
    state.demoExpenses = state.demoExpenses.filter(
      (expense) => expense.articleId !== parseInt(articleId),
    );
  });
};

export const getDemoExpensesByCondition = (
  get: () => DemoStoreType,
  condition: ExpenseFilterType,
): ExpenseListDataType => {
  console.log(condition);

  // 전체 소비 리스트 가져오기
  const demoExpenses = get().demoExpenses;

  // 1. 조건 필터링
  const filteredExpenses = getFilteredExpensesByCondition(condition, demoExpenses);

  // 2. spendDate 기준 최신순 정렬
  const sortedExpenses = filteredExpenses.sort(
    (a, b) => formatFromServer(b.spendDate).getTime() - formatFromServer(a.spendDate).getTime(),
  );

  // 3. Summary 형태로 변환하기
  const demoSummaryExpenses: ExpenseSummaryType[] = sortedExpenses.map((expense) => {
    return {
      articleId: expense.articleId,
      emotion: expense.emotion || 'EVADED', // emotion 빈 경우 default값 설정
      satisfaction: expense.satisfaction,
      content: expense.content,
      amount: expense.amount,
      registerType: expense.registerType,
    };
  });

  // demoData는 최대 10개라 페이징 처리 제외함.
  // 정렬은 최신순 고정
  return {
    nextPage: false,
    spendList: demoSummaryExpenses,
  };
};

export const getDemoExpensesCount = (get: () => DemoStoreType) => {
  return get().demoExpenses.length;
};
