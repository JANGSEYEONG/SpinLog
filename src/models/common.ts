// 소비 등록 종류 (지출 / 절약)
export const REGISTER = {
  SPEND: 'SPEND',
  SAVE: 'SAVE',
} as const;

export const Registers = [REGISTER.SPEND, REGISTER.SAVE] as const;

export type Register = (typeof Registers)[number];

// 감정 종류
export const EMOTION = {
  ANNOYED: 'ANNOYED',
  NERVOUS: 'NERVOUS',
  LONELY: 'LONELY',
  TIRED: 'TIRED',
  DEPRESSED: 'DEPRESSED',
  SAD: 'SAD',
  SORRY: 'SORRY',
  EXCITED: 'EXCITED',
  FLUTTER: 'FLUTTER',
  PROUD: 'PROUD',
  SHY: 'SHY',
  EVADED: 'EVADED',
} as const;

export const EmotionKeys = [
  EMOTION.ANNOYED,
  EMOTION.NERVOUS,
  EMOTION.LONELY,
  EMOTION.TIRED,
  EMOTION.DEPRESSED,
  EMOTION.SAD,
  EMOTION.SORRY,
  EMOTION.EXCITED,
  EMOTION.FLUTTER,
  EMOTION.PROUD,
  EMOTION.SHY,
  EMOTION.EVADED,
] as const; // 'as const'를 사용하여 리터럴 타입으로 배열을 고정

// 타입을 배열에서 추출
export type EmotionKey = (typeof EmotionKeys)[number];

// 입력 초기 시, 감정 미선택으로 빈 문자 허용
export type EmotionKeyWithNone = EmotionKey | '';

// 감정 기본값
export const DEFAULT_EMOTION = EMOTION.EVADED;
