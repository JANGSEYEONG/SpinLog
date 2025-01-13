import { REGISTER } from '@models/common';
import { ExpenseDetailDataType } from '@service/expense/types';

import { useForm } from 'react-hook-form';

const useAddExpenseForm = () => {
  return useForm<ExpenseDetailDataType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      registerType: REGISTER.SPEND, // 소비, 절약
      amount: '', // 금액, #,##0 형태
      content: '', // 소비 내용 (원래 물건)
      spendDate: '', // 소비 날짜, 시간 (저장 시간 아님) -> 추가 필요 필드
      event: '', // 사건
      thought: '', // 생각
      emotion: '', // 감정
      satisfaction: 3, // 만족도
      reason: '', // 만족 이유
      improvements: '', // 개선점
    },
  });
};

export default useAddExpenseForm;
