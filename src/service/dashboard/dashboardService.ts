import type { Register } from '@models/index';

import axiosInstance from '../axios';
import type { DashboardDataType } from './types';

/* 대시보드 데이터 */
export const fetchDashboardData = async (
  selectDate: string,
  registerType: Register,
): Promise<DashboardDataType> => {
  try {
    const { data } = await axiosInstance.get(`/articles/dashboard`, {
      params: {
        selectDate,
        registerType,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchDashboardData : ' + error);
  }
};
