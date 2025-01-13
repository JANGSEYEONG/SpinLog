import { fetchAIComment } from '@service/expense/expenseService';
import type { ExpenseDetailDataType } from '@service/expense/types';

import type { UseFormSetValue } from 'react-hook-form';
import { useMutation } from 'react-query';

const useAICommentData = (setValue: UseFormSetValue<ExpenseDetailDataType>) => {
  return useMutation(fetchAIComment, {
    onSuccess: (commentData) => {
      // #20240516.syjang, aiComment->content로 변경
      setValue('aiComment', commentData.content);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`삭제 실패: ${error}`);
    },
  });
};

export default useAICommentData;
