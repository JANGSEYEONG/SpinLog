import useWindowWidthResize from '@hooks/useWindowWidthResize';
import { flexCenter } from '@styles/CommonStyles';
import styled, { useTheme } from 'styled-components';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export type TabProps<T extends string> = {
  id: T;
  label: string;
  content: React.ReactNode; // 탭의 내용을 React 노드로 정의
};

type TabsProps<T extends string> = {
  tabs: TabProps<T>[];
  selectedTab: string;
  onTabSelect: (tabId: TabProps<T>['id']) => void;
};

const TabLayout = <T extends string>({ tabs, selectedTab, onTabSelect }: TabsProps<T>) => {
  const theme = useTheme();
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [indicatorOffset, setIndicatorOffset] = useState<number>(0);

  const handleResize = useCallback(() => {
    const tab = tabRefs.current[selectedTab];
    if (tab && tab.parentNode && tab.parentNode instanceof HTMLElement) {
      const extraWidth = 70; // 추가 너비
      const rect = tab.getBoundingClientRect(); // 탭의 위치와 크기를 정확히 계산
      const parentRect = tab.parentNode.getBoundingClientRect(); // 부모 요소의 위치와 크기 계산
      const newWidth = rect.width + extraWidth;
      const newOffset = rect.left - parentRect.left - extraWidth / 2; // 부모 요소 기준으로 상대적 위치 계산
      setIndicatorWidth(newWidth);
      setIndicatorOffset(newOffset);
    }
  }, [selectedTab]);

  useEffect(() => {
    handleResize();
  }, [selectedTab, tabs, handleResize]);
  // 윈도우 리사이즈 시에도, 탭 인디게이터가 따라다니도록 호출
  useWindowWidthResize(handleResize);

  return (
    <TabsContainer>
      <TabHeaders>
        {tabs.map((tab) => (
          <TabHeader
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            $isActive={selectedTab === tab.id}
            $activeColor={theme.colors.darkGray}
            $color={theme.colors.darkLightGray}>
            {tab.label}
          </TabHeader>
        ))}
        <TabIndicatorRail $color={theme.colors.lightGray} />
        <TabIndicator
          $width={indicatorWidth}
          $offset={indicatorOffset}
          $color={theme.colors.darkGray}
        />
      </TabHeaders>
      <ContentContainer>
        {tabs.map(
          (tab) => selectedTab === tab.id && <TabPanel key={tab.id}>{tab.content}</TabPanel>,
        )}
      </ContentContainer>
    </TabsContainer>
  );
};

export default TabLayout;

const TabsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TabHeaders = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
`;

const TabHeader = styled.div<{
  $isActive: boolean;
  $activeColor: string;
  $color: string;
}>`
  ${flexCenter}
  position: relative;
  cursor: pointer;
  padding: 0 20px 0 20px;
  font-size: 16px;
  height: 30px;
  color: ${(props) => (props.$isActive ? props.$activeColor : props.$color)};
  font-weight: ${(props) => (props.$isActive ? 700 : 400)};
`;

const TabIndicatorRail = styled.div<{ $color: string }>`
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: -4px;
  background-color: ${(props) => props.$color};
`;

const TabIndicator = styled.div<{
  $width: number;
  $offset: number;
  $color: string;
}>`
  height: 4px;
  border-radius: 6px;
  background-color: ${(props) => props.$color};
  position: absolute;
  left: ${(props) => props.$offset}px;
  width: ${(props) => props.$width}px;
  transition:
    left 0.3s ease,
    width 0.3s ease;
  bottom: -4px;
`;

const TabPanel = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 25px;
`;
