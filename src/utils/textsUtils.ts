import type { Register } from '@models/common';
import { getRegisterTypeText } from '@models/expense';

import { formatFromServer, formatYMD } from './dateUtils';
import { addCommasToNumber } from './numberUtils';

// 날짜, 내용, 금액, 지출 여부를 글로 돌려주는 함수 (spendDate = `yyyy-MM-ddThh:mm:ss` 형태)
export const getSpendSumamryText = (
  spendDate: string,
  content: string,
  amount: string,
  registerType: Register,
) => {
  return `${formatYMD(formatFromServer(spendDate))}, "${content}"에 ${addCommasToNumber(amount)}원 ${getRegisterTypeText(registerType)}`;
};
