import styled from 'styled-components';
import { flexBetween, flexCenter } from '@styles/CommonStyles';

import { formatYMD } from '@utils/dateUtils';
import { startOfMonth, endOfMonth } from 'date-fns';
import { PrevIcon } from '@components/icon';

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
    <Wrapper $color={color}>
      <NavBtn color={color} onClick={previousMonth} />
      <Text>{`${formatYMD(startDate)} - ${formatYMD(endDate)}`}</Text>
      <NavBtn className="rotate-180" color={color} onClick={nextMonth} />
    </Wrapper>
  );
};

export default MonthNavigatorBtn;

const Wrapper = styled.div<{ $color: string }>`
  ${flexBetween}
  font-size: 16px;
  font-weight: 600;
  width: 230px;
  margin-left: 8px;
  color: ${(props) => props.$color};
`;
const NavBtn = styled(PrevIcon)<{ color: string }>`
  width: 15px;
  height: 15px;
  color: ${(props) => props.color};
`;

const Text = styled.span`
  ${flexCenter}
`;
