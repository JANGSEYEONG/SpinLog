/* 인증 */
// 로그인 유형
export const UserStatus = {
  LoggedIn: 'LoggedIn',
  LoggedOut: 'LoggedOut',
  Demo: 'Demo',
} as const;
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];

/* 정보 */
// 환경설정 (내정보) 데이터
export const Genders = ['MALE', 'FEMALE'] as const;
export type Gender = (typeof Genders)[number];

// 환경설정(내정보)에서의 사용자 정보 form 타입
// 이를 사용하여 동적으로 UserFormType 정의
export type UserFormType = {
  budget: string;
  gender: Gender;
} & {
  [K in keyof typeof mbtiTypes]: (typeof mbtiTypes)[K];
};

/* MBTI */
// 각 MBTI 차원을 위한 타입 정의
type Extroversion = 'E';
type Introversion = 'I';
type Sensing = 'S';
type Intuition = 'N';
type Thinking = 'T';
type Feeling = 'F';
type Perceiving = 'P';
type Judging = 'J';

// 각 차원의 유니온 타입 정의
export type EI = Extroversion | Introversion;
export type NS = Sensing | Intuition;
export type TF = Thinking | Feeling;
export type PJ = Perceiving | Judging;

// 전체 MBTI 타입을 위한 타입
export type MBTI = `${EI}${NS}${TF}${PJ}`;

export type MbitFactor =
  | Extroversion
  | Introversion
  | Sensing
  | Intuition
  | Thinking
  | Feeling
  | Perceiving
  | Judging;

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
