import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import SwipeContainer from '../SwipeContainer';
import StatisticsContentLayout from '../StatisticsContentLayout';

type MemoProps = {
  contents: {
    user: string;
    topWord: string;
    words: { text: string; value: number }[];
  }[];
};
const Memo = ({ contents }: MemoProps) => {
  return (
    <SwipeContainer>
      {contents.map(({ topWord, words, user }, index) => {
        return (
          <StatisticsContentLayout
            key={index}
            message={`최근 90일 내 ${user}는\n소비내역 중 내용 부분에 '${topWord}'라는\n단어를 가장 많이 썼어요 `}>
            <ReactWordcloud words={words} />
          </StatisticsContentLayout>
        );
      })}
    </SwipeContainer>
  );
};

export default Memo;
