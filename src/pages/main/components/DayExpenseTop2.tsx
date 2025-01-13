import { ChevronIcon } from '@components/icon';
import Spinner from '@components/information/Spinner';
import { type ExpenseSummaryType } from '@models/expense';
import { divider, flexBetween } from '@styles/CommonStyles';
import { formatMD } from '@utils/dateUtils';
import { lazyWithRetries } from 'src/routes/lazyWithRetries';
import styled from 'styled-components';

import { Suspense, useReducer } from 'react';

const ExpenseSummary = lazyWithRetries(() => import('@components/expense/ExpenseSummary'));
const ExpensesModal = lazyWithRetries(() => import('./ExpensesModal'));

type DayExpenseListTop2Props = {
  data: ExpenseSummaryType[];
  currentDate: Date;
};

const DayExpenseListTop2 = ({ data, currentDate }: DayExpenseListTop2Props) => {
  const dataTop2 = data.slice(0, 2);

  const [showModal, toggleModal] = useReducer((state) => !state, false);

  return (
    <>
      <Container>
        <DateInfo>
          <Title>
            <span>{formatMD(currentDate, 'word')} 내역</span>
            <span className="sub">{`총 ${data.length}건`}</span>
          </Title>
          {/* 2건 이하인 경우, 더보기 버튼을 보이지 않는다. */}
          {data.length > 2 && <ShowMoreBtn onClick={toggleModal} className="rotate-180" />}
        </DateInfo>
        <Suspense fallback={<Spinner />}>
          <Summary>
            {dataTop2.length === 0 ? (
              <Info>작성 내역이 없습니다.</Info>
            ) : (
              dataTop2.map((x, i) => {
                return (
                  <div key={i}>
                    <ExpenseSummary {...x} />
                    {i != dataTop2.length - 1 && <Divider />}
                  </div>
                );
              })
            )}
          </Summary>
        </Suspense>
      </Container>
      {showModal && (
        <Suspense fallback={<Spinner />}>
          <ExpensesModal {...{ data, toggleModal, currentDate }} />
        </Suspense>
      )}
    </>
  );
};

export default DayExpenseListTop2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DateInfo = styled.div`
  ${flexBetween}
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #333331;
  margin-bottom: 10px;
`;

const Summary = styled.div`
  width: 100%;
`;

const ShowMoreBtn = styled(ChevronIcon)`
  width: 25px;
  height: 25px;
  color: ${(props) => props.theme.colors.gray2};
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;

  color: ${(props) => props.theme.colors.lightBlack};
  font-size: 20px;
  font-weight: 700;
  gap: 8px;

  margin-bottom: 12px;
  margin-top: 20px;

  & > span.sub {
    color: #9f9f9f;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Divider = styled.div`
  ${divider}
`;

const Info = styled.div`
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 400;
`;
