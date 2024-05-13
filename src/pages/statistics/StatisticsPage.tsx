import BottomNavigation from '@layout/BottomNavigation';
import TopNavigation from '@layout/TopNavigation';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { subDays } from 'date-fns';
import { formatYMD } from '@utils/index';
import { useState } from 'react';
import { flexBetween, flexCenter } from '@styles/CommonStyles';
import Tab from '@components/Tab';

type NavLayoutProps = {
  children: React.ReactNode;
};

type Category = 'emotion' | 'daily' | 'word' | 'satisfaction';

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const endDate: Date = subDays(new Date(), 1);
  const startDate: Date = subDays(endDate, 89);

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            rightContent={
              <TopNavigation.TopBar.SettingGrayButton
                onClick={() => {
                  navigate('/setting');
                }}
              />
            }
          />
        }
        _Extension={
          <SubNavWrapper>
            <SliderContainer onClick={toggleSwitch}>
              <SliderText isOn={isOn} isLeft={true}>
                절약
              </SliderText>
              <Circle isOn={isOn} />
              <SliderText isOn={isOn} isLeft={false}>
                지출
              </SliderText>
            </SliderContainer>
            <MonthNavBtn>{`${formatYMD(startDate)} - ${formatYMD(endDate)} 기준`}</MonthNavBtn>
          </SubNavWrapper>
        }
      />
      {children}
      <BottomNavigation />
    </>
  );
};

const SubNavWrapper = styled.div`
  ${flexBetween}
  padding: 0 15px;
  margin-bottom: 20px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 76px;
  height: 38px;
  background-color: ${(props) => props.theme.colors.button};
  border-radius: 34px;
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

const SliderText = styled.span<{ isOn: boolean; isLeft: boolean }>`
  position: absolute;
  color: ${({ isOn, isLeft }) => (isOn === isLeft ? 'white' : 'black')};
  ${({ isLeft }) => (isLeft ? 'left: 8px;' : 'right: 8px;')}
  font-size: 12px;
  font-weight: 600;
  z-index: 3;
`;

const Circle = styled.div<{ isOn: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  transition: transform 0.2s;
  transform: ${({ isOn }) => (isOn ? 'translateX(42px)' : 'translateX(3px)')};
  z-index: 1;
`;

const MonthNavBtn = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #bcbcbcbc;
`;

const StatisticsPage = () => {
  const [categoryColor, setCategoryColor] = useState<Category>('emotion');

  return (
    <NavigationLayout>
      <StatisticsContainer>
        <Tab />
        <ContentsContainer>
          <CategoryContainer>
            <Category
              isSelected={categoryColor === 'emotion'}
              onClick={() => setCategoryColor('emotion')}>
              감정
            </Category>
            <Category
              isSelected={categoryColor === 'daily'}
              onClick={() => setCategoryColor('daily')}>
              일별
            </Category>
            <Category
              isSelected={categoryColor === 'word'}
              onClick={() => setCategoryColor('word')}>
              메모
            </Category>
            <Category
              isSelected={categoryColor === 'satisfaction'}
              onClick={() => setCategoryColor('satisfaction')}>
              만족도
            </Category>
          </CategoryContainer>
          <MyMbti>{`나의 Mbti ${'Entj'}`}</MyMbti>
          <Statistics>
            최근 3개월 내 높은 금액 지출 순으로 가장 많이 느낀 감정은 E는 불안, I는 기분 좋은 이에요
          </Statistics>
        </ContentsContainer>
      </StatisticsContainer>
    </NavigationLayout>
  );
};

export default StatisticsPage;

const StatisticsContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ContentsContainer = styled.div`
  width: 100%;
  padding: 0 23px;
`;

const CategoryContainer = styled.div`
  ${flexBetween}
  width: 100%;
  height: 42px;
  padding: 6px;
  background-color: #ffffff;
  border-radius: 6px;
  margin: 24px 0 13px;
`;

const Category = styled.div<{ isSelected: boolean }>`
  ${flexCenter}
  width: 80px;
  height: 30px;
  border-radius: 6px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.main : '#e3e3e3')};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#9f9f9f')};
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  cursor: pointer;
`;

const MyMbti = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 17px 10px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 13px;
`;

const Statistics = styled.div`
  width: 340px;
  height: 407px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
`;
