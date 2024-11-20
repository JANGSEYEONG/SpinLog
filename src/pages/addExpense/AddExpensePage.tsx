// 소비 입력 페이지
import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import { Suspense, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import useIsDemoMode from '@hooks/useIsDemo';
import useSaveExpense from './hooks/useSaveExpense';
import useAddExpenseForm from './hooks/useAddExpenseForm';
import { useDemoStore } from '@stores/demoStore';

import NavigationLayout from './navigation';
import WriteExpense from './components/WriteExpense';

const WriteEmotion = lazyWithRetries(() => import('./components/WriteEmotion'));
const WriteSatisfaction = lazyWithRetries(() => import('./components/WriteSatisfaction'));

// import WriteEmotion from './components/WriteEmotion';
// import WriteSatisfaction from './components/WriteSatisfaction';

import GoLogin from '@components/information/GoLogin';
import LoadingModal from '@components/modal/LoadingModal';

import { MAX_EXPENSE_SIZE } from '@stores/storeConfig';
import type { ExpenseDetailDataType } from '@service/expense/types';

import { getCombineRegisterTypeText } from '@models/expense';
import { lazyWithRetries } from 'src/routes/lazyWithRetries';
import Spinner from '@components/information/Spinner';

const AddExpensePage = () => {
  const isDemoMode = useIsDemoMode();
  const getDemoExpensesCount = useDemoStore((state) => state.getDemoExpensesCount);

  // 소비 입력 form
  const methods = useAddExpenseForm();
  // 저장 쿼리
  const expenseSaveMutation = useSaveExpense(isDemoMode);

  // 페이지 별 타이틀
  const titleArr = [`${getCombineRegisterTypeText('/')} 입력`, '감정 입력', '만족도 입력'];
  const [title, setTitle] = useState<string>(titleArr[0]);

  // 입력 스탭
  const [currStep, setCurrStep] = useState<number>(0);

  // 다음 단계 (유효성 체크)
  const handleNextStep = async () => {
    // 현재 폼의 모든 입력 값에 대해 유효성 검사 수행
    const result = await methods.trigger();
    if (result) {
      // 유효성 검사를 통과하면 다음 스탭으로 이동
      setTitle(titleArr[currStep + 1]);
      setCurrStep(currStep + 1);
    }
  };

  // 이전 단계 (유효성 체크 x)
  const handlePrevStep = () => {
    // 이전 단계는 유효성 체크 안함
    setTitle(titleArr[currStep - 1]);
    setCurrStep(currStep - 1);
  };

  // 소비 내역 저장
  const handleSaveSubmit = (data: ExpenseDetailDataType) => {
    // amount: #,##0  => 다시 숫자만 남은 형태로 변경 필요
    const numberAmount = data.amount.replace(/,/g, '');

    // form 에서 가져온 값은 문자열이다.
    let numberSatisfaction = data.satisfaction;
    if (typeof numberSatisfaction === 'string') numberSatisfaction = parseInt(numberSatisfaction);

    expenseSaveMutation.mutate({
      ...data,
      amount: numberAmount,
      satisfaction: numberSatisfaction,
    });
  };

  // 체험모드일 경우, 최대 저장 개수만큼 데이터가 존재하면 로그인 유도 페이지로 연결
  if (isDemoMode && getDemoExpensesCount() >= MAX_EXPENSE_SIZE) {
    return (
      <GoLogin
        birdTop="120px"
        message={
          <>
            <span>{`'체험하기'에서는 최대 ${MAX_EXPENSE_SIZE}개까지`}</span>
            <span>저장할 수 있어요</span>
          </>
        }
      />
    );
  }
  return (
    <NavigationLayout hasPrev={currStep > 0} prevStep={handlePrevStep} title={title}>
      <AddExpenseContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSaveSubmit)}>
            {/* 폼 영역 (멀티 스탭) */}
            {currStep === 0 && <WriteExpense />}
            {currStep === 1 && (
              <Suspense fallback={<Spinner />}>
                <WriteEmotion />
              </Suspense>
            )}
            {currStep === 2 && (
              <Suspense fallback={<Spinner />}>
                <WriteSatisfaction />
              </Suspense>
            )}
            {/* 버튼 영역 */}
            <NextButtonWrapper>
              {currStep < 2 && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!methods.formState.isValid}>
                  다음
                </Button>
              )}
              {currStep === 2 && <Button type="submit">저장</Button>}
            </NextButtonWrapper>
          </Form>
        </FormProvider>
      </AddExpenseContainer>
      {expenseSaveMutation.isLoading && <LoadingModal />}
    </NavigationLayout>
  );
};

export default AddExpensePage;
const AddExpenseContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.black};
  overflow: hidden;
`;

const NextButtonWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  flex-shrink: 0;
`;

const Button = styled.button`
  width: 80%;
  min-width: 358px;
  height: 60px;

  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.lightGreen};

  color: ${(props) => props.theme.colors.white};
  font-size: 20px;
  font-weight: 600;

  margin-bottom: 40px;

  &:hover:not(:disabled) {
    filter: brightness(105%);
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray};
    color: ${(props) => props.theme.colors.darkGray};
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  ${flexColumnCenter}
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
