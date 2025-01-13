import { ChevronIcon } from '@components/icon';
import { REGISTER } from '@models/common';
import { getRegisterTypeText } from '@models/expense';
import type { MainMonthSpendType } from '@service/main/types';
import { flexBetween, flexCenter, flexColumnCenter } from '@styles/CommonStyles';
import { compareYMDString, formatYM } from '@utils/dateUtils';
import { addCommasToNumber } from '@utils/numberUtils';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import styled from 'styled-components';

import { useEffect, useReducer, useState } from 'react';

// 현재 날짜를 넘겨받는다.
type CalendarProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  data: MainMonthSpendType[];
};

const Calendar = ({ currentDate, setCurrentDate, data }: CalendarProps) => {
  // 현재 달력에서 보여 줄 상태들 정의
  const [showWeekOnly, toggleWeekView] = useReducer((state) => !state, false); // 주.월 달력 상태 추가
  const currentMonth = startOfMonth(currentDate);

  // 초기 렌더링 시 필요한 오늘 날짜 데이터가 있는지 찾는다.
  const todayData = data.find((x) => compareYMDString(x.date, currentDate));
  let todaySpend: number = 0;
  let todaySave: number = 0;
  if (todayData) {
    todayData.daySpend > 0 && (todaySpend = todayData.daySpend);
    todayData.daySave > 0 && (todaySave = todayData.daySave);
  }
  const [daySpend, setDaySpend] = useState<number>(todaySpend);
  const [daySave, setDaySave] = useState<number>(todaySave);

  useEffect(() => {
    const todayData = data.find((x) => compareYMDString(x.date, currentDate));
    if (todayData) {
      setDaySpend(todayData.daySpend);
      setDaySave(todayData.daySave);
    } else {
      // 데이터가 없는 경우, 라벨 0으로 초기화
      setDaySpend(0);
      setDaySave(0);
    }
  }, [currentDate, data]);

  // 월요일 시작 설정
  const startDay = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const endDay = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

  const eachDayOfInterval = (start: Date, end: Date) => {
    const days = [];
    let day = start;
    while (day <= end) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }
    return days;
  };

  const days = eachDayOfInterval(startDay, endDay);

  const getDaysOfSelectedWeek = () => {
    const startSelectedWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval(startSelectedWeek, endOfWeek(startSelectedWeek, { weekStartsOn: 1 }));
  };

  const daysToShow = showWeekOnly ? getDaysOfSelectedWeek() : days;

  const handleDayClick = (day: Date) => {
    // 이번달 날짜가 아니면 return
    if (!isSameMonth(day, currentMonth)) return;

    setCurrentDate(day);
  };

  // 넘겨받은 데이터와 보여줄 날짜를 바인딩
  const bindDataDaysToShow = daysToShow.map((dayToShow) => {
    // data에서 날짜가 같은 객체를 찾는다.
    const dataEntry = data.find((x) => compareYMDString(x.date, dayToShow));

    // 같은 날짜가 있다면 daySpend,dataEntry를 넣어주고 없다면 0으로 채운다.
    if (dataEntry) {
      return { date: dayToShow, daySpend: dataEntry.daySpend, daySave: dataEntry.daySave };
    } else {
      return { date: dayToShow, daySpend: 0, daySave: 0 }; // 데이터가 없는 경우 기본값을 설정
    }
  });

  return (
    <Container>
      <TitleWrapper>
        소비 달력
        <Label>
          <LabelItem className="minus">{getRegisterTypeText(REGISTER.SPEND)}</LabelItem>
          <LabelItem>{getRegisterTypeText('SAVE')}</LabelItem>
        </Label>
      </TitleWrapper>
      <WeekInfo>
        {`${formatYM(currentDate, 'word')} ${Math.ceil(
          (days.findIndex((d) => d.toDateString() === currentDate.toDateString()) + 1) / 7,
        )}주차`}
      </WeekInfo>
      <CalendarGrid>
        {daysOfWeek.map((day, index) => (
          <DayHeader key={index}>{day}</DayHeader>
        ))}
        {bindDataDaysToShow.map((day, index) => {
          const same: boolean = isSameMonth(day.date, currentMonth);
          return (
            <CalendarDay
              key={index}
              className={`${same ? '' : 'faded'}${isToday(day.date) ? ' bold' : ''}${
                currentDate.toDateString() === day.date.toDateString() ? ' selected' : ''
              }${day.daySpend !== 0 && same ? ' spend' : ''}${
                day.daySave !== 0 && same ? ' save' : ''
              }`}
              onClick={() => handleDayClick(day.date)}>
              {format(day.date, 'd')}
            </CalendarDay>
          );
        })}
      </CalendarGrid>
      {showWeekOnly && (
        <ExpenseDetailWrapper>
          {(daySpend > 0 || daySave > 0) && (
            <ExpenseDetail>
              {daySpend > 0 && (
                <Detail className="spend">
                  {getRegisterTypeText(REGISTER.SPEND)}:
                  <span>{`-${addCommasToNumber(daySpend)}원`}</span>
                </Detail>
              )}
              {daySave > 0 && (
                <Detail>
                  {getRegisterTypeText(REGISTER.SAVE)}:
                  <span>{`+${addCommasToNumber(daySave)}원`}</span>
                </Detail>
              )}
            </ExpenseDetail>
          )}
        </ExpenseDetailWrapper>
      )}
      <ToggleButton onClick={toggleWeekView}>
        <Arrow className={showWeekOnly ? 'rotate-270' : 'rotate-90'} />
      </ToggleButton>
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 15px;

  position: relative; // 토글 버튼 위치 잡기용

  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  ${flexBetween}
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkGray};
  width: 100%;

  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;
