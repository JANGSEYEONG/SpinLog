import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import RootLayout from '../components/layout/RootLayout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';

import LoginPage from '../pages/login/LoginPage';
import MainPage from '../pages/main/MainPage';
import SettingPage from '../pages/setting/SettingPage';
import ErrorPage from '../pages/error/ErrorPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            index: true, // 하위에 다른 경로가 안붙을 때 보여줄 컴포넌트
            element: (
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/setting',
            element: (
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
