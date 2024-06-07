import styled from 'styled-components';
import {
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
  summaryArea,
} from '@styles/CommonStyles';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';

import useExpenseData from './hooks/useExpenseData';
import useUpdateExpense from './hooks/useUpdateExpense';
import useDeleteExpense from './hooks/useDeleteExpense';
import useAICommentData from './hooks/useAICommentData';

import type { EmotionKey, Register } from '@models/index';
import type { ExpenseDetailDataType } from '@service/expense/types';

import NavigationLayout from './navigation';
import ExpenseSummary from '@components/expense/ExpenseSummary';
import MultiText from '@components/input/MultiText';
import LoadingModal from '@components/modal/LoadingModal';
import { VolumeBtn } from '@components/button';
import EditSummary from './components/EditSummary';

import { formatAmountNumber, getSpendSumamryText } from '@utils/index';
import Spinner from '@components/information/Spinner';
import { PagePath } from '@models/navigation';

import useIsDemoMode from '@hooks/useIsDemo';
import useToast from '@hooks/useToast';

const ExpenseDetailViewPage = () => {
  const isDemoMode = useIsDemoMode();
  const { showToast } = useToast();

  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const searchParamPrev = searchParams.get('prev');
  const navigate = useNavigate();

  // 입력 페이지에서 넘어온 경우, 1. 뒤로가기 시 메인 화면으로 이동, 2. 삭제 시 메인화면으로 이동
  const handleMovePrevPage = () => {
    if (searchParamPrev == 'add') {
      navigate(PagePath.Main);
    } else {
      navigate(-1);
    }
  };

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
      emotion: 'EVADED',
      satisfaction: 1,
      reason: '',
      improvements: '',
      registerType: 'SPEND',
      aiComment: '',
    },
  });

  const [
    registerTypeState,
    amountState,
    contentState,
    satisfactionState,
    emotionState,
    spendDateState,
    aiComment,
  ] = methods.getValues([
    'registerType',
    'amount',
    'content',
    'satisfaction',
    'emotion',
    'spendDate',
    'aiComment',
  ]);

  const {
    data: expenseData,
    isLoading: isLoadingExpenseData,
    error: errorExpenseData,
  } = useExpenseData(paramId, isDemoMode);

  const updateMutation = useUpdateExpense(paramId, isDemoMode);
  const deleteMutation = useDeleteExpense(paramId, isDemoMode, handleMovePrevPage);
  const commentMutation = useAICommentData(methods.setValue);

  const handleUpdate = methods.handleSubmit((data: ExpenseDetailDataType) => {
    // amount: #,##0  => 다시 숫자만 남은 형태로 변경 필요
    const numberAmount = data.amount.replace(/,/g, '');
    updateMutation.mutate({ ...data, amount: numberAmount });
    toggleEditMode();
  });

  const handleDelete = () => {
    const confirmResult = confirm('삭제하시겠습니까?');
    if (confirmResult) {
      deleteMutation.mutate(paramId);
    }
  };

  // articleId를 가지고 ai comment 요청.
  const handleAIComment = () => {
    // 체험하기일 경우 return
    if (isDemoMode) {
      showToast('체험하기에서는 사용할 수 없어요.');
      return;
    }
    // 수정모드일 경우 return
    if (isEditMode) {
      showToast('수정 중에는 사용할 수 없어요.');
      return;
    }
    // AI 한마디가 존재할 경우 return
    if (aiComment) {
      showToast('AI 한마디는 한번만 사용할 수 있어요.');
      return;
    }
    commentMutation.mutate(paramId);
  };

  useEffect(() => {
    // 데이터 로딩이 완료되었고, 실제 데이터가 존재하는 경우에만 reset을 실행
    if (!isLoadingExpenseData && expenseData) {
      // 서버에서 받는 예산 데이터는 숫자 형태이므로, 다시 #,##0 형태로 변환하여 세팅 필요
      const formattedValue = formatAmountNumber(expenseData.amount);
      methods.reset({ ...expenseData, amount: formattedValue });

      // 감정 state도 최신 데이터로 업데이트 필요
      setSelectEmotion(expenseData.emotion as EmotionKey);
    }
  }, [expenseData, methods, isLoadingExpenseData]); // isLoadingExpenseData 의존성 추가

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // 감정 선택 시 렌더링 필요
  const [selectEmotion, setSelectEmotion] = useState<EmotionKey>(emotionState as EmotionKey);

  // ExpenseSummary Components Props
  const summaryProps = {
    articleId: Number(paramId),
    registerType: registerTypeState as Register,
    amount: amountState,
    content: contentState,
    satisfaction: satisfactionState,
    emotion: emotionState as EmotionKey,
  };

  // 상단 요약 텍스트
  const summaryText = getSpendSumamryText(
    spendDateState,
    contentState,
    amountState,
    registerTypeState,
  );

  return (
    <NavigationLayout
      isValid={!methods.formState.isValid}
      isEdit={isEditMode}
      isDemoMode={isDemoMode}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      handleMovePrevPage={handleMovePrevPage}
      toggleEdit={toggleEditMode}>
      <ExpenseDetailContainer>
        {isLoadingExpenseData || updateMutation.isLoading ? (
          <LoadingModal />
        ) : errorExpenseData ? (
          <div>Error...</div>
        ) : (
          <FormProvider {...methods}>
            <Form onSubmit={handleUpdate}>
              {!isEditMode && (
                <>
                  <SpendDateInput
                    type="datetime-local"
                    disabled={true}
                    {...methods.register('spendDate', { required: true })}
                  />
                  <ContentSumamry>{summaryText}</ContentSumamry>
                  <SpendSummary>
                    {/* 만족도, 감정, 내용, 가격, 지출여부 담고있음 */}
                    <ExpenseBox>
                      <ExpenseSummary {...summaryProps} />
                    </ExpenseBox>
                  </SpendSummary>
                </>
              )}
              <ContentContainer>
                <Title>{`${isEditMode ? '소비 내용 수정' : '소비 내용'}`}</Title>
                {/* 내용, 금액은 수정모드일 때만 Show */}
                {isEditMode && (
                  <EditSummary
                    isEditMode={isEditMode}
                    satisfactionState={satisfactionState}
                    selectEmotion={selectEmotion}
                    setSelectEmotion={setSelectEmotion}
                  />
                )}
                <Content>
                  <MultiText
                    hookFormFieldName="event"
                    title="사건"
                    placeholder="작성내역이 없어요"
                    isDisable={!isEditMode}></MultiText>
                </Content>
                <Content>
                  <MultiText
                    hookFormFieldName="thought"
                    title="생각"
                    placeholder="작성내역이 없어요"
                    isDisable={!isEditMode}></MultiText>
                </Content>
                <Content>
                  <MultiText
                    hookFormFieldName="reason"
                    title="이유"
                    placeholder="작성내역이 없어요"
                    isDisable={!isEditMode}></MultiText>
                </Content>
                <Content>
                  <MultiText
                    hookFormFieldName="improvements"
                    title="개선점"
                    placeholder="작성내역이 없어요"
                    isDisable={!isEditMode}></MultiText>
                </Content>
                {/* AI Comment는 수정 불가 */}
                <Content className="ai">
                  <MultiText
                    hookFormFieldName="aiComment"
                    title="AI 한마디"
                    placeholder="작성내역이 없어요"
                    isDisable={true}></MultiText>
                  <AICommentButton
                    onClick={handleAIComment}
                    className={`${isDemoMode || isEditMode || aiComment || commentMutation.isLoading ? '' : 'able'}`}>
                    {commentMutation.isLoading ? <Spinner size={35} /> : <VolumeBtn />}
                  </AICommentButton>
                </Content>
              </ContentContainer>
            </Form>
          </FormProvider>
        )}
      </ExpenseDetailContainer>
    </NavigationLayout>
  );
};

