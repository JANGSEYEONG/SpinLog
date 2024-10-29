import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import SwipeLayout from '@components/layout/SwipeLayout';

import LogoContainer from './LogoContainer';

const SwipeContainer = () => {
  const introData = [
    {
      text: (
        <>
          <span>감정일기</span>와 <span>소비내역</span>을 적어요!
        </>
      ),
      imageSrc: '/src/assets/images/login/intro/intro1.webp',
    },
    {
      text: (
        <>
          <span>AI</span>에게 소비내역의 <span>피드백</span>을 받아요
        </>
      ),
      imageSrc: '/src/assets/images/login/intro/intro2.webp',
    },
    {
      text: (
        <>
          이번 달 <span>소비내역을 한눈에</span> 봐요
        </>
      ),
      imageSrc: '/src/assets/images/login/intro/intro3.webp',
    },
    {
      text: (
        <>
          <span>MBTI별</span>로 사람들의 <span>소비내역</span>을 구경해요!
        </>
      ),
      imageSrc: '/src/assets/images/login/intro/intro4.webp',
    },
  ];

  return (
    <Container>
      <SwipeLayout>
        <LogoContainer />
        {introData.map(({ text, imageSrc }, index) => (
          <IntroWrapper key={index}>
            <IntroText>{text}</IntroText>
            <IntroImage src={imageSrc} alt={`intro ${index + 1}`} />
          </IntroWrapper>
        ))}
      </SwipeLayout>
    </Container>
  );
};
export default SwipeContainer;

const Container = styled.div`
  background-color: transparent;
  width: 100%;
  height: 60%;
  padding: 10px 10px 0px 10px;
`;

const IntroWrapper = styled.div`
  ${flexColumnCenter}
  gap: 25px;
  width: 100%;
  height: 100%;
`;

const IntroText = styled.p`
  color: ${(props) => props.theme.colors.lightBlack};
  font-size: 20px;
  font-weight: 700;
  & > span {
    color: ${(props) => props.theme.colors.lightGreen};
  }
`;

const IntroImage = styled.img`
  width: 355px !important;
  height: 355px !important;
`;
