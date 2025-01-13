import { DEFAULT_EMOTION, REGISTER } from '@models/common';
import type { ExpenseDetailDataType } from '@service/expense/types';

import { useForm } from 'react-hook-form';

const useExpenseDetailForm = () => {
  const methods = useForm<ExpenseDetailDataType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      content: '',
      amount: '',
      spendDate: '',
      event: '',
      thought: '',
      emotion: DEFAULT_EMOTION,
      satisfaction: 1,
      reason: '',
      improvements: '',
      registerType: REGISTER.SPEND,
      aiComment: '',
    },
  });

  const summaryKeys = [
    'registerType',
    'amount',
    'content',
    'satisfaction',
    'emotion',
    'spendDate',
    'aiComment',
  ] as const;

  const [registerType, amount, content, satisfaction, emotion, spendDate, aiComment] =
    methods.getValues(summaryKeys);

  return {
    methods,
    formState: { registerType, amount, content, satisfaction, emotion, spendDate, aiComment },
  };
};

export default useExpenseDetailForm;
