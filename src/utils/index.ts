import {
  parse,
  isSameDay,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
} from 'date-fns';

// #,##0 형식 formatter (숫자에 3자리씩 ',' 찍어주는 함수)
export const addCommasToNumber = (number: number | string): string => {
  if (number == undefined || number == null) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// #,##0 포맷된 string 또는 숫자를 다시 #,##0 으로 포맷
export const formatAmountNumber = (
  value: string,
  hasLimit: boolean = false,
  limit: number = 100000000,
): string => {
  /* case )
   * 1. input의 handleChanged에서 #,##0 포맷된 string을 전달받음
   * 2. 서버에서 넘어온 데이터는 숫자 형태의 string으로 넘어옴.
   */
  // 숫자만 포함된 값으로 변환
  let cleanedValue = value.replace(/[^0-9]/g, '');

  // 0으로 시작하지 않도록 제한
  if (cleanedValue.startsWith('0')) {
    cleanedValue = cleanedValue.replace(/^0+/, ''); // 0으로 시작할 경우 0->빈값으로 치환
  }

  // limit을 가지고 있다면, limit을 넘지 못하도록 제한 (제한 숫자로 바꿈)
  if (hasLimit && cleanedValue.length > 0) {
    const numericValue = parseInt(cleanedValue, 10); // 문자열을 정수로 변환
    if (numericValue > limit) {
      cleanedValue = limit.toString(); // 제한 값을 문자열로 변환
    }
  }

  return addCommasToNumber(cleanedValue);
};

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

export const convertToDateObject = (dateString: string, type: string = 'dash') => {
  if (!dateString) return new Date();
  if (type === 'dash') return parse(dateString, 'yyyy-MM-dd', new Date());
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

// Date 객체 -> 전달받은 날짜를 포함하여 90일 전까지의 Date배열을 return
export const getNinetyDaysDateObjArray = (date: Date) => {
  const startDate = subDays(date, 89); // 전달받은 날짜 포함이라 89일을 빼서 시작
  return eachDayOfInterval({ start: startDate, end: date });
};

// 날짜, 내용, 금액, 지출 여부를 글로 돌려주는 함수 (spendDate = `yyyy-MM-ddThh:mm:ss` 형태)
export const getSpendSumamryText = (
  spendDate: string,
  content: string,
  amount: string,
  regiesterType: string,
) => {
  return `${formatYMD(formatFromServer(spendDate))}, "${content}"에 ${addCommasToNumber(amount)}원 ${regiesterType === 'SPEND' ? '지출' : '절약'}`;
};

// 숫자 배열을 받으면, 각 항목이 전체에서 차지하는 비율 배열을 돌려준다.
export const calculatePercentages = (data: number[]): number[] => {
  const total = data.reduce((sum, value) => sum + value, 0);
  return data.map((value) => parseFloat(((value / total) * 100).toFixed(1)));
};
