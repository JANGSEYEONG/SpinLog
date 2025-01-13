// 통계 페이지 탭 구분
export const STATISTICS_TAB = {
  MBTI: 'TAB_MBTI',
  GENDER: 'TAB_GENDER',
} as const;

export type StatisticsTabOption = (typeof STATISTICS_TAB)[keyof typeof STATISTICS_TAB];
