export const PagePath = {
  Main: '/',
  Login: '/login',
  Dashboard: '/dashboard',
  AddExpense: '/add',
  ExpenseListView: '/expense',
  ExpenseDetailView: '/expense/:id',
  Statistics: '/statistics',
  Setting: '/setting',
  Auth: '/auth',
} as const;

export const getExpenseDetailViewPath = (id: number | string) => {
  return `/expense/${id}`;
};
