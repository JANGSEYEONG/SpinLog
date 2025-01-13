import { EI, Gender, NS, PJ, TF } from '..';

// 로그인 유형
export const UserStatus = {
  LoggedIn: 'LoggedIn',
  LoggedOut: 'LoggedOut',
  Demo: 'Demo',
} as const;

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

// MBTI 치수에 해당하는 유형들을 연결
const mbtiTypes = {
  EI: {} as EI,
  NS: {} as NS,
  TF: {} as TF,
  PJ: {} as PJ,
};

export const mbtiKeys: (keyof typeof mbtiTypes)[] = Object.keys(
  mbtiTypes,
) as (keyof typeof mbtiTypes)[];

// 환경설정(내정보)에서의 사용자 정보 form 타입
// 이를 사용하여 동적으로 UserFormType 정의
export type UserFormType = {
  budget: string;
  gender: Gender;
} & {
  [K in keyof typeof mbtiTypes]: (typeof mbtiTypes)[K];
};
