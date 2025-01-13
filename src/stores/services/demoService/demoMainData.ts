import type { ExpenseSummaryType } from '@models/expense';
import type { EmotionKey, Register } from '@models/index';
import type { MainDataType, MainSubDataType } from '@service/main/types';
import type { MainMonthSpendType } from '@service/main/types';

import type { DemoExpenseDataType, DemoStoreType } from './types';
import { getGroupSumAmountsByDate, getSameYMDSpendList, getSameYMSpendList } from './util';

export const getDemoMainData = (get: () => DemoStoreType, selectDate: string): MainDataType => {
  console.log(`demo main date : ${selectDate}`);

  // 현재 전달받은 yyyyMMdd 형태의 날짜와 같은 년,월인 날짜만을 뽑아낸다.
  const selectSameMonthExpenses = getSameYMSpendList(selectDate, get().demoExpenses);
  const selectSameDayExpenses = getSameYMDSpendList(selectDate, get().demoExpenses);

  const totalSpendAmount = calculateTotalAmountByRegisterType('SPEND', selectSameMonthExpenses);
  const totalSaveAmount = calculateTotalAmountByRegisterType('SAVE', selectSameMonthExpenses);

  const demoMonthSpendList = getDemoMonthSpendList(selectSameMonthExpenses);
  const demoDaySpendList: ExpenseSummaryType[] = getDemoDaySpendList(selectSameDayExpenses);

  const rtnData = {
    budget: {
      monthBudget: get().userSettings.budget,
      monthSpend: totalSpendAmount,
      monthSave: totalSaveAmount,
    },
    monthSpendList: demoMonthSpendList,
    // default로 selectDate의 소비 기록을 보내준다.
    daySpendList: demoDaySpendList,
  };
  return rtnData;
};

export const getDemoMainSubData = (
  get: () => DemoStoreType,
  selectDate: string,
): MainSubDataType => {
  console.log(`demo main sub date : ${selectDate}`);
  const selectSameDayExpenses = getSameYMDSpendList(selectDate, get().demoExpenses);
  const demoDaySpendList: ExpenseSummaryType[] = getDemoDaySpendList(selectSameDayExpenses);

  const rtnData = {
    daySpendList: demoDaySpendList,
  };
  return rtnData;
};

// 전달받은 DemoExpenseDataType 리스트에서 특정 regiesterType의 amount 합 구하기
const calculateTotalAmountByRegisterType = (
  registerType: Register,
  demoExpenses: DemoExpenseDataType[],
): number => {
  return demoExpenses.reduce((sum, expense) => {
    return expense.registerType === registerType ? sum + parseFloat(expense.amount) : sum;
  }, 0);
};

const getDemoMonthSpendList = (demoExpenses: DemoExpenseDataType[]): MainMonthSpendType[] => {
  const groupedData = getGroupSumAmountsByDate(demoExpenses);
  // 날짜별 그룹화된 데이터에서 소비, 지출 합이 둘 다 0이 아닌 데이터를 배얼로 만든다.
  return Object.values(groupedData).filter(
    (expense) => expense.daySpend !== 0 || expense.daySave !== 0,
  );
};

const getDemoDaySpendList = (demoExpenses: DemoExpenseDataType[]): ExpenseSummaryType[] => {
  return demoExpenses.map((expense) => {
    const emotion: EmotionKey = expense.emotion || 'EVADED';
    return {
      articleId: expense.articleId,
      emotion,
      satisfaction: expense.satisfaction,
      content: expense.content,
      amount: expense.amount,
      registerType: expense.registerType,
    };
  });
};
