import { useAuthStore } from '@stores/authStore';
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://www.api-spinlog.shop/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 요청이 성공적으로 완료되면 응답 반환
    return response;
  },
  (error) => {
    // 401 오류가 발생했을 때의 처리 : 인증되지 않은 사용자의 요청
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().setLogoutState();
      window.location.href = '/login';
      alert('로그아웃 되었습니다.');
    }
    // 이외의 오류는 다시 throw 하여 호출자에게 전달
    return Promise.reject(error);
  },
);

export default axiosInstance;
