import styled, { css } from 'styled-components';
import { SearchBtn, PrevBtn, FilterBtn } from '@components/button';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

import Background from '@components/background';
import {
  flexBetween,
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
} from '@styles/CommonStyles';

import { endOfMonth, startOfMonth } from 'date-fns';
import { cloneDeep } from 'lodash';

import {
  getRegisterTypeText,
  type ExpenseFilterType,
  type ExpenseSummaryType,
} from '@models/expense';

import SlideModal from '@components/modal/SlideModal';
import FilterPopup from './components/FilterPopup';
import ExpenseSummary from '@components/expense/ExpenseSummary';
import { EmotionKeys, Registers } from '@models/index';
import { formatYMD } from '@utils/index';
import { getEmotionText } from '@models/emotion';
import { useInfiniteQuery } from 'react-query';
import { fetchExpensesByCondition } from '@api/get';
import Spinner from '@components/information/Spinner';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  const [showBackground, setShowBackground] = useState<boolean>(false);
  useEffect(() => {
    setShowBackground(true);
    return () => {
      setShowBackground(false);
    };
  }, []);

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            centerContent={
              <TopNavigation.TopBar.CenterTitle style={{ color: '#ffffff' }}>
                내역 조회
              </TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
      <BottomNavigation location="expenseList" />
      {showBackground && <Background height="60px" color="#47CFB0" />}
    </>
  );
};

const ExpenseListViewPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDesc, setIsDesc] = useState<boolean>(true); // 내림차순 = 최신순
  const now = new Date();

  // 검색 조건 상태
  const [condition, setCondition] = useState<ExpenseFilterType>({
    registerType: [...Registers],
    emotion: [...EmotionKeys],
    from: startOfMonth(now), //미 선택 시, 당월
    to: endOfMonth(now),
    satisfaction: [1, 2, 3, 4, 5],
    word: inputRef.current ? inputRef.current.value : '',
  });

  // 무한 스크롤 구현, 데이터 정렬은 최신순 고정(서버에서 그렇게 보내줌)
  const {
    data: expensesData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['expenses', condition],
    ({ pageParam = 1 }) => fetchExpensesByCondition(pageParam, condition),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.nextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      onSuccess: (data) => console.log('Fetched data:', data),
      onError: (error) => console.error('Error fetching data:', error),
      //enabled: false, // 새로운 조건이 적용된 쿼리를 자동으로 재시작하지 않도록 설정
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // 검색 조건이 변경될 때 쿼리를 다시 실행
  useEffect(() => {
    refetch();
  }, [condition, refetch]);

  // 추가 데이터 로드
  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  // 무한 스크롤 이벤트 핸들러
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const onScroll = () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight + 1 >=
        scrollContainer.scrollHeight
      ) {
        loadMore();
      }
    };

    scrollContainer.addEventListener('scroll', onScroll);
    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, [hasNextPage, fetchNextPage, loadMore]);

  const toggleDesc = () => setIsDesc((prev) => !prev);
  const toggleModal = () => setShowModal((prev) => !prev);

  // 필터에서 적용버튼 눌렀을 때 적용할 데이터로 condition 상태 업데이트 -> 바로 검색
  const updateCondition = (data: ExpenseFilterType) => {
    setCondition(() => {
      const newCondition = cloneDeep(data);
      return newCondition;
    });
  };

  // 현재 상태의 조건을 가지고 서버에 데이터 요청하는 함수
  const handleSearch = (currentCondition: ExpenseFilterType) => {
    // 1. 현재 상태 키워드로 업데이트
    const sendData = {
      ...cloneDeep(currentCondition),
      word: inputRef.current ? inputRef.current.value : '',
    };

    // 2. 상태를 업데이트하여 query 실행
    setCondition(sendData);
  };

  // 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault(); // 폼 제출을 방지
    if (inputRef.current) inputRef.current.blur(); // 모바일 키보드 숨기기
    handleSearch(condition);
  };

  // 최신순/오래된순 정렬에 따라 배열 뒤집기. (spendList는 렌더링 부분에서 한번 또 뒤집어야함)
  const pagesData = expensesData
    ? isDesc
      ? expensesData.pages
      : [...expensesData.pages].reverse()
    : [];

  return (
    <NavigationLayout>
      <ExpenseListViewContainer>
        <SearchCondition>
          <FilterWrapper>
            <span className="filter-btn" onClick={toggleModal}>
              <FilterBtn />
            </span>
            <SelectList onClick={toggleModal}>
              <Select>{`${formatYMD(condition.from)}-${formatYMD(condition.to)}`}</Select>
              {condition.registerType.length > 0 && (
                <Select>
                  {condition.registerType.map((x) => getRegisterTypeText(x)).join(',')}
                </Select>
              )}
              {condition.emotion.length > 0 && (
                <Select>
                  {`${getEmotionText(condition.emotion[0])}`}
                  {condition.emotion.length > 1 ? ` 외 ${condition.emotion.length - 1}건` : ``}
                </Select>
              )}
              {condition.satisfaction.length > 0 && (
                <Select>{`만족도 ${condition.satisfaction.sort((a, b) => a - b).join(',')}`}</Select>
              )}
            </SelectList>
          </FilterWrapper>
          <SearchBoxWrapper>
            <SearchBtn />
            <SearchInput
              type="search"
              placeholder="감정 메모,소비 내역 등의 키워드를 검색하세요"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          </SearchBoxWrapper>
          {showModal && (
            <SlideModal onClose={toggleModal}>
              <FilterPopup
                onClose={toggleModal}
                updateCondition={updateCondition}
                prevCondition={cloneDeep(condition)}
              />
            </SlideModal>
          )}
        </SearchCondition>
        <ExpenseListContainer>
          <ExpenseListHeader>
            <span className="title">감정소비 리스트</span>
            <span className="sort" onClick={toggleDesc}>
              {isDesc ? (
                <>
                  최신순 <Arrow deg={'270deg'} />
                </>
              ) : (
                <>
                  오래된순 <Arrow deg={'90deg'} />
                </>
              )}
            </span>
          </ExpenseListHeader>
          <ExpenseListContent ref={scrollContainerRef} isloading={isLoading.toString()}>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <div>Error...</div>
            ) : (
              pagesData?.map((page) => {
                const spendList = isDesc ? page.data.spendList : [...page.data.spendList].reverse();
                return spendList.map((expenseSummary: ExpenseSummaryType) => (
                  <ExpenseBox key={expenseSummary.articleId}>
                    <ExpenseSummary {...expenseSummary} />
                  </ExpenseBox>
                ));
              })
            )}
          </ExpenseListContent>
        </ExpenseListContainer>
      </ExpenseListViewContainer>
    </NavigationLayout>
  );
};

