import { addMonths, startOfMonth, subMonths } from 'date-fns';

import { useState } from 'react';

const useMonthNavigator = () => {
  // 현재 날짜 상태를 useState로 관리
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 이전 달로 이동
  const previousMonth = () => {
    const newCurrentDate = subMonths(currentDate, 1);

    // 이전달, 다음달 이동 시 선택 날짜를 1일로 변경 필요
    setCurrentDate(startOfMonth(newCurrentDate));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    const newCurrentDate = addMonths(currentDate, 1);

    // 이전달, 다음달 이동 시 선택 날짜를 1일로 변경 필요
    setCurrentDate(startOfMonth(newCurrentDate));
  };

  return {
    currentDate,
    setCurrentDate,
    previousMonth,
    nextMonth,
  };
};

export default useMonthNavigator;
