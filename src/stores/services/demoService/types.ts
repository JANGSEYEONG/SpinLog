import type { ExpenseFilterType } from '@models/expense';
import type { Register } from '@models/index';
import type { DashboardDataType } from '@service/dashboard/types';
import type { ExpenseDetailDataType, ExpenseListDataType } from '@service/expense/types';
import type { MainDataType, MainSubDataType } from '@service/main/types';
import type { UserSettingDataType } from '@service/user/types';

export type DemoExpenseDataType = ExpenseDetailDataType & { articleId: number };

export type DemoStoreStateType = {
  userSettings: UserSettingDataType;
  demoExpenses: DemoExpenseDataType[];
  nextArticleId: number;
};
export type DemoStoreType = DemoStoreStateType & {
  // initial
  initDemoExpenses: () => void;

  // setter
  setDemoUserSetting: (budget: number) => void;
  addDemoExpense: (expense: ExpenseDetailDataType) => number;
  updateDemoExpense: (articleId: string, data: ExpenseDetailDataType) => void;
  deleteDemoExpense: (articleId: string) => void;

  // getter
  getDemoExpensesCount: () => number;
  getDemoExpenseById: (articleId: string) => ExpenseDetailDataType | undefined;
  getDemoExpensesByCondition: (condition: ExpenseFilterType) => ExpenseListDataType;

  getDemoMainData: (selectDate: string) => MainDataType;
  getDemoMainSubData: (selectDate: string) => MainSubDataType;

  getDemoDashboardData: (selectDate: string, registerType: Register) => DashboardDataType;
};

// localStorage의 객체가 DemoStoreState 타입인지 판단하는 타입 가드 선언
const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const hasUserSettings = (state: Record<string, unknown>): boolean => {
  const userSettings = state.userSettings;
  return (
    isObject(userSettings) &&
    'email' in userSettings &&
    'mbti' in userSettings &&
    'gender' in userSettings &&
    'budget' in userSettings
  );
};

export const isValidDemoStore = (state: unknown): state is DemoStoreType => {
  if (!isObject(state)) {
    return false;
  }

  return (
    hasUserSettings(state) &&
    'demoExpenses' in state &&
    Array.isArray(state.demoExpenses) &&
    'nextArticleId' in state &&
    typeof state.nextArticleId === 'number'
  );
};
