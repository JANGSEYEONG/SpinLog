import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import CheckIcon from '@assets/images/icon/checkIcon.svg?react';
import type { EmotionKey } from '@models/index';
import { getEmotionIcon, getEmotionText } from '@models/emotion';

type EmotionProps = {
  emotionKey: EmotionKey; // key에 맞는 감정의 아이콘(색), 텍스트 표시
  isSelect: boolean; // true일 경우 우측 상단에 초록색 체크 표시
  onClick: () => void; // 클릭 이벤트 실행 (부모 컴포넌트는 setState 함수를 실행시키는 함수를 보내야함)
  iconSize?: number;
  textSize?: number;
  selectSize?: number;
};
const Emotion = ({
  emotionKey,
  isSelect,
  onClick,
  iconSize = 80,
  textSize = 14,
  selectSize = 24,
}: EmotionProps) => {
  const EmotionSVG = getEmotionIcon(emotionKey);
  return (
    <EmotionWrapper>
      <EmotionIcon onClick={onClick} size={`${iconSize}px`}>
        <EmotionSVG />
        {isSelect && <SelectMark size={`${selectSize}px`} />}
      </EmotionIcon>
      <EmotionText size={`${textSize}px`}>{getEmotionText(emotionKey)}</EmotionText>
    </EmotionWrapper>
  );
};

export default Emotion;

const EmotionWrapper = styled.div`
  ${flexColumnCenter}
  margin-bottom: 5px;
  cursor: pointer;
  width: 90px;
`;

const EmotionIcon = styled.div<{ size: string }>`
  ${flexCenter}
  position: relative;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  margin-bottom: 5px;
  cursor: pointer;
`;

const EmotionText = styled.div<{ size: string }>`
  color: #9f9f9f;
  font-size: ${(props) => props.size};
  font-weight: 500;
  white-space: nowrap;
`;

const SelectMark = styled(CheckIcon)<{ size: string }>`
  position: absolute;
  top: 0;
  right: 0;

  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: #333331;
  border-radius: 50%;

  padding: 3px;
`;
