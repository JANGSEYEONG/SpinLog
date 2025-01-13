import type { UserFormType } from '@models/user';

import axiosInstance from './../axios';
import type { UserSettingDataType } from './types';

/* 유저 정보 (환경설정) */
export const fetchUserData = async (): Promise<UserSettingDataType> => {
  try {
    const { data } = await axiosInstance.get(`/users/details`);
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchUserData : ' + error);
  }
};

/* 유저 정보 저장 (환경설정) */
export const saveUserData = async (userData: UserFormType) => {
  try {
    const { data } = await axiosInstance.post('/users/details', {
      mbti: `${userData.EI}${userData.NS}${userData.TF}${userData.PJ}`,
      gender: userData.gender,
      budget: userData.budget,
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] saveUserData : ' + error);
  }
};

/* 로그아웃 (환경설정) */
export const logoutUser = async () => {
  try {
    const { data } = await axiosInstance.post('/users/logout');
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] logoutUser : ' + error);
  }
};