const Label = styled.div`
  ${flexCenter}
  font-size: 12px;
  gap: 13px;
`;

const LabelItem = styled.div`
  position: relative;
  padding-left: 13px; // 텍스트와 원 사이에 간격을 주기 위함

  &::before {
    content: '';
    position: absolute;
    left: 0; // 왼쪽 끝에서 시작
    top: 50%; // 상위 요소의 중간 높이에 위치
    transform: translateY(-50%); // Y축으로 50% 이동하여 정중앙에 배치
    width: 6px; // 원의 너비
    height: 6px; // 원의 높이
    background-color: ${(props) => props.theme.colors.lightBlack};
    border-radius: 50%; // 원형으로 만들기
    display: inline-block; // 인라인 블록 요소로 설정
  }
  &.minus::before {
    background-color: ${(props) => props.theme.colors.lightRed};
  }
`;

const WeekInfo = styled.h1`
  font-size: 15px;
  font-weight: 600;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); // 7개의 칼럼으로 균등 분할
  gap: 10px;

  width: 100%; // 너비는 부모 요소에 맞춤
  margin: 0 auto; // 중앙 정렬

  padding-left: 5px;
  padding-right: 5px;

  position: relative;
`;

const DayHeader = styled.div`
  padding: 10px;
  text-align: center;
  height: 20px; // 고정 높이 설정

  color: ${(props) => props.theme.colors.gray2};
  font-weight: 300;
  font-size: 13px;
`;

const CalendarDay = styled.div`
  ${flexCenter}
  background-color:${(props) => props.theme.colors.white};
  position: relative; // 작은 원들을 위한 포지셔닝

  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkLightGray2};

  &.faded {
    color: ${(props) => props.theme.colors.gray};
  }

  &.bold {
    color: ${(props) => props.theme.colors.black};
    font-weight: 800;
  }

  &.selected {
    background-color: ${(props) => props.theme.colors.darkGray}; // 선택된 날짜 배경색
    color: ${(props) => props.theme.colors.white}; // 선택된 날짜 글씨색
    border-radius: 50%; // 동그란 형태
    font-size: 16px;
    font-weight: 700;
  }

  // 소비
  &.spend::after {
    content: '';
    position: absolute;
    bottom: 0px; // 날짜 아래로 위치 조정
    width: 5px;
    height: 5px;
    background-color: ${(props) => props.theme.colors.lightRed};
    border-radius: 50%;
  }

  // 절약
  &.save::after {
    content: '';
    position: absolute;
    bottom: 0px; // 날짜 아래로 위치 조정
    width: 5px;
    height: 5px;
    background-color: ${(props) => props.theme.colors.lightBlack};
    border-radius: 50%;
  }

  &.save.spend::after {
    left: 50%;
    transform: translateX(-50%) translateX(-5px); // 가운데 정렬 조정
    background-color: ${(props) => props.theme.colors.lightRed};
    border-radius: 50%;
    box-shadow: 9.5px 0 0 ${(props) => props.theme.colors.lightBlack}; // 옆으로 작은 원 하나 더 추가
  }

  // 선택된 날짜일 경우 좀 더 아래에 뜸
  &.selected.both::after,
  &.selected.spend::after,
  &.selected.save::after {
    bottom: -8px; // 날짜 아래로 위치 조정
  }
`;

const ToggleButton = styled.button`
  ${flexCenter}

  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);

  width: 30px;
  height: 30px;
  background-color: #f3f3f3;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.shadows.around};
`;

const Arrow = styled(ChevronIcon)`
  width: 16px;
  height: 16px;
  color: ${(props) => props.theme.colors.darkLightGray};
`;

const ExpenseDetailWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 23px;
  padding-left: 14px;
  margin-top: 3px;
`;

const ExpenseDetail = styled.div`
  ${flexCenter}
  height: 100%;
  background-color: #eeeeee;
  border-radius: 3px;
  padding: 0 14px 0 14px;
  gap: 15px;
`;

const Detail = styled.div`
  font-size: 11px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.darkGray};
  &.spend {
    color: ${(props) => props.theme.colors.lightRed};
  }

  & > span {
    margin-left: 3px;
    font-weight: 500;
  }
`;
