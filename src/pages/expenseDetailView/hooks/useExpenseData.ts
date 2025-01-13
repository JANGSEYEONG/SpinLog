import { fetchExpenseById } from '@service/expense/expenseService';
import type { ExpenseDetailDataType } from '@service/expense/types';
import { useDemoStore } from '@stores/demoStore';

import { useMemo } from 'react';
import { useQuery } from 'react-query';

const useExpenseData = (id: string | undefined, isDemoMode: boolean) => {
  const {
    data: expenseData,
    isLoading,
    error,
  } = useQuery<ExpenseDetailDataType>(['fetchExpenseByIdQueryKey'], () => fetchExpenseById(id), {
    enabled: !!id && !isDemoMode, // id가 있을 때만 쿼리 실행
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // [체험하기] 소비 데이터 가져오기 로직
  const getDemoExpenseById = useDemoStore((state) => state.getDemoExpenseById);
  let demoExpenseData: ExpenseDetailDataType | undefined;
  const tempExpenseData: ExpenseDetailDataType = useMemo(
    () => ({
      content: 'temp',
      emotion: 'EVADED',
      amount: '',
      satisfaction: 3,
      registerType: 'SPEND',
      spendDate: '',
      event: '',
      thought: '',
      reason: '',
      improvements: '',
    }),
    [],
  );

  // id가 없거나 저장된 id에 해당하는 데이터가 없다면 임시 데이터를 보여준다.
  demoExpenseData = tempExpenseData;
  if (id !== undefined && getDemoExpenseById(id) != undefined)
    demoExpenseData = getDemoExpenseById(id);

  return {
    data: isDemoMode ? demoExpenseData : expenseData,
    isLoading,
    error,
  };
};

export default useExpenseData;
