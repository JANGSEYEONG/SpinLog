import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

import { useNavigate } from 'react-router-dom';

import { getRegisterTypeText, type ExpenseSummaryType } from '@models/expense';
import { getExpenseDetailViewPath } from '@models/navigation';

import Emotion from '@components/emotion';
import { addCommasToNumber } from '@utils/numberUtils';

type ExpenseSummaryProps = ExpenseSummaryType & {
  hideHeader?: boolean;
};
const ExpenseSummary = ({
  articleId,
  registerType,
  amount,
  content,
  satisfaction,
  emotion,
  // hideHeader = false,
}: ExpenseSummaryProps) => {
  const navigate = useNavigate();

  const handleSummaryClick = (id: number) => {
    // PagePath.ExpenseDetailView : '/expense/:id',
    const detailPath = getExpenseDetailViewPath(id);
    navigate(detailPath);
  };

  return (
    <Container
      onClick={() => {
        handleSummaryClick(articleId);
      }}>
      <EmotionWrapper>
        <Emotion emotionKey={emotion} isSelect={false} iconSize={80} textSize={14} />
      </EmotionWrapper>
      <InfoWrapper>
        <InfoItem>
          <span className="info-title">내용</span>
          <InfoDataWrapper>
            <InfoData>{content}</InfoData>
          </InfoDataWrapper>
        </InfoItem>
        <InfoItem>
          {/* 지출 or 절약 */}
          <span className="info-title">{getRegisterTypeText(registerType)}</span>{' '}
          <InfoDataWrapper>
            <InfoData>{addCommasToNumber(amount)}</InfoData>
          </InfoDataWrapper>
          <span className="info-text">원</span>
        </InfoItem>
        <InfoItem>
          <span className="info-title">만족도</span>
          <InfoDataWrapper>
            <InfoData>{satisfaction}</InfoData>
            <span className="satisfaction-standard">/5</span>
          </InfoDataWrapper>
          <span className="info-text">점</span>
        </InfoItem>
      </InfoWrapper>
      {/* 이전 UI (만족도 range 사용) */}
      {/* {!hideHeader && (
        <EmotionText>
          {getEmotionText(emotion)} {satisfaction}점
        </EmotionText>
      )}
      <RangeWrapper>
        <SatisfactionRange satisfaction={satisfaction} emotion={emotion} />
      </RangeWrapper>
      <Info>
        <InfoItem>
          <span className="info-text">내용</span>
          <span className="info-price">{content}</span>
        </InfoItem>
        <InfoItem>
          <span className="info-text">{registerType === 'SPEND' ? '지출' : '절약'}</span>
          <span className="info-price">{addCommasToNumber(amount)}원</span>
        </InfoItem>
      </Info> */}
    </Container>
  );
};

export default ExpenseSummary;

const Container = styled.div`
  ${flexCenter}
  width: 100%;
  padding: 22px 40px;
  gap: 33px;
`;

const EmotionWrapper = styled.div`
  ${flexCenter}
  width: 80px;
  height: 100%;
  flex-shrink: 0;
`;
const InfoWrapper = styled.div`
  ${flexColumnCenter}
  height: 100%;
  gap: 10px;

  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkLightGray};
`;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;

  & > span.info-title {
    display: flex;
    align-items: center;
    width: 40px;
    height: 100%;
  }

  & > span.info-text {
    font-size: 16px;
    margin-left: 5px;
  }
`;
const InfoDataWrapper = styled.div`
  ${flexCenter}
  width: 120px;
  height: 100%;
  margin-left: 23px;
  & > span.satisfaction-standard {
    font-size: 12px;
    font-weight: 500;
    margin: 3px;
  }
`;
const InfoData = styled.div`
  display: block;
  text-align: center;

  height: 100%;
  width: 100%;

  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
  font-weight: 700;
  color: ${(props) => props.theme.colors.darkGray};

  // 길어질 경우 '...' 처리
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* 이전 UI (만족도 range 사용) */
// const EmotionText = styled.div`
//   width: 100%;
//   font-weight: 700;
//   color: #333331;
//   font-size: 16px;
//   margin-bottom: 10px;
// `;

// const RangeWrapper = styled.div`
//   width: 100%;
// `;

// const Info = styled.div`
//   ${flexColumnCenter}
//   width: 100%;
//   gap: 5px;
// `;

// const InfoItem = styled.div`
//   ${flexBetween}
//   width: 100%;
//   flex: 1;

//   & span.info-text {
//     font-size: 14px;
//     color: #9f9f9f;
//     font-weight: 300;
//   }

//   & span.info-price {
//     color: #333331;
//     font-size: 16px;
//     font-weight: 700;
//   }
// `;
