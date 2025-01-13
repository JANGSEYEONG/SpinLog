import type { ExpenseFilterType } from '@models/expense';
import { fetchExpensesByCondition } from '@service/expense/expenseService';
import type { ExpenseListDataType } from '@service/expense/types';
import { useDemoStore } from '@stores/demoStore';

import { useInfiniteQuery } from 'react-query';

const useExpenseListData = (condition: ExpenseFilterType, isDemoMode: boolean) => {
  // 무한 스크롤 구현, 데이터 정렬은 최신순 고정(서버에서 그렇게 보내줌)
  const {
    data: expensesData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<ExpenseListDataType>(
    ['fetchExpensesByConditionQueryKey', condition],
    ({ pageParam = 1 }) => fetchExpensesByCondition(pageParam, condition),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.nextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      onSuccess: (data) => {
        console.log('ExpensesByCondition Fetched data:', data);
      },
      onError: (error) => {
        alert('다시 시도해주세요.');
        console.error('Error fetching data:', error);
      },
      enabled: !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // [체험하기] 조건에 맞는 소비 데이터 목록 가져오기
  const demoExpensesData = useDemoStore((state) => state.getDemoExpensesByCondition)(condition);

  // demoData일 경우 useInfiniteQuery의 InfiniteData 타입 형식 맞춰주기
  return {
    expensesData: isDemoMode ? { pageParams: [], pages: [demoExpensesData] } : expensesData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};

export default useExpenseListData;
