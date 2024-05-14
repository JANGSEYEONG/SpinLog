import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import LoadingBird from '@assets/images/icon/bird/loadingBird.svg?react';

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
  color: #767676;
  font-size: 16px;
  font-weight: 700;
`;
