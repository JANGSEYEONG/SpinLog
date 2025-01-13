import { ChevronIcon } from '@components/icon';
import { flexBetween, flexCenter } from '@styles/CommonStyles';
import { formatYMD } from '@utils/dateUtils';
import { endOfMonth, startOfMonth } from 'date-fns';
import styled from 'styled-components';

type MonthNavigatorButtonProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  color?: string;
};
const MonthNavigatorButton = ({
  currentDate,
  previousMonth,
  nextMonth,
  color = 'black',
}: MonthNavigatorButtonProps) => {
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

export default MonthNavigatorButton;

const Wrapper = styled.div<{ $color: string }>`
  ${flexBetween}
  font-size: 16px;
  font-weight: 600;
  width: 230px;
  margin-left: 8px;
  color: ${(props) => props.$color};
`;
const NavBtn = styled(ChevronIcon)<{ color: string }>`
  width: 20px;
  height: 20px;
  color: ${(props) => props.color};
`;

const Text = styled.span`
  ${flexCenter}
`;