export default ExpenseListViewPage;

const ExpenseListViewContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SearchCondition = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.main};
  width: 100%;
  height: 130px;
  flex-shrink: 0;

  padding: 0 20px 10px 20px;
  gap: 20px;
`;
const FilterWrapper = styled.div`
  ${flexCenter};
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  margin-bottom: 5px;

  & span.filter-btn {
    cursor: pointer;
    flex-shrink: 0;
    width: 40px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SelectList = styled.span`
  ${overflowWithoutScroll}
  ${flexCenter}
  gap: 10px;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
`;

const Select = styled.span`
  ${flexCenter}
  /* width: 70px; */
  height: 30px;
  border-radius: 6px;
  background-color: #ffffff;
  flex-shrink: 0;
  color: #767676;
  font-size: 10px;
  font-weight: 600;
  padding: 12.5px;
`;

const SearchBoxWrapper = styled.div`
  ${flexCenter}
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
`;

const SearchInput = styled.input.attrs({ type: 'text' })`
  width: 90%;
  height: 50px;
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;

  &::placeholder {
    color: #bcbcbc;
  }
`;

const ExpenseListContainer = styled.section`
  ${flexColumnCenter}
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 10px 16px 0 16px;
`;

// 제목, 정렬박스
const ExpenseListHeader = styled.div`
  ${flexBetween}
  width: 100%;
  height: 50px;
  flex-shrink: 0;

  & span.title {
    color: ${(props) => props.theme.font};
    font-size: 20px;
    font-weight: 700;
  }

  & span.sort {
    ${flexCenter}
    gap: 3px;
    color: #767676;
    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
      font-weight: 800;
    }
  }
`;
const ExpenseListContent = styled.div<{ isloading: string }>`
  ${flexColumnCenter}
  justify-content: ${(props) => (props.isloading == 'true' ? '' : 'flex-start')};
  ${overflowWithoutScroll}
  width: 100%;
  height: 100%;
  gap: 12px;
`;

const ExpenseBox = styled.div`
  ${mainSection}
  width: 100%;
`;

const arrowStyle = css`
  width: 10px;
  height: 10px;
  color: #9f9f9f;
  stroke-width: 4;
`;

const Arrow = styled(PrevBtn)<{ deg: string }>`
  ${arrowStyle}
  transform: rotate(${(props) => props.deg});

  &:hover {
    color: #9f9f9f;
    transform: rotate(${(props) => props.deg});
    stroke-width: 4;
  }
`;
