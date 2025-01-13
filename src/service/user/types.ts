import type { Gender, MBTI } from '@models/user';

export type UserSettingDataType = {
  email: string;
  mbti: MBTI;
  gender: Gender;
  budget: number; // 서버에서는 숫자 형태로 받고, 클라이언트에서는 문자열로 관리
};
