import type { Register } from '@models/index';
import type {
  DailyAmountType,
  DashboardDataType,
  EmotionAmountTotalType,
} from '@service/dashboard/types';

import type { DemoExpenseDataType, DemoStoreType } from './types';
import { getGroupSumAmountsByDate, getGroupSumAmountsByEmotion, getSameYMSpendList } from './util';

export const getDemoDashboardData = (
  get: () => DemoStoreType,
  selectDate: string,
  registerType: Register,
): DashboardDataType => {
  // selectDate의 월에 해당하는 날짜 뽑아내기
  const selectSameMonthAndRegistserExpenses = getSameYMSpendList(
    selectDate,
    get().demoExpenses,
  ).filter((expense) => expense.registerType === registerType);

  const demoDailyAmount = getDemoDailyAmount(selectSameMonthAndRegistserExpenses, registerType);
  const demoEmotionAmountTotal = getDemoEmotionAmountTotal(
    selectSameMonthAndRegistserExpenses,
    registerType,
  );

  return {
    dailyAmount: demoDailyAmount,
    emotionAmountTotal: demoEmotionAmountTotal,
    satisfactionAverage: calculateAverageSatisfaction(selectSameMonthAndRegistserExpenses),
  };
};

const getDemoDailyAmount = (
  demoExpenses: DemoExpenseDataType[],
  registerType: Register,
): DailyAmountType[] => {
  const groupedData = getGroupSumAmountsByDate(demoExpenses);

  // 날짜별 그룹화된 데이터에서 소비, 지출 합이 둘 다 0이 아닌 데이터를 배열로 만든다.
  return Object.values(groupedData).map((expense) => {
    return {
      date: expense.date,
      amount: registerType === 'SPEND' ? expense.daySpend : expense.daySave,
    };
  });
};

const getDemoEmotionAmountTotal = (
  demoExpenses: DemoExpenseDataType[],
  registerType: Register,
): EmotionAmountTotalType[] => {
  const groupedData = getGroupSumAmountsByEmotion(demoExpenses);

  // 감정별로 그룹화된 데이터에서 소비, 지출 합이 둘 다 0이 아닌 데이터를 배열로 만든다.
  return Object.values(groupedData).map((expense) => {
    return {
      emotion: expense.emotion,
      amount: registerType === 'SPEND' ? expense.daySpend : expense.daySave,
    };
  });
};

const calculateAverageSatisfaction = (demoExpenses: DemoExpenseDataType[]): number => {
  const totalSatisfaction = demoExpenses.reduce((sum, expense) => sum + expense.satisfaction, 0);
  return totalSatisfaction / demoExpenses.length;
};
