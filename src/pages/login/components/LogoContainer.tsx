import LogoIcon from '@assets/images/icon/logoGreen.svg?react';
import LogoIconTitle from '@assets/images/icon/logoTitleGray.svg?react';
import { flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

const LogoContainer = () => {
  return (
    <Container>
      <LogoWrapper>
        <LogoIcon />
        <LogoIconTitle />
      </LogoWrapper>
      <LogoText>
        소비내역과 감정일기를 적는
        <br />
        감정 가계부
      </LogoText>
    </Container>
  );
};

export default LogoContainer;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  gap: 50px;
`;

const LogoWrapper = styled.div`
  ${flexColumnCenter}
  width: 100%;
`;

const LogoText = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 20px;
`;
