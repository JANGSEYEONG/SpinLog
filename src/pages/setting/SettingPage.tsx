import { ChevronIcon } from '@components/icon';
import Spinner from '@components/information/Spinner';
import useIsDemoMode from '@hooks/useIsDemo';
import type { EI, NS, PJ, TF } from '@models/index';
import { type UserFormType, mbtiKeys } from '@models/user';
import { flexBetween, flexCenter, flexColumnCenter, mainSection } from '@styles/CommonStyles';
import { formatAmountNumber } from '@utils/numberUtils';
import styled from 'styled-components';

import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import useLogout from './hooks/useLogout';
import useSaveUserData from './hooks/useSaveUserData';
import useUserData from './hooks/useUserData';
import useUserForm from './hooks/useUserForm';
import NavigationLayout from './navigation';

const SettingPage = () => {
  const isDemoMode = useIsDemoMode();
  const { userData, isLoadingUserData, error } = useUserData(isDemoMode);
  const userSaveMutation = useSaveUserData(isDemoMode);
  const logoutMutation = useLogout(isDemoMode);

  const mbtiArray = mbtiKeys;

  // 유저 데이터 입력 Form
  const methods = useUserForm();

  const handleSaveSubmit = (data: UserFormType) => {
    // budget : #,##0  => 다시 숫자만 남은 형태로 변경 필요
    const sendBudget = data.budget.replace(/,/g, '');
    userSaveMutation.mutate({ ...data, budget: sendBudget });
  };

  const handleBudgetChange = (value: string, onChange: (value: string) => void) => {
    const formattedValue = formatAmountNumber(value, true);
    onChange(formattedValue);
  };

  const handleClickLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    if (!isLoadingUserData && userData) {
      // 서버에서 받는 예산 데이터는 숫자 형태이므로, 다시 #,##0 형태로 변환하여 세팅 필요
      const formattedValue = formatAmountNumber(userData.budget?.toString() || ''); // data.budget이 서버에서 null값으로 오는 경우 처리
      const [EI, NS, TF, PJ] = userData.mbti.split('') as [EI, NS, TF, PJ];

      methods.reset({
        budget: formattedValue,
        gender: userData.gender,
        EI,
        NS,
        TF,
        PJ,
      });
    }
  }, [userData, methods, isLoadingUserData]);

  return (
    <NavigationLayout>
      <SettingContainer>
        <Form onSubmit={methods.handleSubmit(handleSaveSubmit)}>
          <Title>나의 예산</Title>
          <BudgetContainer>
            {isLoadingUserData ? (
              <Spinner />
            ) : error ? (
              <div>An error occurred</div>
            ) : (
              <Controller
                name="budget"
                control={methods.control}
                defaultValue={''}
                rules={{ required: '예산을 입력해주세요.' }}
                render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                  <>
                    <BudgetWrapper>
                      <BudgetInput
                        {...field}
                        value={value}
                        onChange={(event) => handleBudgetChange(event.target.value, onChange)}
                        placeholder="0"
                      />
                      <span>원</span>
                    </BudgetWrapper>
                    <ErrorMessage>{error?.message}</ErrorMessage>
                  </>
                )}
              />
            )}
          </BudgetContainer>
          <Title>프로필</Title>
          <ProfileContainer>
            {isDemoMode ? (
              '체험하기에서는 예산만 설정할 수 있어요.'
            ) : !userData || isLoadingUserData ? (
              <Spinner />
            ) : error ? (
              <div>An error occurred</div>
            ) : (
              <>
                <ProfileDiv>
                  <span>로그인 계정</span>
                  {userData.email}
                </ProfileDiv>
                <ProfileDiv>
                  <span>성별</span>
                  <GenderWrapper>
                    <HiddenRadio
                      type="radio"
                      id="profile-male"
                      value="MALE"
                      {...methods.register('gender', { required: true })}
                    />
                    <Label htmlFor="profile-male">남</Label>
                    <HiddenRadio
                      type="radio"
                      id="profile-female"
                      value="FEMALE"
                      {...methods.register('gender', { required: true })}
                    />
                    <Label htmlFor="profile-female">여</Label>
                  </GenderWrapper>
                </ProfileDiv>
                <ProfileDiv>
                  <span style={{ marginBottom: '30px' }}>MBTI</span>
                  <MBTIContainer>
                    {mbtiArray.map((union) => {
                      return (
                        <MBTIWrapper key={union}>
                          {[...union].map((factor) => {
                            return (
                              <div key={factor}>
                                <HiddenRadio
                                  type="radio"
                                  id={`mbti-${factor}`}
                                  value={factor}
                                  {...methods.register(union, { required: true })}
                                />
                                <Label htmlFor={`mbti-${factor}`}>{factor}</Label>
                              </div>
                            );
                          })}
                        </MBTIWrapper>
                      );
                    })}
                  </MBTIContainer>
                </ProfileDiv>{' '}
              </>
            )}
          </ProfileContainer>
          <Button disabled={!methods.formState.isValid || userSaveMutation.isLoading}>저장</Button>
          <InquiryButton
            onClick={() => {
              alert('문의하기 기능 준비중!');
            }}>
            <span>문의하기</span>
            <InquiryArrow className="rotate-180" />
          </InquiryButton>
        </Form>
        <Button onClick={handleClickLogout}>로그아웃</Button>
      </SettingContainer>
    </NavigationLayout>
  );
};

