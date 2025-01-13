import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getMonth,
  isSameDay,
  isSameYear,
  parse,
  parseISO,
  startOfMonth,
  subDays,
} from 'date-fns';

// Date 객체 -> yyyyMMdd String
export const formatYMD = (date: Date, type: string = 'period'): string => {
  if (type === 'period') return format(date, 'yyyy.MM.dd');
  if (type === 'word') return format(date, 'yyyy년 MM월 dd일');
  if (type === 'dash') return format(date, 'yyyy-MM-dd');
  if (type === 'none') return format(date, 'yyyyMMdd');
  return '';
};

// Date 객체 -> yyyyMM String
export const formatYM = (date: Date, type: string = 'period'): string => {
  if (type === 'period') return format(date, 'yyyy.MM');
  if (type === 'word') return format(date, 'yyyy년 MM월');
  if (type === 'dash') return format(date, 'yyyy-MM');
  if (type === 'none') return format(date, 'yyyyMM');
  return '';
};

// Date 객체 -> Md String
export const formatMD = (date: Date, type: string = 'period'): string => {
  if (type === 'period') return format(date, 'M.d');
  if (type === 'word') return format(date, 'M월 d일');
  if (type === 'dash') return format(date, 'M-d');
  if (type === 'none') return format(date, 'M-d');
  return '';
};

// 'yyyyMMdd' 형태의 문자열과 Date 객체를 비교하여 같은 년/월/일인지 돌려주는 함수
export const compareYMDString = (dateString: string, date: Date, format: string = 'yyyyMMdd') => {
  // 문자열 날짜를 Date 객체로 변환
  const dateFromString = parse(dateString, format, new Date());

  // 비교할 Date 객체
  const areSameDay = isSameDay(dateFromString, date);

  return areSameDay;
};

// 'yyyyMMdd' 형태의 문자열과 Date 객체를 비교하여 같은 년/월인지 돌려주는 함수
export const compareYMString = (dateString: string, date: Date, format: string = 'yyyyMMdd') => {
  // 문자열 날짜를 Date 객체로 변환
  const dateFromString = parse(dateString, format, new Date());

  return isSameYear(dateFromString, date) && getMonth(dateFromString) === getMonth(date);
};

// 'yyyy-MM-dd' 형태의 문자열을 date 객체로 돌려주는 함수
export const convertToDateObject = (dateString: string, type: string = 'dash'): Date => {
  if (!dateString) return new Date();
  if (type === 'dash') return parse(dateString, 'yyyy-MM-dd', new Date());
  return new Date();
};

// 서버에 보낼 때 날짜 형식 정의 `yyyy-MM-ddThh:mm:ss`
export const formatToServer = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

// 서버서 받을 때 날짜 형식 정의 `yyyy-MM-ddThh:mm:ss` -> Date 객체로 변환
export const formatFromServer = (dateString: string) => {
  if (!dateString) return new Date();
  return parseISO(dateString);
};

// Date 객체 -> 해당 월의 1일~말일의 Date 객체로 변환
export const getTargetMonthDateObjArray = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

// Date 객체 -> 전달받은 날짜를 포함하여 30일 전까지의 Date배열을 return
export const getThirtyDaysDateObjArray = (date: Date) => {
  const startDate = subDays(date, 29); // 전달받은 날짜 포함이라 29일을 빼서 시작
  return eachDayOfInterval({ start: startDate, end: date });
};
