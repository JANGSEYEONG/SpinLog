import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import styled from 'styled-components';
import PrevIcon from '@assets/images/icon/slidePrev.svg';
import NextIcon from '@assets/images/icon/slideNext.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwipeContainerProps {
  children: React.ReactNode;
}

const SwipeContainer = ({ children }: SwipeContainerProps) => {
  return (
    <StyledSwiper
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper">
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>
          <ContentContainer>{child}</ContentContainer>
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default SwipeContainer;

const StyledSwiper = styled(Swiper)`
  height: 100%;

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    background-color: #d9d9d9;
  }

  .swiper-pagination-bullet-active {
    background-color: #9f9f9f;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background-color: #dddddd;
    width: 30px;
    height: 30px;
    opacity: 0.5;
    border-radius: 20px;
    color: black !important;
    &::after {
      display: none;
    }
  }

  .swiper-button-disabled {
    display: none;
  }
  .swiper-button-prev {
    background-image: url(${PrevIcon});
    background-repeat: no-repeat;
    background-position: center;
    left: 5px;
  }
  .swiper-button-next {
    background-image: url(${NextIcon});
    background-repeat: no-repeat;
    background-position: center;
    right: 5px;
  }
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-bottom: 40px;
`;
