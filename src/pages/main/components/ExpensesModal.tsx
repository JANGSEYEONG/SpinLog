import { flexColumnCenter, mainSection, overflowWithoutScroll } from '@styles/CommonStyles';
import styled from 'styled-components';

import Modal from '@components/modal';
import TopBar from '@components/layout/TopBar';
import ExpenseSummary from '@components/expense/ExpenseSummary';

import { type ExpenseSummaryType, getCombineRegisterTypeText } from '@models/expense';

import { formatMD } from '@utils/dateUtils';

type ExpensesModalProps = {
  data: ExpenseSummaryType[];
  toggleModal: () => void;
  currentDate: Date;
};

const ExpensesModal = ({ data, toggleModal, currentDate }: ExpensesModalProps) => {
  return (
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
  );
};

export default ExpensesModal;

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
