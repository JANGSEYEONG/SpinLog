import styled from 'styled-components';

type ContentProps = {
  message: string;
  children: React.ReactNode;
};

const StatisticsContentLayout = ({ message, children }: ContentProps) => (
  <ContentContainer>
    <Message>{message}</Message>
    <Content>{children}</Content>
  </ContentContainer>
);

export default StatisticsContentLayout;

const ContentContainer = styled.div`
  background-color: #ffffff;
  padding: 15px;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 20px;
  box-shadow: 0 5px 14.56px 0 #5252521a;
`;

const Message = styled.div`
  width: 100%;
  font-size: 16px;
  text-align: left;
  line-height: 23px;
  word-break: keep-all;
  font-weight: 700;
  white-space: pre-wrap;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