export default SettingPage;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  margin-top: 15px;
`;

const Form = styled.form`
  width: 100%;
  height: 90%;
`;

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BudgetWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  & > span {
    ${flexCenter}
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.darkLightGray};
  }
`;

const ProfileContainer = styled.div`
  ${flexColumnCenter}
  ${mainSection}
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
  gap: 20px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.lightBlack};
  font-size: 20px;
  font-weight: 700;

  margin-bottom: 10px;
`;

const Button = styled.button`
  ${flexCenter}
  width: 100%;
  height: 60px;
  margin-bottom: 15px;

  color: ${(props) => props.theme.colors.darkLightGray};
  background-color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: 700;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};

  &:disabled {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.lightGray};
    cursor: not-allowed;
    &:hover {
      filter: none;
    }
  }
`;

const BudgetInput = styled.input.attrs({ type: 'text', inputMode: 'numeric' })`
  height: 80px;
  width: 100%;

  text-align: right;

  background-color: ${(props) => props.theme.colors.darkLightGray2};
  color: ${(props) => props.theme.colors.white};
  border-radius: 6px;

  font-size: 24px;
  font-weight: 700;

  padding: 22.5px 27.5px;

  &::placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray};
  }
`;

const ProfileDiv = styled.div`
  ${flexBetween}
  width: 100%;

  font-size: 14px;
  color: ${(props) => props.theme.colors.darkLightGray2};
  font-weight: 400;
`;

const Label = styled.label`
  ${flexCenter}
  width: 50px;
  height: 30px;

  color: ${(props) => props.theme.colors.darkLightGray};
  background-color: ${(props) => props.theme.colors.lightGray2};

  border-radius: 6px;
  cursor: pointer;
`;

const GenderWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;

  &:checked + label {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.lightGreen};
  }
`;

const MBTIContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const MBTIWrapper = styled.div`
  ${flexColumnCenter}
  border: 1px solid ${(props) => props.theme.colors.lightGray2};
  border-radius: 6px;
  padding: 5px;
  gap: 6px;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.red};
  font-size: 14px;
  margin-bottom: 30px;
`;

const InquiryButton = styled.div`
  ${flexBetween}
  width: 100%;
  height: 44px;

  background-color: ${(props) => props.theme.colors.white};

  padding: 16px;

  font-size: 14px;
  color: ${(props) => props.theme.colors.darkLightGray};
  font-weight: 300;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};
`;

const InquiryArrow = styled(ChevronIcon)`
  color: ${(props) => props.theme.colors.darkLightGray};
  stroke-width: 4;
`;
