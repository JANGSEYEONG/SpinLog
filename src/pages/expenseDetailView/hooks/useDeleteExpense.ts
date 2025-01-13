import useToast from '@hooks/useToast';
import { deleteExpenseById } from '@service/expense/expenseService';
import { useDemoStore } from '@stores/demoStore';

import { useMutation } from 'react-query';

const useDeleteExpense = (
  id: string | undefined,
  isDemoMode: boolean,
  handleMovePrevPage: () => void,
) => {
  const { showToast } = useToast();
  const deleteDemoExpense = useDemoStore((state) => state.deleteDemoExpense); // 체험하기용

  const deleteExpenseMutation = useMutation(deleteExpenseById, {
    onSuccess: () => {
      handleMovePrevPage();
      showToast('삭제했습니다.');
      console.log(`삭제 성공 : ${id}`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`삭제 실패: ${error}`);
    },
  });

  // [체험하기] 소비 데이터 삭제 로직
  const deleteDemoExpenseMutation = {
    mutate: (id: string | undefined) => {
      if (id == undefined) {
        alert('다시 시도해주세요.');
        return;
      }
      deleteDemoExpense(id);
      handleMovePrevPage();
      showToast('삭제했습니다.');
      console.log(`demo delete: articleId = ${JSON.stringify(id)}`);
    },
    isLoading: false,
  };

  if (isDemoMode) return deleteDemoExpenseMutation;
  return deleteExpenseMutation;
};

export default useDeleteExpense;
