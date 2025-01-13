import axiosInstance from '@service/axios';

import type { MainDataType, MainSubDataType } from './types';

/**
 * 메인 페이지 데이터 (예산, 달력, 요약 정보)
 * @param selectDate 조회하고자 하는 날짜
 * @param isSelectDay 달력에서 날짜를 선택한 것인지 여부
 * @returns
 */
export const fetchMainData = async <T extends MainDataType | MainSubDataType>(
  selectDate: string,
  isSelectDay: boolean = false,
): Promise<T> => {
  try {
    const { data } = await axiosInstance.get('/articles/main', {
      params: {
        selectDate,
        isSelectDay: isSelectDay,
      },
    });
    return data.data as T;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchMainData : ' + error);
  }
};
