import styled from 'styled-components';
import { flexBetween, flexCenter } from '@styles/CommonStyles';

import { PrevBtn } from '@components/button';

import { formatYMD } from '@utils/index';
import { startOfMonth, endOfMonth } from 'date-fns';

type MonthNavigatorBtnProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  color?: string;
};
const MonthNavigatorBtn = ({
  currentDate,
  previousMonth,
  nextMonth,
  color = 'black',
}: MonthNavigatorBtnProps) => {
  const startDate: Date = startOfMonth(currentDate);
  const endDate: Date = endOfMonth(currentDate);

  return (
    <Wrapper color={color}>
      <BtnWrapper>
        <NavBtn color={color} onClick={previousMonth} />
      </BtnWrapper>
      <Text>{`${formatYMD(startDate)} - ${formatYMD(endDate)}`}</Text>
      <BtnWrapper>
        <NavBtn className="rotate-180" color={color} onClick={nextMonth} />
      </BtnWrapper>
    </Wrapper>
  );
};

export default MonthNavigatorBtn;

const Wrapper = styled.div<{ color: string }>`
  ${flexBetween}
  font-size: 16px;
  font-weight: 600;
  width: 240px;

  color: ${(props) => props.color};
`;
const BtnWrapper = styled.div`
  ${flexCenter}
  height: 100%;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 3px;
`;
const NavBtn = styled(PrevBtn)<{ color: string }>`
  width: 10px;
  height: 10px;
  color: ${(props) => props.color};
  stroke-width: 3;

  &:hover {
    color: ${(props) => props.color};
    transform: scale(1.2);
    stroke-width: 4;
  }

  &.rotate-180 {
    transform: rotate(180deg);
  }
  &.rotate-180:hover {
    transform: scale(1.2) rotate(180deg);
  }
`;

const Text = styled.span`
  ${flexCenter}
`;
