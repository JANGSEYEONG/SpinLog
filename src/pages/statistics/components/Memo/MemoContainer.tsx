import Spinner from '@components/information/Spinner';
import type { Register } from '@models/common';
import styled from 'styled-components';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../type';
import Memo from './Memo';
import useMemoData from './hooks/useMemoData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFrequencyContentsForMbti = (data: any) => {
  let maxFrequencyWordOfAll = '';
  let maxFrequencyOfAll = 0;

  const allWordFrequencies = data
    ? data.allWordFrequencies.map((item: { word: string; frequency: number }) => {
        if (maxFrequencyOfAll < item.frequency) {
          maxFrequencyOfAll = item.frequency;
          maxFrequencyWordOfAll = item.word;
        }
        return {
          text: item.word,
          value: item.frequency,
        };
      })
    : [];

  let maxFrequencyWordOfMbti = '';
  let maxFrequencyOfMbti = 0;

  const userWordFrequencies = data
    ? data.userWordFrequencies.map((item: { word: string; frequency: number }) => {
        if (maxFrequencyOfMbti < item.frequency) {
          maxFrequencyOfMbti = item.frequency;
          maxFrequencyWordOfMbti = item.word;
        }
        return {
          text: item.word,
          value: item.frequency,
        };
      })
    : [];

  const contents = [
    {
      user: '모든 사용자',
      topWord: maxFrequencyWordOfAll,
      words: allWordFrequencies,
    },
    {
      user: data?.mbti || '',
      topWord: maxFrequencyWordOfMbti,
      words: userWordFrequencies,
    },
  ];

  return contents;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFrequencyContentsForGender = (data: any) => {
  let maxFrequencyWordOfFemale = '';
  let maxFrequencyOfFemale = 0;

  const femaleWordFrequencies = data
    ? data.femaleWordFrequencies.map((item: { word: string; frequency: number }) => {
        if (maxFrequencyOfFemale < item.frequency) {
          maxFrequencyOfFemale = item.frequency;
          maxFrequencyWordOfFemale = item.word;
        }
        return {
          text: item.word,
          value: item.frequency,
        };
      })
    : [];

  let maxFrequencyWordOfMale = '';
  let maxFrequencyOfMale = 0;

  const maleWordFrequencies = data
    ? data.maleWordFrequencies.map((item: { word: string; frequency: number }) => {
        if (maxFrequencyOfMale < item.frequency) {
          maxFrequencyOfMale = item.frequency;
          maxFrequencyWordOfMale = item.word;
        }
        return {
          text: item.word,
          value: item.frequency,
        };
      })
    : [];

  const contents = [
    {
      user: '남자',
      topWord: maxFrequencyWordOfMale,
      words: maleWordFrequencies,
    },
    {
      user: '여자',
      topWord: maxFrequencyWordOfFemale,
      words: femaleWordFrequencies,
    },
  ];

  return contents;
};

type MemoContainerProps = {
  tabOption: StatisticsTabOption;
  register: Register;
};

const MemoContainer = ({ tabOption, register }: MemoContainerProps) => {
  const { mbtiData, genderData, isLoading } = useMemoData(tabOption, register);
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  const contents =
    tabOption === STATISTICS_TAB.GENDER
      ? getFrequencyContentsForGender(genderData)
      : getFrequencyContentsForMbti(mbtiData);

  return <Memo contents={contents} registerType={register} />;
};

export default MemoContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
