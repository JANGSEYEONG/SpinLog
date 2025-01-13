import type { EmotionKeyWithNone, Register } from '@models/common';
import type { ExpenseSummaryType } from '@models/expense';

// 입력, 조회, 수정 폼 + 상세 조회 타입
export type ExpenseDetailDataType = {
  content: string; // 소비 내용 (원래 물건)
  emotion: EmotionKeyWithNone; // 감정, 첫 입력 시 빈값이므로 빈값 허용, form에서 저장 시 빈값 예외처리 필요
  amount: string; // 금액 (절약 또는 지출한), string인 이유 : '#,##0' 형태로 관리
  satisfaction: number; // 만족도
  registerType: Register; // 지출 또는 소비 타입
  spendDate: string; // 소비 날짜, 시간 (저장 시간 아님) -> 내가 서버에 보낼 땐 string 타입으로? Date로?
  event: string; // 사건
  thought: string; // 생각
  reason: string; // 만족 이유
  improvements: string; // 개선점
  aiComment?: string; // ai 한마디
};

// AIComment 응답 데이터 타입
export type ExpenseAICommentType = {
  content: string;
};

// 소비 리스트 응답 타입, 최대 10개까지 가지고있음
export type ExpenseListDataType = {
  nextPage: boolean;
  spendList: ExpenseSummaryType[];
};
