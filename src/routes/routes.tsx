import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// dynamic import 오류 시 fetch 재시도
// import { lazyWithRetries } from './lazyWithRetries';

import App from '../App';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import MainPage from '../pages/main/MainPage';
import LoginPage from '../pages/login/LoginPage';
import ErrorPage from '../pages/error/ErrorPage';
import AuthPage from '../pages/auth/AuthPage';
import Loading from '@components/information/Loading';

import { PagePath } from '@models/navigation';

// 바로 로딩되지 않아도 되는 컴포넌트 lazy loading 추가
import ExpenseListViewPage from '../pages/expenseListView/ExpenseListViewPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AddExpensePage from '../pages/addExpense/AddExpensePage';
import ExpenseDetailViewPage from '../pages/expenseDetailView/ExpenseDetailViewPage';
import StatisticsPage from '../pages/statistics/StatisticsPage';
import SettingPage from '../pages/setting/SettingPage';

export const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true, // 하위에 다른 경로가 안붙을 때 보여줄 컴포넌트
            element: (
              <ProtectedRoute allowDemoMode={true}>
                <MainPage />
              </ProtectedRoute>
            ),
          },
          {
            path: PagePath.Login,
            element: <LoginPage />,
          },
          {
            path: PagePath.Dashboard,
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute allowDemoMode={true}>
                  <DashboardPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: PagePath.AddExpense,
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute allowDemoMode={true}>
                  <AddExpensePage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: PagePath.ExpenseListView,
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute allowDemoMode={true}>
                  <ExpenseListViewPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: PagePath.ExpenseDetailView,
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute allowDemoMode={true}>
                  <ExpenseDetailViewPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: PagePath.Statistics,
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <StatisticsPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: PagePath.Setting,
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute allowDemoMode={true}>
                  <SettingPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: PagePath.Auth,
            element: (
              <Suspense fallback={<Loading />}>
                <AuthPage />
              </Suspense>
            ),
          },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage isRootError={true} />,
      },
    ],
  },
]);
