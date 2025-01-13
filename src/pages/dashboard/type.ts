// 대시보드 페이지 탭 구분
export const DASHBOARD_TAB = {
  SPEND: 'TAB_SPEND',
  SAVE: 'TAB_SAVE',
} as const;

export type DashboardTabOption = (typeof DASHBOARD_TAB)[keyof typeof DASHBOARD_TAB];
