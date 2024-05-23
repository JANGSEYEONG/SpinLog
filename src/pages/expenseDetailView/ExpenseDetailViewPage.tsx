import { useParams, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import TopNavigation from '@layout/TopNavigation';

import { useNavigate } from 'react-router-dom';
import {
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
  summaryArea,
} from '@styles/CommonStyles';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import type { EmotionKey, Register } from '@models/index';
import type { ExpenseFormType } from '@models/expense';

import EditSummary from './components/EditSummary';
import ExpenseSummary from '@components/expense/ExpenseSummary';
import MultiText from '@components/input/MultiText';
import LoadingModal from '@components/modal/LoadingModal';
import { VolumeBtn } from '@components/button';

import { fetchExpenseById } from '@api/get';
import { saveExpenseData } from '@api/patch';
import { deleteExpenseById } from '@api/delete';
import { fetchAIComment } from '@api/post';

import { formatAmountNumber, getSpendSumamryText } from '@utils/index';
import MetaThemeColor from '@components/background/MetaThemeColor';
import Spinner from '@components/information/Spinner';

type NavLayoutProps = {
  children: React.ReactNode;
  isEdit: boolean;
  isValid: boolean;
  handleSubmit: () => void;
  handleDelete: () => void;
  toggleEdit: () => void;
};

const NavigationLayout = ({
  children,
  isEdit,
  isValid,
  handleSubmit,
  handleDelete,
  toggleEdit,
}: NavLayoutProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('prev');
  return (
    <>
      <MetaThemeColor color="#F4F4F4" />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={
              !isEdit && (
                <TopNavigation.TopBar.PrevButton
                  onClick={() => {
                    if (query == 'add') {
                      navigate('/');
                    } else {
                      navigate(-1);
                    }
                  }}
                />
              )
            }
            centerContent={
              <TopNavigation.TopBar.CenterTitle>작성완료 내역</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <Toolbar>
                {isEdit ? (
                  <SaveButton onClick={handleSubmit} disabled={isValid}>
                    완료
                  </SaveButton>
                ) : (
                  <EditButton onClick={toggleEdit} />
                )}
                <DeleteButton onClick={handleDelete} />
              </Toolbar>
            }
          />
        }
      />
      {children}
    </>
  );
};

const Toolbar = styled.div`
  ${flexCenter}
  gap: 16px;
`;

const toolbarStyle = css`
  width: 24px;
  height: 24px;
  color: #bcbcbc;
  cursor: pointer;

  &:hover {
    color: #47cfb0;
  }
`;

const EditButton = styled(TopNavigation.TopBar.EditButton)`
  ${toolbarStyle}
`;

const DeleteButton = styled(TopNavigation.TopBar.DeleteButton)`
  ${toolbarStyle}
`;

const SaveButton = styled.button`
  color: #47cfb0;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    &:hover {
      filter: none;
    }
  }
`;

const ExpenseDetailViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('prev');

  const methods = useForm<ExpenseFormType>({
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
  } = useQuery(['expense', id], () => fetchExpenseById(id), {
    enabled: !!id, // id가 있을 때만 쿼리 실행
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  const saveMutation = useMutation({
    mutationFn: (data: ExpenseFormType) => saveExpenseData(id, data),
    onSuccess: () => {
      console.log('저장 성공!');
    },
    onError: (error) => {
      console.log(`저장 실패: ${error}`);
    },
  });

  const deleteMutation = useMutation(deleteExpenseById, {
    onSuccess: () => {
      console.log(`${id} 삭제 성공`);
      if (query == 'add') {
        navigate('/');
      } else {
        navigate(-1);
      }
    },
    onError: (error) => {
      console.log(`삭제 실패: ${error}`);
    },
  });

  const commentMutation = useMutation(fetchAIComment, {
    onSuccess: (commentData) => {
      console.log(commentData.data.aiComment);
      // #20240516.syjang, aiComment->content로 변경
      methods.setValue('aiComment', commentData.data.content);
    },
    onError: (error) => {
      console.log(`삭제 실패: ${error}`);
    },
  });

  const handleSubmit = methods.handleSubmit((data: ExpenseFormType) => {
    // amount: #,##0  => 다시 숫자만 남은 형태로 변경 필요
    const numberAmount = data.amount.replace(/,/g, '');
    saveMutation.mutate({ ...data, amount: numberAmount });
    toggleEditMode();
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  // articleId를 가지고 ai comment 요청.
  const handleAIComment = () => {
    // 수정모드일 경우 return
    // 이미 내용이 있거나(요청은 한번만 받을 수 있음), 메세지 창 띄워주는 사용성 개선 필요
    if (isEditMode || aiComment) return;
    commentMutation.mutate(id);
  };

  useEffect(() => {
    // 데이터 로딩이 완료되었고, 실제 데이터가 존재하는 경우에만 reset을 실행
    if (!isLoadingExpenseData && expenseData && expenseData.data) {
      const data = expenseData.data;
      // 서버에서 받는 예산 데이터는 숫자 형태이므로, 다시 #,##0 형태로 변환하여 세팅 필요
      const formattedValue = formatAmountNumber(data.amount.toString() || ''); // data.amount가 서버에서 null값으로 오는 경우 처리
      methods.reset({ ...data, amount: formattedValue });

      // 감정 state도 최신 데이터로 업데이트 필요
      setSelectEmotion(expenseData.data.emotion as EmotionKey);
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
    articleId: Number(id),
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
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      toggleEdit={toggleEditMode}>
      <ExpenseDetailContainer>
        {isLoadingExpenseData || saveMutation.isLoading ? (
          <LoadingModal />
        ) : errorExpenseData ? (
          <div>Error...</div>
        ) : (
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit}>
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
                    className={`${isEditMode || aiComment || commentMutation.isLoading ? '' : 'able'}`}>
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
