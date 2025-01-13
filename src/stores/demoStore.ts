import type { Register } from '@models/common';
import type { ExpenseFilterType } from '@models/expense';
import type { ExpenseDetailDataType } from '@service/expense/types';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import * as Service from './services/demoService';
import type { DemoStoreType } from './services/demoService/types';
import { CURRENT_VERSION, DEMO_STORE_NAME } from './storeConfig';

export const useDemoStore = create<DemoStoreType>()(
  immer(
    devtools(
      persist(
        (set, get) => ({
          // initial
          ...Service.initDemoState(), // 상태 초기값 지정
          initDemoExpenses: () => Service.initDemoExpenses(set),

          // setter
          setDemoUserSetting: (budget: number) => Service.setDemoUserSetting(set, budget),
          addDemoExpense: (expense) => Service.addDemoExpense(set, get, expense),
          updateDemoExpense: (articleId: string, data: ExpenseDetailDataType) =>
            Service.updateDemoExpense(set, articleId, data),
          deleteDemoExpense: (articleId: string) => Service.deleteDemoExpense(set, articleId),

          // getter
          getDemoExpensesCount: () => Service.getDemoExpensesCount(get),
          getDemoExpenseById: (articleId: string) => Service.getDemoExpenseById(get, articleId),
          getDemoExpensesByCondition: (condition: ExpenseFilterType) =>
            Service.getDemoExpensesByCondition(get, condition),

          getDemoMainData: (selectDate: string) => Service.getDemoMainData(get, selectDate),
          getDemoMainSubData: (selectDate: string) => Service.getDemoMainSubData(get, selectDate),

          getDemoDashboardData: (selectDate: string, registerType: Register) =>
            Service.getDemoDashboardData(get, selectDate, registerType),
        }),
        {
          name: DEMO_STORE_NAME,
          storage: createJSONStorage(() => localStorage),
          version: CURRENT_VERSION,
          migrate: Service.migrateDemoStore,
        },
      ),
    ),
  ),
);
