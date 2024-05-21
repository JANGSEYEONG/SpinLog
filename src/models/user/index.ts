import { EI, Gender, NS, PJ, TF } from '..';

// 환경설정(내정보)에서의 사용자 정보 form 타입
export type UserFormType = {
  budget: string; // #,##0 형식 표기
  gender: Gender;
  EI: EI;
  NS: NS;
  TF: TF;
  PJ: PJ;
};
