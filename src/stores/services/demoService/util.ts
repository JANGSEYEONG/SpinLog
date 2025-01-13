import type { ExpenseFilterType } from '@models/expense';
import type { EmotionKey } from '@models/index';
import { compareYMDString, compareYMString, formatFromServer } from '@utils/dateUtils';

import type { DemoExpenseDataType } from './types';

type DailyGroupedDataType = {
  [date: string]: {
    date: string;
    daySpend: number;
    daySave: number;
  };
};

type EmotionalGroupedDataType = {
  [emotion: string]: {
    emotion: EmotionKey;
    daySpend: number;
    daySave: number;
  };
};

// 데모 데이터에서 년,월,일 동일한 날짜 찾기
export const getSameYMDSpendList = (
  selectDate: string,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  return demoExpenses.filter((expense) => {
    return compareYMDString(selectDate, formatFromServer(expense.spendDate));
  });
};

// 데모 데이터에서 년,월 동일한 날짜 찾기
export const getSameYMSpendList = (
  selectDate: string,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  return demoExpenses.filter((expense) => {
    return compareYMString(selectDate, formatFromServer(expense.spendDate));
  });
};

// 날짜 별로 지출, 소비 총합 데이터를 그룹화
export const getGroupSumAmountsByDate = (
  demoExpenses: DemoExpenseDataType[],
): DailyGroupedDataType => {
  // 날짜 별로 데이터를 그룹화하고 각 amount를 합산
  const initialGroupedData: DailyGroupedDataType = {};
  const groupedData: DailyGroupedDataType = demoExpenses.reduce((acc, expense) => {
    // `yyyy-MM-ddThh:mm:ss` -> yyyyMMdd 형태로 변환
    const date = expense.spendDate.split('T')[0].replace(/-/g, '');

    // 현재 날짜의 속성이 없다면 새로운 속성과 초기값 추가
    if (!acc[date]) {
      acc[date] = { date, daySpend: 0, daySave: 0 };
    }
    if (expense.registerType === 'SPEND') {
      acc[date].daySpend += parseFloat(expense.amount);
    } else if (expense.registerType === 'SAVE') {
      acc[date].daySave += parseFloat(expense.amount);
    }
    return acc;
  }, initialGroupedData);

  return groupedData;
};

export const getGroupSumAmountsByEmotion = (
  demoExpenses: DemoExpenseDataType[],
): EmotionalGroupedDataType => {
  // 감정 별로 데이터를 그룹화하고 각 amount를 합산
  const initialGroupedData: EmotionalGroupedDataType = {};
  const groupedData: EmotionalGroupedDataType = demoExpenses.reduce((acc, expense) => {
    const emotion = expense.emotion;
    if (emotion === '') return acc;

    // 현재 감정의 속성이 없다면 새로운 속성과 초기값 추가
    if (!acc[emotion]) {
      acc[emotion] = { emotion, daySpend: 0, daySave: 0 };
    }
    if (expense.registerType === 'SPEND') {
      acc[emotion].daySpend += parseFloat(expense.amount);
    } else if (expense.registerType === 'SAVE') {
      acc[emotion].daySave += parseFloat(expense.amount);
    }
    return acc;
  }, initialGroupedData);

  return groupedData;
};

export const getFilteredExpensesByCondition = (
  condition: ExpenseFilterType,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  let filteredExpenses;
  // 1. emotion 필터
  filteredExpenses = demoExpenses.filter((expense) => {
    if (expense.emotion === '') return false;
    if (condition.emotion.length === 0) return true;
    return condition.emotion.includes(expense.emotion);
  });

  // 2. registerType 필터
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (condition.registerType.length === 0) return true;
    return condition.registerType.includes(expense.registerType);
  });

  // 3. satisfaction 필터
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (condition.satisfaction.length === 0) return true;
    return condition.satisfaction.includes(expense.satisfaction);
  });

  // 4. word 필터
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (condition.word === '') return true;
    return (
      expense.content.includes(condition.word) ||
      expense.event.includes(condition.word) ||
      expense.thought.includes(condition.word) ||
      expense.reason.includes(condition.word) ||
      expense.improvements.includes(condition.word)
    );
  });

  // 5. 기간 필터
  filteredExpenses = filteredExpenses.filter((expense) => {
    return (
      formatFromServer(expense.spendDate) >= condition.from &&
      formatFromServer(expense.spendDate) <= condition.to
    );
  });

  return filteredExpenses;
};
