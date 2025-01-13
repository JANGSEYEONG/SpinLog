import SwipeLayout from '@components/layout/SwipeLayout';
import type { EmotionKey, Register } from '@models/common';
import { Emotions, getEmotionText } from '@models/emotion';
import { getRegisterTypeText } from '@models/expense';
import { addCommasToNumber } from '@utils/numberUtils';
import styled from 'styled-components';

import StatisticsContentLayout from '../StatisticsContentLayout';

type EmotionalChartData = { type: EmotionKey; left: number; right: number }[];
type EmotionChartProps = {
  dataList: {
    data: EmotionalChartData;
    leftKey: string;
    rightKey: string;
  }[];
  registerType: Register;
};

const EmotionalAmountChart = ({ dataList, registerType }: EmotionChartProps) => {
  const findMaxValueFromData = (data: EmotionalChartData) => {
    let maxLeft = -Infinity;
    let maxRight = -Infinity;

    data.forEach((item) => {
      maxLeft = Math.max(maxLeft, item.left);
      maxRight = Math.max(maxRight, item.right);
    });

    return Math.max(maxLeft, maxRight);
  };

  const getLogValue = (value: number, max: number) => {
    return value === 0 ? 0 : (Math.log10(value) / Math.log10(max)) * 100;
  };

  const getTopTypesByValueFromData = (
    data: EmotionalChartData,
    key: 'left' | 'right',
    topN: number,
  ) => {
    return [...data]
      .sort((a, b) => b[key] - a[key])
      .slice(0, topN)
      .map((item) => item.type);
  };

  return (
    <SwipeLayout>
      {dataList.map(({ data, leftKey, rightKey }, index) => {
        const max = findMaxValueFromData(data) * 80;
        const leftTops = getTopTypesByValueFromData(data, 'left', 3);
        const rightTops = getTopTypesByValueFromData(data, 'right', 3);

        return (
          <StatisticsContentLayout
            key={index}
            message={
              <Message>
                {getRegisterTypeText(registerType)} 시 많이 느끼는 감정은 <br />
                <span className="green">
                  {leftKey}는 {getEmotionText(leftTops[0])}
                </span>
                ,{' '}
                <span className="red">
                  {rightKey}는 {getEmotionText(rightTops[0])}
                </span>{' '}
                이에요
              </Message>
            }>
            <ChartContainer>
              <Yaxis />
              {data.map(({ type, left, right }, index) => {
                const leftIndex = leftTops.findIndex((emotion) => emotion === type) + 1;
                const rightIndex = rightTops.findIndex((emotion) => emotion === type) + 1;
                const boldLeft = leftIndex !== 0 && leftIndex <= 3;
                const boldRight = rightIndex !== 0 && rightIndex <= 3;

                const { color, icon: EmotionSvg, text } = Emotions[type];

                return (
                  <TotalBarContainer key={index}>
                    <LeftBarContainer>
                      <LeftBar $value={getLogValue(left, max)} $isBold={boldLeft} $color={color}>
                        {boldLeft && <EmotionText>{text}</EmotionText>}
                      </LeftBar>
                      {boldLeft && (
                        <LabelContainer $isLeft={true}>
                          <Rank>{`${leftIndex}위`}</Rank>
                          <Label>{addCommasToNumber(left)}</Label>
                        </LabelContainer>
                      )}
                    </LeftBarContainer>
                    {(boldLeft || boldRight) && (
                      <EmotionIcon>
                        <EmotionSvg />
                      </EmotionIcon>
                    )}
                    <RightBarContainer>
                      <RightBar $value={getLogValue(right, max)} $isBold={boldRight} $color={color}>
                        {boldRight && <EmotionText>{text}</EmotionText>}
                      </RightBar>
                      {boldRight && (
                        <LabelContainer $isLeft={false}>
                          <Label>{addCommasToNumber(right)}</Label>
                          <Rank>{`${rightIndex}위`}</Rank>
                        </LabelContainer>
                      )}
                    </RightBarContainer>
                  </TotalBarContainer>
                );
              })}
            </ChartContainer>
          </StatisticsContentLayout>
        );
      })}
    </SwipeLayout>
  );
};
export default EmotionalAmountChart;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  width: 100%;
`;

const Yaxis = styled.div`
  position: absolute;
  width: 3px;
  height: 100%;
  z-index: 0;
  background-color: ${(props) => props.theme.colors.lightGray};
  left: 50%;
  transform: translateX(-50%);
`;

const TotalBarContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const LeftBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 2px;
`;

const LeftBar = styled.div<{ $value: number; $isBold: boolean; $color: string }>`
  width: ${(props) => `${props.$value}%`};
  height: ${(props) => `${props.$isBold ? '15px' : '10px'}`};
  background-color: ${(props) => `${props.$isBold ? props.$color : props.theme.colors.lightGray}`};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-right: ${(props) => props.$isBold && '5px'};
  align-content: center;
`;

const RightBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const RightBar = styled.div<{ $value: number; $isBold: boolean; $color: string }>`
  width: ${(props) => `${props.$value}%`};
  height: ${(props) => `${props.$isBold ? '15px' : '10px'}`};
  background-color: ${(props) => `${props.$isBold ? props.$color : props.theme.colors.lightGray}`};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: ${(props) => props.$isBold && '5px'};
  align-content: center;
`;

const EmotionIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const EmotionText = styled.div`
  width: 90%;
  font-family: 'SUIT';
  font-size: 12px;
  color: ${(props) => props.theme.colors.white};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 3px;
`;

const LabelContainer = styled.div<{ $isLeft: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isLeft ? 'column' : 'column-reverse')};
  align-items: ${(props) => (props.$isLeft ? 'flex-start' : 'flex-end')};

  gap: 2px;
  font-family: 'SUIT';
  font-size: 12px;
`;

const Label = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.darkGray};
`;

const Rank = styled.div`
  color: ${(props) => props.theme.colors.darkLightGray};
`;

const Message = styled.div`
  & > span.green {
    color: ${(props) => props.theme.colors.lightGreen};
  }

  & > span.red {
    color: ${(props) => props.theme.colors.lightRed};
  }
`;
