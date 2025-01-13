// import ErrorPage from '../pages/error/ErrorPage';
// import AuthPage from '../pages/auth/AuthPage';
import Loading from '@components/information/Loading';
import { PagePath } from '@models/navigation';

import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Layout from '../components/layout/Layout';
// import MainPage from '../pages/main/MainPage';
import LoginPage from '../pages/login/LoginPage';
// dynamic import 오류 시 fetch 재시도
import { lazyWithRetries } from './lazyWithRetries';
import ProtectedRoute from './protectedRoute/ProtectedRoute';

// 바로 로딩되지 않아도 되는 컴포넌트 lazy loading 추가
const MainPage = lazyWithRetries(() => import('../pages/main/MainPage'));
// import MainPage from '../pages/main/MainPage';

const AuthPage = lazyWithRetries(() => import('../pages/auth/AuthPage'));
const ErrorPage = lazyWithRetries(() => import('../pages/error/ErrorPage'));

const ExpenseListViewPage = lazyWithRetries(
  () => import('../pages/expenseListView/ExpenseListViewPage'),
);
const DashboardPage = lazyWithRetries(() => import('../pages/dashboard/DashboardPage'));
const AddExpensePage = lazyWithRetries(() => import('../pages/addExpense/AddExpensePage'));
const ExpenseDetailViewPage = lazyWithRetries(
  () => import('../pages/expenseDetailView/ExpenseDetailViewPage'),
);
const StatisticsPage = lazyWithRetries(() => import('../pages/statistics/StatisticsPage'));
const SettingPage = lazyWithRetries(() => import('../pages/setting/SettingPage'));
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
              <Suspense fallback={<Loading />}>
                <ProtectedRoute allowDemoMode={true}>
                  <MainPage />
                </ProtectedRoute>
              </Suspense>
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
            element: (
              <Suspense fallback={<Loading />}>
                <ErrorPage />
              </Suspense>
            ),
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