export default ExpenseDetailViewPage;

const Form = styled.form``;

const ExpenseDetailContainer = styled.div`
  ${overflowWithoutScroll}
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const ContentSumamry = styled.div`
  ${summaryArea}
  width: 100%;
  margin-top: 8px;
  margin-bottom: 12px;
`;

const SpendSummary = styled.section`
  width: 100%;
  margin-bottom: 24px;
`;

const ExpenseBox = styled.div`
  ${mainSection}
  width: 100%;
`;

const ContentContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 12px;
`;

const Title = styled.div`
  width: 100%;
  color: #333331;
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  ${flexCenter}

  width: 100%;
  gap: 10px;

  &.amount {
    align-items: flex-end;
  }
  &.ai {
    align-items: flex-start;
  }
`;

const AICommentButton = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  background-color: #dddddd;
  flex-shrink: 0;
  border-radius: 6px;
  color: #9f9f9f;
  transition:
    background-color,
    color 0.2s ease;
  cursor: not-allowed;

  &.able:hover {
    background-color: #47cfb0;
    color: #ffffff;
    cursor: pointer;
  }
`;

const SpendDateInput = styled.input`
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 400;
  border-radius: 6px;

  &.edit {
    display: flex;
    justify-content: flex-start;
    outline: none;
    border: none;
    width: 220px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
  }
`;
