import type { EmotionKey, Register } from './common';

// 요약 타입
export type ExpenseSummaryType = {
  articleId: number;
  emotion: EmotionKey;
  satisfaction: number;
  content: string;
  amount: string;
  registerType: Register;
};

// 조회 필터 타입
export type ExpenseFilterType = {
  registerType: Register[];
  emotion: EmotionKey[];
  from: Date;
  to: Date;
  satisfaction: number[];
  word: string;
};

type RegisterDetail = {
  text: string;
};
type RegisterMap = Record<Register, RegisterDetail>;

const RegisterTexts: Readonly<RegisterMap> = Object.freeze({
  SPEND: { text: '지출' },
  SAVE: { text: '절약' },
} as const);

export const getRegisterTypeText = (key: Register): string => {
  return RegisterTexts[key].text;
};

// 넘겨받은 구분자로 registerType Text 전체를 합쳐서 돌려주는 함수
export const getCombineRegisterTypeText = (combineText: string): string => {
  return Object.values(RegisterTexts)
    .map((detail) => detail.text)
    .join(combineText);
};
