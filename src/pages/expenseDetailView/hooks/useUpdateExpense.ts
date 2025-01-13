import useToast from '@hooks/useToast';
import { updateExpenseData } from '@service/expense/expenseService';
import type { ExpenseDetailDataType } from '@service/expense/types';
import { useDemoStore } from '@stores/demoStore';

import { useMutation } from 'react-query';

const useUpdateExpense = (id: string | undefined, isDemoMode: boolean) => {
  const { showToast } = useToast();
  const updateDemoExpense = useDemoStore((state) => state.updateDemoExpense); // 체험하기용

  const updateExpenseMutation = useMutation({
    mutationFn: (data: ExpenseDetailDataType) => updateExpenseData(id, data),
    onSuccess: () => {
      showToast('수정했습니다.');
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`저장 실패: ${error}`);
    },
  });

  // [체험하기] 소비 데이터 수정하기 로직
  const updateDemoExpenseMutation = {
    mutate: (data: ExpenseDetailDataType) => {
      if (id == undefined) {
        alert('다시 시도해주세요.');
        return;
      }
      updateDemoExpense(id, data);
      showToast('수정했습니다.');
      console.log(`demo update: ${JSON.stringify(data)}`);
    },
    isLoading: false,
  };

  if (isDemoMode) return updateDemoExpenseMutation;
  return updateExpenseMutation;
};

export default useUpdateExpense;
