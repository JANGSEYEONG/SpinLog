import { CURRENT_VERSION } from '@stores/storeConfig';

import { type DemoStoreStateType, type DemoStoreType, isValidDemoStore } from './types';

// 상태 초기화
export const initDemoState = (): DemoStoreStateType => ({
  userSettings: {
    // email, mbti, gender은 체험하기 사용자가 사용할 수 없는 데이터이나, 데이터 타입 관리 편의상 임의의 값을 지정함
    email: 'demo',
    mbti: 'ISTP',
    gender: 'MALE',
    budget: 0,
  },
  demoExpenses: [],
  nextArticleId: 0,
});

export const initDemoExpenses = (set: (fn: (state: DemoStoreType) => void) => void) => {
  set(() => initDemoState());
};

// store 버전 변경 시 demo data 초기화
export const migrateDemoStore = (
  persistedState: unknown,
  version: number | undefined,
): DemoStoreStateType => {
  // unknown 타입을 타입 가드 `isValidDemoStore`를 사용해 타입 검증
  if (version === undefined || version < CURRENT_VERSION || !isValidDemoStore(persistedState)) {
    // 버전이 바뀌었으면 초기 상태를 반환
    return initDemoState();
  }
  // 기존 상태를 유지
  return persistedState;
};
