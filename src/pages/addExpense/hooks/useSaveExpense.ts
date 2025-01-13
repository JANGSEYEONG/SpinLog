import useToast from '@hooks/useToast';
import { getExpenseDetailViewPath } from '@models/navigation';
import { saveExpenseData } from '@service/expense/expenseService';
import type { ExpenseDetailDataType } from '@service/expense/types';
import { useDemoStore } from '@stores/demoStore';
import { MAX_EXPENSE_SIZE } from '@stores/storeConfig';

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useSaveExpense = (isDemoMode: boolean) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const addDemoExpense = useDemoStore((state) => state.addDemoExpense); // 체험하기용

  const saveExpenseMutation = useMutation(saveExpenseData, {
    onSuccess: (data) => {
      const articleId = data.articleId;
      showToast('저장했습니다.');
      console.log('저장 성공: ' + articleId);

      navigate(`${getExpenseDetailViewPath(articleId)}?prev=add`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error('저장 실패: ' + error);
    },
  });

  // [체험하기] 소비 데이터 저장 로직
  const saveDemoExpenseMutation = {
    mutate: (data: ExpenseDetailDataType) => {
      const articleId = addDemoExpense(data);
      if (articleId == -1) {
        // 체험하기 저장 개수 초과 (입력 페이지 네비게이션부터 막힐거지만, 예외 상황을 위해 추가)
        // 예외상황 예시 :  직접 /add 를 url에 입력하여 들어온 경우
        showToast(`'체험하기'에서는 최대 ${MAX_EXPENSE_SIZE}개까지 저장할 수 있어요`);
      } else {
        showToast('저장했습니다.');
        console.log('체험하기 저장 성공: ' + articleId);
        navigate(`${getExpenseDetailViewPath(articleId)}?prev=add`);
      }
    },
    isLoading: false,
  };

  if (isDemoMode) return saveDemoExpenseMutation;
  return saveExpenseMutation;
};

export default useSaveExpense;
