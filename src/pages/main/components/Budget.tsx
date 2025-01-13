import { ChevronIcon } from '@components/icon';
import { getRegisterTypeText } from '@models/expense';
import { PagePath } from '@models/navigation';
import type { MainBudgetType } from '@service/main/types';
import { absoluteCenter, flexBetween, flexCenter, flexColumnCenter } from '@styles/CommonStyles';
import { addCommasToNumber } from '@utils/numberUtils';
import styled, { keyframes } from 'styled-components';

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type BudgetProps = MainBudgetType;

const Budget = ({ monthBudget, monthSpend, monthSave }: BudgetProps) => {
  const navigate = useNavigate();
  const { isBudgetZero, remainPrice } = useMemo(() => {
    return {
      isBudgetZero: !monthBudget || monthBudget === 0, // budget이 없거나 0인 케이스 둘 다 예산 없는 것으로 처리.
      remainPrice: Math.floor(monthBudget - monthSpend), // 남은 예산 (음수일 수 있음)
    };
  }, [monthBudget, monthSpend]);

  // 1. 남은 예산 텍스트 : 예산이 없을 경우(= 0일 경우), 초과일 경우, 남은 경우 구분
  const remainPriceText: string = useMemo(() => {
    if (isBudgetZero) return '예산을 설정해주세요.';
    if (remainPrice < 0) {
      return `${addCommasToNumber(Math.abs(remainPrice))} 원 초과`;
    } else {
      return `${addCommasToNumber(remainPrice)} 원 남음`;
    }
  }, [isBudgetZero, remainPrice]);

  // 2. 권장 지출 텍스트 : 예산이 없거나 초과일 경우, 남은 경우 구분
  // 예산 0원일 때, 초과했을 때 권장지출 다 0원
  const recommendSpend: number = useMemo(() => {
    return isBudgetZero || remainPrice < 0 ? 0 : Math.floor(monthBudget / 30);
  }, [isBudgetZero, monthBudget, remainPrice]);

  // 3. 막대 그래프 퍼센트 비율 및 텍스트
  const percent = useMemo(() => {
    // budget이 0원이 아닌 경우에만 계산 진행
    return !isBudgetZero ? Math.ceil((monthSpend / monthBudget) * 100) : 0;
  }, [isBudgetZero, monthSpend, monthBudget]);

  const percentText: string = useMemo(() => {
    // 예산 0원일 때 그래프 : 0%, 초과일 때 100+%;
    return percent > 100 ? '100+%' : `${percent}%`; // 100% 초과 시 '100+%' 로 표시
  }, [percent]);

  return (
    <>
      <Remain>
        <RemainDetail>
          <span className="remain-title">한 달 예산</span>
          <span className="remain-price">{remainPriceText}</span>
          <span className="remain-recommend">
            목표 달성을 위한 하루 권장 지출 : {addCommasToNumber(recommendSpend)}원
          </span>
        </RemainDetail>
        <GoSettingWrapper>
          <GoSetting
            className="rotate-180"
            onClick={() => {
              navigate(PagePath.Setting);
            }}
          />
        </GoSettingWrapper>
      </Remain>
      <Bar>
        <BarDetail $percent={`${percent}%`}>
          <span className="bar-mark"></span>
          <span className="bar-percent"></span>
          <span className="bar-text">{percentText}</span>
        </BarDetail>
      </Bar>
      <Info>
        <InfoItem>
          <span className="info-text">예산</span>
          <span className="info-price">{addCommasToNumber(monthBudget)}원</span>
        </InfoItem>
        <InfoItem>
          <span className="info-text">{getRegisterTypeText('SPEND')}</span>
          <span className="info-price">-{addCommasToNumber(monthSpend)}원</span>
        </InfoItem>
        <InfoItem>
          <span className="info-text">{getRegisterTypeText('SAVE')}</span>
          <span className="info-price">{addCommasToNumber(monthSave)}원</span>
        </InfoItem>
      </Info>
    </>
  );
};

export default Budget;

// 예산 영역
const Remain = styled.div`
  ${flexCenter}
  width: 100%;
  height: 30%;
  position: relative;
`;
const RemainDetail = styled.div`
  ${flexColumnCenter}
  align-items: flex-start;
  width: 100%;
  height: 100%;
  gap: 8px;

  & span.remain-title {
    color: ${(props) => props.theme.colors.darkGray};
    font-size: 14px;
    font-weight: 400;
  }
  & span.remain-price {
    color: ${(props) => props.theme.colors.lightBlack};
    font-size: 24px;
    font-weight: 700;
  }
  & span.remain-recommend {
    color: ${(props) => props.theme.colors.darkLightGray};
    font-size: 12px;
    font-weight: 400;
  }
`;

const GoSettingWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: -5px;
`;

const GoSetting = styled(ChevronIcon)`
  width: 25px;
  height: 25px;
  color: ${(props) => props.theme.colors.gray2};
`;

// 막대 그래프 영역
const Bar = styled.div`
  ${flexColumnCenter}
  justify-content: flex-end;
  width: 100%;
  height: 20%;
  padding: 5px;

  font-size: 14px;
  color: ${(props) => props.theme.colors.lightBlack};
`;

// @keyframes를 사용하여 애니메이션 정의
const fillAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: var(--target-width); // CSS 변수를 사용
  }
`;

const BarDetail = styled.div<{ $percent: string }>`
  background-color: ${(props) => props.theme.colors.lightGray3};
  height: 25px;
  width: 100%;
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  & span.bar-mark {
    ${absoluteCenter}
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.white};
    width: 10px;
    height: 10px;
    z-index: 1;
  }

  & span.bar-percent {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;

    background-color: ${(props) => props.theme.colors.lightGreen};
    border-radius: 0 6px 6px;

    width: 0%; // 초기 너비 설정
    --target-width: ${(props) => props.$percent}; // CSS 변수로 퍼센트 설정
    animation: ${fillAnimation} 1s ease-in-out forwards; // 애니메이션 적용
    animation-delay: 0.1s;
  }

  & span.bar-text {
    ${flexCenter}
    height:100%;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.darkLightGray2};
  }
`;

// 예산, 지출, 절약 영역
const Info = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 35%;
  gap: 5px;
  padding-left: 5px;
  padding-right: 5px;
`;

const InfoItem = styled.div`
  ${flexBetween}
  width: 100%;
  flex: 1;

  & span.info-text {
    font-size: 14px;
    color: ${(props) => props.theme.colors.darkLightGray};
    font-weight: 300;
  }

  & span.info-price {
    color: ${(props) => props.theme.colors.lightBlack};
    font-size: 16px;
    font-weight: 700;
  }
`;
