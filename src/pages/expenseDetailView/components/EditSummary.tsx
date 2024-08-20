import {
  borderCheck,
  flexBetween,
  flexCenter,
  flexColumnCenter,
  radioButtonLabelStyle,
  radioButtonStyle,
  textArea,
  textAreaWrapper,
} from '@styles/CommonStyles';
import styled from 'styled-components';

import { useFormContext, Controller } from 'react-hook-form';

import Emotion from '@components/emotion';
import MultiText from '@components/input/MultiText';

import { EmotionKey, EmotionKeys, Registers } from '@models/index';
import { formatAmountNumber } from '@utils/numberUtils';
import { getRegisterTypeText } from '@models/expense';

type EditSummaryProps = {
  isEditMode: boolean;
  satisfactionState: number;
  selectEmotion: EmotionKey;
  setSelectEmotion: (emotion: EmotionKey) => void;
};

const EditSummary = ({
  isEditMode,
  satisfactionState,
  selectEmotion,
  setSelectEmotion,
}: EditSummaryProps) => {
  const { register, setValue, control } = useFormContext();
  const satisfactionLabels = [1, 2, 3, 4, 5];

  const handleAmountChange = (value: string, onChange: (value: string) => void) => {
    const formattedValue = formatAmountNumber(value);
    onChange(formattedValue);
  };

  return (
    <>
      <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
        <GroupWrapper
          style={{
            height: '80px',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '15px',
            padding: '10px',
          }}>
          {Registers.map((registerType) => {
            return (
              <div key={registerType} style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="title">{getRegisterTypeText(registerType)}</span>
                <span style={{ display: 'flex', width: '100%' }}>
                  <HiddenRadio
                    id={registerType.toLowerCase()}
                    value={registerType}
                    {...register('registerType', { required: true })}
                  />
                  <CheckLabel htmlFor={registerType.toLowerCase()} />
                </span>
              </div>
            );
          })}
        </GroupWrapper>
        <GroupWrapper style={{ height: '80px' }}>
          <span className="title">날짜</span>
          <SpendDateInput
            id="date"
            className="edit"
            type="datetime-local"
            disabled={!isEditMode}
            {...register('spendDate', { required: true })}
          />
        </GroupWrapper>
      </div>
      <GroupWrapper>
        <span className="title">만족도 내역</span>
        <SatisfactionRadioContainer>
          {satisfactionLabels.map((label, i) => (
            <SatisfactionRadioWrapper key={i}>
              <SatisfactionRadioButton
                id={`satisfaction-${i + 1}`}
                value={i + 1}
                defaultChecked={i + 1 === satisfactionState}
                {...register('satisfaction', { required: true })}
              />
              <SatisfactionLabel htmlFor={`satisfaction-${i + 1}`}>{label}</SatisfactionLabel>
            </SatisfactionRadioWrapper>
          ))}
        </SatisfactionRadioContainer>
      </GroupWrapper>
      <GroupWrapper style={{ height: '150px' }}>
        <span className="title">감정</span>
        <EmotionContainer>
          {EmotionKeys.map((x) => (
            <EmotionWrapper key={x}>
              <Emotion
                emotionKey={x}
                isSelect={x === selectEmotion}
                iconSize={50}
                onClick={() => {
                  setValue('emotion', x, { shouldValidate: true });
                  setSelectEmotion(x);
                }}
              />
            </EmotionWrapper>
          ))}
        </EmotionContainer>
      </GroupWrapper>
      <Content>
        <MultiText
          hookFormFieldName="content"
          title="내용"
          placeholder="작성내역이 없어요"
          isRequired={true}
          isDisable={!isEditMode}></MultiText>
      </Content>
      <Content className="amount">
        <AmountWrapper>
          <span className="title">금액</span>
          <Controller
            name="amount"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field: { onChange, value, ...field } }) => (
              <AmountInput
                {...field}
                value={value}
                onChange={(event) => handleAmountChange(event.target.value, onChange)}
                placeholder="0"
                disabled={!isEditMode}
              />
            )}
          />
        </AmountWrapper>
        <AmountText>원</AmountText>
      </Content>
    </>
  );
};

export default EditSummary;

const GroupWrapper = styled.div`
  ${textAreaWrapper}
`;

const SatisfactionRadioContainer = styled.div`
  ${flexBetween}
  width: 100%;
`;
const SatisfactionRadioWrapper = styled.div`
  ${flexColumnCenter}
  padding: 10px;
`;

// 만족도 1~5점의 동그란 원 라디오
const SatisfactionRadioButton = styled.input.attrs({ type: 'radio' })`
  ${radioButtonStyle}

  &:checked + label {
    color: ${(props) => props.theme.colors.lightBlack};
    font-weight: 700;
  }
`;

const SatisfactionLabel = styled.label`
  ${radioButtonLabelStyle}
`;

const EmotionContainer = styled.div`
  ${flexBetween}
  overflow: auto;
  height: 100%;
  width: 100%;
  gap: 15px;
`;

const EmotionWrapper = styled.div`
  ${flexCenter}
  height: 100%;
  width: 80px;
  flex-shrink: 0;
`;

const CheckLabel = styled.label`
  position: relative;
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.lightGray};
  border-radius: 6px;
  cursor: pointer;
  margin-top: 8px;
  &::after {
    ${borderCheck}
    left: 8px;
    top: 4px;
    cursor: pointer;
  }
`;

// 지출, 절약의 체크박스 라디오
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  &:checked + label {
    background-color: ${(props) => props.theme.colors.darkLightGray2};
    &::after {
      border-color: ${(props) => props.theme.colors.white};
    }
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
const AmountWrapper = styled.div`
  ${textAreaWrapper}
  height: 70px;
`;

const AmountInput = styled.input.attrs({ type: 'text', inputMode: 'numeric' })`
  ${textArea}
  text-align: right;
`;

const AmountText = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  color: ${(props) => props.theme.colors.darkLightGray2};
  font-size: 14px;
  font-weight: 400;
`;
