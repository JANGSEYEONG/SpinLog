import { flexBetween, flexCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

import { useFormContext } from 'react-hook-form';

const SelectSatisfaction = () => {
  const { setValue, watch, getValues } = useFormContext();
  const selectedOptions = watch('satisfaction'); // 만족도 숫자 배열

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const currentValues: number[] = getValues('satisfaction');
    if (checked) {
      // 체크되면 값을 배열에 추가
      setValue('satisfaction', [...currentValues, parseInt(value)]);
    } else {
      // 체크 해제되면 값을 배열에서 제거
      setValue(
        'satisfaction',
        currentValues.filter((item: number) => item !== parseInt(value)),
      );
    }
  };

  return (
    <Container>
      <span className="sub-title">소비 만족도</span>
      <CheckBoxContainer>
        {[1, 2, 3, 4, 5].map((score) => (
          <div key={score}>
            <HiddenCheckbox
              id={`filter-satisfaction-${score}`}
              value={score}
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes(score)}
            />
            <Label htmlFor={`filter-satisfaction-${score}`}>{score}</Label>
          </div>
        ))}
      </CheckBoxContainer>
    </Container>
  );
};
export default SelectSatisfaction;

const Container = styled.div`
  ${flexBetween}
  width: 100%;
  margin-bottom: 80px;
`;

const CheckBoxContainer = styled.span`
  ${flexCenter}
  gap: 6px;
  position: relative;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
`;

const Label = styled.label`
  ${flexCenter}
  height: 30px;
  width: 40px;
  border-radius: 6px;

  cursor: pointer;

  font-size: 14px;
  font-weight: 700;

  background-color: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.darkLightGray};

  transition:
    color,
    background-color 0.2s ease-out;

  ${HiddenCheckbox}:checked + & {
    background-color: ${(props) => props.theme.colors.lightGreen};
    color: ${(props) => props.theme.colors.white};
  }
`;
