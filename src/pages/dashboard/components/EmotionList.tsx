import styled from 'styled-components';
import { divider, flexBetween, flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import type { EmotionAmountTotalType } from '@service/dashboard/types';
import { addCommasToNumber, calculatePercentages } from '@utils/numberUtils';
import { getEmotionIcon, getEmotionText } from '@models/emotion';

type EmotionChartProps = {
  data: EmotionAmountTotalType[];
};

const EmotionList = ({ data }: EmotionChartProps) => {
  // 합계 계산
  const total = data.reduce((acc, value) => acc + value.amount, 0);

  // 각 항목의 비율 계산 후 데이터에 합치기
  const percentArray = calculatePercentages(data.map((data) => data.amount));
  const mergedPercentData = data.map((data, i) => {
    return { ...data, percent: percentArray[i] };
  });
  return (
    <Container>
      <Total>
        <span>전체</span>
        <span>{`${addCommasToNumber(total)}원`}</span>
      </Total>
      <Divider />
      <List>
        {mergedPercentData
          .sort((a, b) => b.amount - a.amount)
          .map((data) => {
            const EmotionSVG = getEmotionIcon(data.emotion);
            return (
              <ListWrapper key={data.emotion}>
                <EmotionInfo>
                  <EmotionIcon>
                    <EmotionSVG />
                  </EmotionIcon>
                  <span>{getEmotionText(data.emotion)}</span>
                  <span className="percent">{`${data.percent}%`}</span>
                </EmotionInfo>
                <AmountInfo>{`${addCommasToNumber(data.amount)}원`}</AmountInfo>
              </ListWrapper>
            );
          })}
      </List>
    </Container>
  );
};

export default EmotionList;

const Container = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  width: 100%;

  gap: 12px;
`;

const Divider = styled.div`
  ${divider}
  margin: 0;
`;

const Total = styled.div`
  ${flexBetween}
  width: 100%;
  color: ${(props) => props.theme.colors.darkLightGray};
  font-size: 14px;
  font-weight: 400;
  padding: 0 10px 0 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 130px;

  padding: 0 10px 0 10px;
  gap: 15px;

  overflow-y: auto;
  scrollbar-width: thin;
`;

const ListWrapper = styled.div`
  ${flexBetween}
  width: 100%;
`;

const EmotionInfo = styled.div`
  ${flexCenter}
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.lightBlack};

  & > span.percent {
    color: ${(props) => props.theme.colors.darkLightGray};
    margin-left: 8px;
  }
`;
const AmountInfo = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const EmotionIcon = styled.div`
  ${flexCenter}
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 12px;
`;
