import { EmotionKey, EmotionKeyWithNone, Register } from '..';

// 요약 타입
export type ExpenseSummaryType = {
  articleId: number;
  emotion: EmotionKey;
  satisfaction: number;
  content: string;
  amount: string;
  registerType: Register;
};

// 입력, 조회, 수정 폼 + 상세 조회 타입
export type ExpenseFormType = {
  content: string; // 소비 내용 (원래 물건)
  amount: string; // 금액 (절약 또는 지출한)
  spendDate: string; // 소비 날짜, 시간 (저장 시간 아님) -> 내가 서버에 보낼 땐 string 타입으로? Date로?
  event: string; // 사건
  thought: string; // 생각
  emotion: EmotionKeyWithNone; // 감정, 첫 입력 시 빈값이므로 빈값 허용, form에서 저장 시 빈값 예외처리 필요
  satisfaction: number; // 만족도
  reason: string; // 만족 이유
  improvements: string; // 개선점
  registerType: Register; // 지출 또는 소비 타입
  aiComment?: string; // ai 한마디
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
  SPEND: { text: '지출했어요' },
  SAVE: { text: '절약했어요' },
} as const);

export const getRegisterTypeText = (key: Register): string => {
  return RegisterTexts[key].text;
};
