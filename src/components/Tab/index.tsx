import { flexBetween, flexCenter } from '@styles/CommonStyles';
import { useState } from 'react';
import styled from 'styled-components';

const Tab = () => {
  const [activeTab, setActiveTab] = useState<'MBTI' | 'GENDER'>('MBTI');

  return (
    <TabContainer>
      <TabBtn isActive={activeTab === 'MBTI'} onClick={() => setActiveTab('MBTI')}>
        Mbti별
      </TabBtn>
      <TabBtn isActive={activeTab === 'GENDER'} onClick={() => setActiveTab('GENDER')}>
        성별
      </TabBtn>
      <Line />
      <ActiveLine activeTab={activeTab} />
    </TabContainer>
  );
};

export default Tab;

const TabContainer = styled.div`
  ${flexBetween}
  padding: 0 44px;
  position: relative;
`;

const TabBtn = styled.div<{ isActive: boolean }>`
  ${flexCenter}
  width: 140px;
  height: 30px;
  color: ${({ isActive }) => (isActive ? '#575755' : '#9f9f9f')};
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  cursor: pointer;
`;

const Line = styled.div`
  position: absolute;
  left: 16px;
  bottom: 0;
  width: calc(100% - 32px);
  height: 2px;
  background-color: #e3e3e3;
`;

const ActiveLine = styled.div<{ activeTab: string }>`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 140px;
  background-color: #575755;
  transition: transform 0.3s ease;
  transform: ${({ activeTab }) => `translateX(${activeTab === 'MBTI' ? 0 : 162}px)`};
`;
