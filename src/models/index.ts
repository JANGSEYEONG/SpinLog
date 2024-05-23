export const Registers = ['SPEND', 'SAVE'] as const;

export type Register = (typeof Registers)[number];

export const EmotionKeys = [
  'ANNOYED',
  'NERVOUS',
  'LONELY',
  'TIRED',
  'DEPRESSED',
  'SAD',
  'SORRY',
  'EXCITED',
  'FLUTTER',
  'PROUD',
  'SHY',
  'EVADED',
] as const; // 'as const'를 사용하여 리터럴 타입으로 배열을 고정

// 타입을 배열에서 추출
export type EmotionKey = (typeof EmotionKeys)[number];

// 입력 초기 시, 감정 미선택으로 빈 문자 허용
export type EmotionKeyWithNone = EmotionKey | '';

// 환경설정 (내정보) 데이터
export const Genders = ['MALE', 'FEMALE'] as const;
export type Gender = (typeof Genders)[number];

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
