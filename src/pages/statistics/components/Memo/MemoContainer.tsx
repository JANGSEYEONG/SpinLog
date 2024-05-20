import { useQuery } from 'react-query';
import { TabOption } from '../../type';
import { fetchWordFrequencyByGender, fetchWordFrequencyByMbti } from '@api/get';
import Memo from './Memo';
import Spinner from '@components/information/Spinner';
import { Register } from '@models/index';
import styled from 'styled-components';

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
      user: '여자',
      topWord: maxFrequencyWordOfFemale,
      words: femaleWordFrequencies,
    },
    {
      user: '남자',
      topWord: maxFrequencyWordOfMale,
      words: maleWordFrequencies,
    },
  ];

  return contents;
};

type MemoContainerProps = {
  tabOption: TabOption;
  register: Register;
};

const MemoContainer = ({ tabOption, register }: MemoContainerProps) => {
  const { data: memoForMbti, isLoading: isMeoForMbtiLoading } = useQuery(
    ['fetchWordFrequencyByMbtiQueryKey', register],
    () => fetchWordFrequencyByMbti(register),
    {
      enabled: tabOption === 'TAB_MBTI',
    },
  );
  const { data: memoForGender, isLoading: isMeoForGenderLoading } = useQuery(
    ['fetchWordFrequencyByGenderQueryKey', register],
    () => fetchWordFrequencyByGender(register),
    {
      enabled: tabOption === 'TAB_GENDER',
    },
  );

  if (isMeoForMbtiLoading || isMeoForGenderLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  const contents =
    tabOption === 'TAB_GENDER'
      ? getFrequencyContentsForGender(memoForGender)
      : getFrequencyContentsForMbti(memoForMbti);

  return <Memo contents={contents} />;
};

export default MemoContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
