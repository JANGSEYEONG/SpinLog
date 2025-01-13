import LoadingBird from '@assets/images/bird/loadingBird.svg?react';
import { flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <LoadingBird />
      <Text>잠시만 기다려주세요</Text>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.darkLightGray2};
  font-size: 16px;
  font-weight: 700;
`;
