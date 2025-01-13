import VoiceMultiText from '@components/input/VoiceMultiText';
import {
  addPageContainer,
  addPageSubject,
  flexBetween,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
  radioButtonLabelStyle,
  radioButtonStyle,
} from '@styles/CommonStyles';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const WriteSatisfaction = () => {
  const { register, watch } = useFormContext();

  // 활성화된 음성 인식 필드 상태
  const [activeListeningField, setActiveListeningField] = useState<string | null>(null);

  const satisfactionLabels = [1, 2, 3, 4, 5];
  const [activeLabel, setActiveLabel] = useState<number>(3);
  const selectedSatisfaction = watch('satisfaction');

  // 현재 선택된 값에 따라 상태 업데이트
  useEffect(() => {
    setActiveLabel(parseInt(selectedSatisfaction));
  }, [selectedSatisfaction]);

  return (
    <Container>
      <Subject>행동에 대한 결과의 만족도를 평가해주세요.</Subject>
      <SatisfactionContainer>
        {satisfactionLabels.map((label, i) => (
          <RadioLabelContainer key={i}>
            <RadioButton
              id={`satisfaction-${i + 1}`}
              value={i + 1}
              {...register('satisfaction', { required: true })}
              defaultChecked={i + 1 === 3}
            />
            <Label
              className={activeLabel === i + 1 ? 'selected' : ''}
              htmlFor={`satisfaction-${i + 1}`}>
              {label}
            </Label>
          </RadioLabelContainer>
        ))}
      </SatisfactionContainer>
      <Subject className="sub">위처럼 평가한 이유와 개선점은 무엇인가요?</Subject>
      <ReasonContainer>
        <VoiceMultiText
          hookFormFieldName="reason"
          title="이유"
          placeholder="예) 엽떡을 사먹어 버렸다. 매운건 스트레스가 풀리니까"
          activeListeningField={activeListeningField}
          setActiveListeningField={setActiveListeningField}
        />
      </ReasonContainer>
      <ImproveContainer>
        <VoiceMultiText
          hookFormFieldName="improvements"
          title="개선점"
          placeholder="예) 매운건 다음날 배아픈데 .. 다음부턴 좀 참아봐야겠다."
          activeListeningField={activeListeningField}
          setActiveListeningField={setActiveListeningField}
        />
      </ImproveContainer>
    </Container>
  );
};

export default WriteSatisfaction;

const Container = styled.div`
  ${overflowWithoutScroll}
  ${addPageContainer}
`;
const Subject = styled.h1`
  ${addPageSubject}

  &.sub {
    font-size: 16px;
  }
`;

const SatisfactionContainer = styled.div`
  ${flexBetween}
  ${mainSection}
  width: 100%;
  height: 100px;

  margin-bottom: 30px;
`;

const ReasonContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ImproveContainer = styled.div`
  width: 100%;
`;

const RadioLabelContainer = styled.div`
  ${flexColumnCenter}
  padding: 10px;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  ${radioButtonStyle}
`;

const Label = styled.label`
  ${radioButtonLabelStyle}
`;
