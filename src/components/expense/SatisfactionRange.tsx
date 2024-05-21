import styled from 'styled-components';
import { absoluteCenter, flexBetween, flexCenter } from '@styles/CommonStyles';
import { SpeechBubbleBtn } from '@components/button';

import { useEffect, useRef, useState } from 'react';

import useWindowWidthResize from '@hooks/useWindowWidthResize';
import { EmotionKey } from '@models/index';
import { getEmotionIcon } from '@models/emotion';

type SatisfactionRangeProps = {
  emotion: EmotionKey;
  satisfaction: number;
  isEdit?: boolean;
};

const SatisfactionRange = ({ emotion, satisfaction, isEdit = false }: SatisfactionRangeProps) => {
  const max = 5;
  const min = 1;

  const radius = 6;
  const thumb = 16;
  const height = 10;
  const [rangeWidth, setRangeWidth] = useState<number>(212);
  const value: number = satisfaction;
  const rangeRef = useRef<HTMLDivElement>(null);

  const EmotionSVG = getEmotionIcon(emotion);

  const getNomalized = (val: number): number => (val - min) / (max - min);
  const calculateLeft = (val: number) => {
    return getNomalized(val) * (rangeWidth - thumb) + thumb / 2;
  };
  const handleResize = () => {
    if (rangeRef.current) {
      const width = rangeRef.current.getBoundingClientRect().width;
      setRangeWidth(width);
    }
  };

  // 렌더링 시, 윈도우 너비 리사이즈 시 현재 input width 계산을 다시 해준다.
  useEffect(() => {
    handleResize();
  }, []);
  useWindowWidthResize(handleResize);

  return (
    <Wrapper>
      <RangeBackgroundBar radius={radius} />
      <Left>
        <EmotionSVG />
      </Left>
      <Right>
        <RangeSection ref={rangeRef}>
          <FollowText style={{ left: calculateLeft(value) }}>{value}</FollowText>
          <FollowShape style={{ left: calculateLeft(value) }} />
          <RangeCustomRail height={height} radius={radius} fill={getNomalized(value) * 100} />
          <RangeInput
            type="range"
            value={value}
            min={min}
            max={max}
            step={0.1}
            height={height}
            thumb={thumb}
            disabled={!isEdit}
          />
          <RangeButtonContainer>
            {[1, 2, 3, 4, 5].map((score, i) => (
              <RangeButton key={i}>{score}</RangeButton>
            ))}
          </RangeButtonContainer>
        </RangeSection>
      </Right>
    </Wrapper>
  );
};

export default SatisfactionRange;

const Wrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
`;

const Left = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  background-color: #f3f3f3;
  flex-shrink: 0;
  border-radius: 50%;
  z-index: 2;
`;

const Right = styled.div`
  ${flexCenter}
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const RangeSection = styled.div`
  width: 80%;
  height: 50px;
  position: relative;
  background-color: transparent;
`;

const RangeCustomRail = styled.div<{ height: number; radius: number; fill: number }>`
  ${absoluteCenter}
  width: 100%;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.radius}px;
  background: linear-gradient(
    90deg,
    #bcbcbc ${(props) => props.fill}%,
    #f2f2f2 ${(props) => props.fill}%
  );
`;
const RangeInput = styled.input<{ height: number; thumb: number }>`
  ${absoluteCenter}

  width: 100%;
  height: ${(props) => props.height}px; //20px;

  background: transparent;

  margin: 0;
  appearance: none;
  z-index: 2;
  // 잡고 움직이는 원 크기
  &::-webkit-slider-thumb {
    appearance: none;
    background: white;
    width: ${(props) => props.thumb}px; //16px;
    height: ${(props) => props.thumb}px; //16px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 3px 1px #5252521a;
  }

  &:active {
    cursor: grabbing;
  }
  &:focus {
    outline: none;
  }
`;

const FollowShape = styled(SpeechBubbleBtn)`
  position: absolute;
  top: -15px; // thumb 위에 위치하도록 조정
  left: 50%;
  transform: translateX(-50%);
`;

const FollowText = styled.div`
  position: absolute;
  top: -10px; // thumb 위에 위치하도록 조정
  left: 50%;
  transform: translateX(-50%);
  color: white;
  z-index: 2;
  font-size: 16px;
  font-weight: 600;
`;

const RangeBackgroundBar = styled.div<{ radius: number }>`
  ${absoluteCenter}
  width: 95%;
  height: 10px;

  border-radius: ${(props) => props.radius}px;

  background: linear-gradient(90deg, #bcbcbc 50%, #f2f2f2 50%);
`;

const RangeButtonContainer = styled.div`
  ${flexBetween}

  position: absolute;
  width: 100%;
  height: 20px;

  bottom: -3px;
`;

const RangeButton = styled.div`
  ${flexCenter}
  cursor: pointer;
  width: 15px;
  height: 15px;
  color: #333331;
  font-size: 12px;
  font-weight: 400;
`;
