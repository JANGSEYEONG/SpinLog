import VoiceMultiText from '@components/input/VoiceMultiText';
import {
  addPageContainer,
  addPageSubject,
  borderCheck,
  flexCenter,
  mainSection,
  overflowWithoutScroll,
  textArea,
  textAreaWrapper,
} from '@styles/CommonStyles';
import { formatAmountNumber } from '@utils/index';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import styled from 'styled-components';

// 지출 타입, 내용, 금액, 날짜
const WriteExpense = () => {
  const { register, watch, control } = useFormContext();
  const [activeLabel, setActiveLabel] = useState('');

  const selectedRegisterType = watch('registerType');
  // 현재 선택된 값에 따라 상태 업데이트
  useEffect(() => {
    setActiveLabel(selectedRegisterType);
  }, [selectedRegisterType]);

  const handleAmountChange = (value: string, onChange: (value: string) => void) => {
    const formattedValue = formatAmountNumber(value);
    onChange(formattedValue);
  };

  return (
    <Container>
      <Subject>기록하고 싶은 지출/절약을 작성해 주세요.</Subject>
      <RegisterTypeContainer>
        <CustomCheckboxContainer>
          <Label className={activeLabel === 'SPEND' ? 'selected' : ''} htmlFor="spend">
            지출했나요?
          </Label>
          <HiddenRadio id="spend" value="SPEND" {...register('registerType', { required: true })} />
          <StyledCheckmark />
        </CustomCheckboxContainer>
        <CustomCheckboxContainer>
          <Label className={activeLabel === 'SAVE' ? 'selected' : ''} htmlFor="save">
            절약했나요?
          </Label>
          <HiddenRadio id="save" value="SAVE" {...register('registerType', { required: true })} />
          <StyledCheckmark />
        </CustomCheckboxContainer>
      </RegisterTypeContainer>

      <ContentContainer>
        <VoiceMultiText
          hookFormFieldName="content"
          title="내용"
          placeholder="예) 엽기떡볶이"
          isRequired={true}
        />
      </ContentContainer>

      <ItemContainer>
        <InputWrapper>
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
              />
            )}></Controller>
        </InputWrapper>
        <ItemText>원</ItemText>
      </ItemContainer>
      <DateContainer>
        <label htmlFor="date">날짜</label>
        <ItemContainer>
          <DatetimeInput id="date" {...register('spendDate', { required: true })} />
          {/* input 위치 조절용 text */}
          <ItemText />
        </ItemContainer>
      </DateContainer>
    </Container>
  );
};

export default WriteExpense;

const Container = styled.div`
  ${overflowWithoutScroll}
  ${addPageContainer}
  display:flex;
  flex-direction: column;
  gap: 10px;
`;
const Subject = styled.h1`
  ${addPageSubject}
`;

const RegisterTypeContainer = styled.div`
  display: flex;
`;
const ContentContainer = styled.div`
  margin-top: 20px;
`;
const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;
const Label = styled.label`
  color: #333331;
  font-size: 14px;
  cursor: pointer;
  font-weight: 300;

  &.selected {
    font-weight: 700;
  }
`;
const CustomCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  margin-right: 15px; // 요소들 사이에 간격 추가
`;

const StyledCheckmark = styled.span`
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 6px;
  margin-left: 10px;
  position: relative;
  transition: background-color 0.2s;
  box-shadow: ${(props) => props.theme.shadows.around};

  ${CustomCheckboxContainer}:hover & {
    background-color: #eee;
  }

  ${HiddenRadio}:checked + & {
    background-color: #767676;
  }

  &:after {
    ${borderCheck}
    border-color: #bbb; // 회색 체크 마크
  }

  ${HiddenRadio}:checked + &::after {
    border-color: white; // 선택된 상태에서는 흰색 체크 마크
  }
`;

const InputWrapper = styled.div`
  ${textAreaWrapper}
  height: 70px;
`;

const AmountInput = styled.input.attrs({ type: 'text' })`
  ${textArea}
  text-align: right;
`;

const ItemText = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  color: #767676;
  font-size: 14px;
  font-weight: 400;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  color: #9f9f9f;
  font-size: 12px;
  font-weight: 300;
  gap: 1px;
  margin-top: 20px;
`;

const DatetimeInput = styled.input.attrs({ type: 'datetime-local' })`
  ${mainSection}
  display: block;
  outline: none;
  border: none;
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
`;
