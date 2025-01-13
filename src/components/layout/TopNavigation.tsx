import TopBar from '@layout/TopBar';
import styled from 'styled-components';

type TopNavigationProps = {
  _TopBar: React.ReactNode;
  _Extension?: React.ReactNode; // 날짜 선택
};

const TopNavigation = ({ _TopBar, _Extension }: TopNavigationProps) => {
  return (
    <Wrapper>
      {_TopBar}
      {_Extension}
    </Wrapper>
  );
};

// nav와 extension을 감싸게 된다.높이는 자식 크기에맞춰질 것
const Wrapper = styled.nav`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

TopNavigation.TopBar = TopBar; //이렇게 하면 가져다 쓰는 쪽에서 TopNavigation만 import해도 된다

export default TopNavigation;
