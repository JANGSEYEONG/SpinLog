import {
  divider,
  flexBetween,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
} from '@styles/CommonStyles';
import styled from 'styled-components';
import { PrevBtn } from '@components/button';

import { useReducer } from 'react';

import Modal from '@components/modal';
import TopBar from '@components/layout/TopBar';
import ExpenseSummary from '@components/expense/ExpenseSummary';

import { getCombineRegisterTypeText, type ExpenseSummaryType } from '@models/expense';

import { formatMD } from '@utils/dateUtils';

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
          {data.length > 2 && <ShowMoreBtn onClick={toggleModal} />}
        </DateInfo>
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
      </Container>
      {showModal && (
        <Modal isFullScreen={true} onClose={toggleModal}>
          <ExpenseListPopup>
            <PopupHeader>
              <TopBar
                leftContent={<TopBar.PrevButton onClick={toggleModal} />}
                centerContent={<div>{`${getCombineRegisterTypeText('/')} 내역`}</div>}
              />
            </PopupHeader>
            <PopupContent>
              <Title>
                <span>{formatMD(currentDate, 'word')}</span>
                <span className="sub">{`총 ${data.length}건`}</span>
              </Title>
              <ListWrapper>
                {data.map((summary) => {
                  return (
                    <ExpenseBox key={summary.articleId}>
                      <ExpenseSummary {...summary} />
                    </ExpenseBox>
                  );
                })}
              </ListWrapper>
            </PopupContent>
          </ExpenseListPopup>
        </Modal>
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

const ShowMoreBtn = styled(PrevBtn)`
  width: 20px;
  height: 20px;
  color: #bcbcbc;
  stroke-width: 1.5;

  transform: rotate(180deg);

  &:hover {
    color: #bcbcbc;
    stroke-width: 2;
    transform: rotate(180deg);
  }
`;

const ExpenseListPopup = styled.div`
  ${overflowWithoutScroll}
  position: relative;

  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor.layout};

  // 헤더 높이만큼 패딩 넣기
  padding-top: 50px;

  padding-left: 15px;
  padding-right: 15px;
`;

const PopupHeader = styled.div`
  background-color: ${(props) => props.theme.backgroundColor.layout};
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  z-index: 10;
`;

const PopupContent = styled.div`
  width: 100%;
  height: 100%;
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

const ListWrapper = styled.div`
  ${flexColumnCenter}
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 12px;
`;
const ExpenseBox = styled.div`
  ${mainSection}
  width: 100%;
`;

const Divider = styled.div`
  ${divider}
`;

const Info = styled.div`
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 400;
`;
