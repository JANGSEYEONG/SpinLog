import ExpenseSummary from '@components/expense/ExpenseSummary';
import { VolumeIcon } from '@components/icon';
import Spinner from '@components/information/Spinner';
import MultiText from '@components/input/MultiText';
import LoadingModal from '@components/modal/LoadingModal';
import useIsDemoMode from '@hooks/useIsDemo';
import useToast from '@hooks/useToast';
import type { EmotionKey } from '@models/index';
import { PagePath } from '@models/navigation';
import type { ExpenseDetailDataType } from '@service/expense/types';
import {
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
  summaryArea,
} from '@styles/CommonStyles';
import { formatAmountNumber } from '@utils/numberUtils';
import { getSpendSumamryText } from '@utils/textsUtils';
import styled from 'styled-components';

import { useEffect, useReducer, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';

import EditSummary from './components/EditSummary';
import useAICommentData from './hooks/useAICommentData';
import useDeleteExpense from './hooks/useDeleteExpense';
import useExpenseData from './hooks/useExpenseData';
import useExpenseDetailForm from './hooks/useExpenseDetailForm';
import useUpdateExpense from './hooks/useUpdateExpense';
import NavigationLayout from './navigation';

const ExpenseDetailViewPage = () => {
  const navigate = useNavigate();

  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const searchParamPrev = searchParams.get('prev');

  const { showToast } = useToast();
  const isDemoMode = useIsDemoMode();

  const {
    data: expenseData,
    isLoading: isLoadingExpenseData,
    error: errorExpenseData,
  } = useExpenseData(paramId, isDemoMode);

  const { methods, formState } = useExpenseDetailForm();

  // 감정 선택 시 렌더링 필요
  const [selectEmotion, setSelectEmotion] = useState<EmotionKey>(formState.emotion as EmotionKey);
  const [isEditMode, toggleEditMode] = useReducer((state) => !state, false);

  // 입력 페이지에서 넘어온 경우, 1. 뒤로가기 시 메인 화면으로 이동, 2. 삭제 시 메인화면으로 이동
  const handleMovePrevPage = () => {
    if (searchParamPrev == 'add') {
      navigate(PagePath.Main);
    } else {
      navigate(-1);
    }
  };

  const updateMutation = useUpdateExpense(paramId, isDemoMode);
  const deleteMutation = useDeleteExpense(paramId, isDemoMode, handleMovePrevPage);
  const commentMutation = useAICommentData(methods.setValue);

  const handleUpdate = methods.handleSubmit((data: ExpenseDetailDataType) => {
    // amount: #,##0  => 다시 숫자만 남은 형태로 변경 필요
    const numberAmount = data.amount.replace(/,/g, '');

    // form 에서 가져온 값은 문자열이다.
    let numberSatisfaction = data.satisfaction;
    if (typeof numberSatisfaction === 'string') numberSatisfaction = parseInt(numberSatisfaction);

    updateMutation.mutate({ ...data, amount: numberAmount, satisfaction: numberSatisfaction });
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
    if (formState.aiComment) {
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

  // ExpenseSummary Components Props
  const summaryProps = {
    articleId: paramId ? parseInt(paramId) : -1,
    registerType: formState.registerType,
    amount: formState.amount,
    content: formState.content,
    satisfaction: formState.satisfaction,
    emotion: formState.emotion as EmotionKey,
  };

  // 상단 요약 텍스트
  const summaryText = getSpendSumamryText(
    formState.spendDate,
    formState.content,
    formState.amount,
    formState.registerType,
  );

  const navigationProps = {
    isValid: !methods.formState.isValid,
    isEditMode,
    isDemoMode,
    handleUpdate,
    handleDelete,
    handleMovePrevPage,
    toggleEditMode,
  };

  const valueListExceptSummaryAndAIComment = [
    { fieldName: 'event', title: '사건' },
    { fieldName: 'thought', title: '생각' },
    { fieldName: 'reason', title: '이유' },
    { fieldName: 'improvements', title: '개선점' },
  ];

  return (
    <NavigationLayout {...navigationProps}>
      <ExpenseDetailContainer>
        {isLoadingExpenseData || updateMutation.isLoading ? (
          <LoadingModal />
        ) : errorExpenseData ? (
          <div>Error...</div>
        ) : (
          <FormProvider {...methods}>
            <Form onSubmit={handleUpdate}>
              {/* 조회모드 Summary */}
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
                {/* 수정모드 Summary */}
                {isEditMode && (
                  <EditSummary
                    isEditMode={isEditMode}
                    satisfactionState={formState.satisfaction}
                    selectEmotion={selectEmotion}
                    setSelectEmotion={setSelectEmotion}
                  />
                )}
                {/* Summary 내용을 제외한 나머지 정보들은 형태가 바뀌지 않는다. isEditMode로만 판단 */}
                {valueListExceptSummaryAndAIComment.map((value) => (
                  <Content key={value.fieldName}>
                    <MultiText
                      hookFormFieldName={value.fieldName}
                      title={value.title}
                      placeholder="작성내역이 없어요"
                      isDisable={!isEditMode}
                    />
                  </Content>
                ))}
                {/* AI Comment는 수정 불가 */}
                <Content className="ai">
                  <MultiText
                    hookFormFieldName="aiComment"
                    title="AI 한마디"
                    placeholder="작성내역이 없어요"
                    isDisable={true}
                  />
                  <AICommentButton
                    onClick={handleAIComment}
                    className={`${isDemoMode || isEditMode || formState.aiComment || commentMutation.isLoading ? '' : 'able'}`}>
                    {commentMutation.isLoading ? <Spinner size={35} /> : <VolumeIcon />}
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
  color: ${(props) => props.theme.colors.lightBlack};
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
  background-color: ${(props) => props.theme.colors.lightGray};
  flex-shrink: 0;
  border-radius: 6px;
  color: ${(props) => props.theme.colors.darkLightGray};
  transition:
    background-color,
    color 0.2s ease;
  cursor: not-allowed;

  &.able:hover {
    background-color: ${(props) => props.theme.colors.lightGreen};
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }
`;

const SpendDateInput = styled.input`
  color: ${(props) => props.theme.colors.darkLightGray};
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
