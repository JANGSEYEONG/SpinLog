import SwipeLayout from '@components/layout/SwipeLayout';
import { getRegisterTypeText } from '@models/expense';
import type { Register } from '@models/index';
import styled from 'styled-components';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';

import ReactWordcloud from 'react-wordcloud';

import StatisticsContentLayout from '../StatisticsContentLayout';

type MemoProps = {
  contents: {
    user: string;
    topWord: string;
    words: { text: string; value: number }[];
  }[];
  registerType: Register;
};
const Memo = ({ contents, registerType }: MemoProps) => {
  return (
    <SwipeLayout>
      {contents.map(({ topWord, words, user }, index) => {
        return (
          <StatisticsContentLayout
            key={index}
            isEmpty={user === 'NONE'}
            message={
              <Message $index={index}>
                <span>{user}</span>는 {getRegisterTypeText(registerType)} 메모 중<br />
                <span>&apos;{topWord}&apos;</span> 단어를 많이 썼어요
              </Message>
            }>
            <div style={{ height: '200px' }}>
              <ReactWordcloud words={words} />
            </div>
          </StatisticsContentLayout>
        );
      })}
    </SwipeLayout>
  );
};

export default Memo;

const Message = styled.div<{ $index: number }>`
  & > span {
    color: ${(props) =>
      props.$index === 0 ? props.theme.colors.lightGreen : props.theme.colors.lightRed};
  }
`;
