import styled from 'styled-components';
import MainLayout from '@layout/MainLayout';

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <BudgetContainer>예산영역</BudgetContainer>
        <CalendarWrapper>달력영역</CalendarWrapper>
        <DayListContainer>하루 소비 영역</DayListContainer>
      </MainLayout>
    </>
  );
};

export default MainPage;

const Section = styled.section`
  background-color: ${(props) => props.theme.colors.contentBox};
  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.under};
`;

const BudgetContainer = styled(Section)`
  height: 30%;
  width: 100%;
  margin-bottom: 10px;
`;
const CalendarWrapper = styled(Section)`
  height: 50%;
  width: 100%;
  margin-bottom: 10px;
`;
const DayListContainer = styled(Section)`
  height: 20%;
  width: 100%;
`;
