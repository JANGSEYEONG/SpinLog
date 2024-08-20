import { flexCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

type ContentProps = {
  message: React.ReactNode;
  children: React.ReactNode;
  isEmpty?: boolean;
};

const StatisticsContentLayout = ({ message, children, isEmpty = false }: ContentProps) => (
  <ContentContainer>
    {isEmpty ? (
      <EmptyMessage>환경설정에서 MBTI를 설정해주세요.</EmptyMessage>
    ) : (
      <>
        <Message>{message}</Message>
        <Content>{children}</Content>
      </>
    )}
  </ContentContainer>
);

export default StatisticsContentLayout;

const ContentContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 8px;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 20px;
  box-shadow: ${(props) => props.theme.shadows.around};
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
  ${flexCenter}
  height: 100%;
`;

const EmptyMessage = styled.div`
  ${flexCenter}
  height: 100%;
  font-size: 16px;
  color: #767676;
`;
