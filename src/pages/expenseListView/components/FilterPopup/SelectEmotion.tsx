import Emotion from '@components/emotion';
import { ChevronIcon } from '@components/icon';
import { getEmotionText } from '@models/emotion';
import { EmotionKey, EmotionKeys } from '@models/index';
import { flexBetween, flexCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const SelectEmotion = () => {
  const { setValue, watch, getValues } = useFormContext();
  const selectedOptions = watch('emotion'); // 감정 문자열 배열

  const [isFold, setIsFold] = useState<boolean>(false);
  const handleFold = () => {
    setIsFold((prev) => !prev);
  };

  const getChekedItemMessage = () => {
    const currentValues: EmotionKey[] = getValues('emotion');

    if (currentValues.length === 0) return `0건`;
    if (currentValues.length === 1) return `${getEmotionText(currentValues[0])}`;
    return `${getEmotionText(currentValues[0])} 외 ${currentValues.length - 1}건`;
  };

  const handleCheckboxChange = (selectEmotion: EmotionKey) => {
    const value: EmotionKey = selectEmotion;

    const currentValues: EmotionKey[] = getValues('emotion');
    // 포함되어 있었다는 건, 체크 해제로 변경 / 포함되었다는건 체크로 변경한다는 뜻이라 ! 추가
    const checked: boolean = !currentValues.includes(value);

    if (checked) {
      // 체크되면 값을 배열에 추가
      setValue('emotion', [...currentValues, value]);
    } else {
      // 체크 해제되면 값을 배열에서 제거
      setValue(
        'emotion',
        currentValues.filter((item) => item !== value),
      );
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Title onClick={handleFold} className="sub-title">
          감정 다수 선택
          <Arrow className={`${isFold ? 'rotate-90' : 'rotate-270'}`} />
        </Title>
        <span className="select">{getChekedItemMessage()}</span>
      </TitleWrapper>
      {isFold && (
        <EmotionContainer>
          {EmotionKeys.map((x) => (
            <EmotionWrapper key={x}>
              <Emotion
                emotionKey={x}
                isSelect={selectedOptions.includes(x)}
                onClick={() => {
                  handleCheckboxChange(x);
                }}
                iconSize={50}
                textSize={12}
                selectSize={18}
              />
            </EmotionWrapper>
          ))}
        </EmotionContainer>
      )}
    </Container>
  );
};

export default SelectEmotion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  gap: 30px;
`;

const EmotionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;
  width: 100%;

  gap: 30px;
`;

const EmotionWrapper = styled.div`
  ${flexCenter}
  width: 56px;
  height: 70px;
`;

const TitleWrapper = styled.div`
  ${flexBetween}

  & > span.select {
    font-size: 14px;
    color: ${(props) => props.theme.colors.darkLightGray2};
  }
`;

const Title = styled.span`
  ${flexCenter}
  cursor: pointer;
`;

const Arrow = styled(ChevronIcon)`
  color: ${(props) => props.theme.colors.darkLightGray};
  stroke-width: 4;

  margin-left: 7px;
  &:hover {
    color: ${(props) => props.theme.colors.darkLightGray};
    stroke-width: 4;
  }
`;
