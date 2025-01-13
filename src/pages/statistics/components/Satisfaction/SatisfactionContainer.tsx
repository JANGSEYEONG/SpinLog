import Spinner from '@components/information/Spinner';
import type { Gender, Register } from '@models/index';
import styled from 'styled-components';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../type';
import SatisFaction from './Satisfaction';
import useSatisfactionData from './hooks/useSatisfactionData';

const transformMbtiData = (
  input: {
    mbtiFactor: string;
    satisfactionAverage: number;
  }[],
) => {
  const output: {
    name: [string, string];
    data: [number, number];
  }[] = [];

  const grouped: { [key: string]: number } = {};

  input.forEach((item) => {
    grouped[item.mbtiFactor] = item.satisfactionAverage;
  });

  const pairs: [string, string][] = [
    ['E', 'I'],
    ['N', 'S'],
    ['F', 'T'],
    ['P', 'J'],
  ];

  pairs.forEach((pair) => {
    const [first, second] = pair;
    output.push({ name: [first, second], data: [grouped[first], grouped[second]] });
  });

  return output;
};

const transformGenderData = (
  input: {
    gender: Gender;
    satisfactionAverage: number;
  }[],
) => {
  const output: {
    name: [string, string];
    data: [number, number];
  }[] = [];

  const grouped: { [key: string]: number } = {};

  input.forEach((item) => {
    grouped[item.gender] = item.satisfactionAverage;
  });

  const pairs: [Gender, Gender][] = [['MALE', 'FEMALE']];

  const genderByKorean: Record<Gender, string> = {
    FEMALE: '여자',
    MALE: '남자',
  };

  pairs.forEach((pair) => {
    const [first, second] = pair;
    output.push({
      name: [genderByKorean[first], genderByKorean[second]],
      data: [grouped[first], grouped[second]],
    });
  });

  return output;
};

type SatisfactionContainerProps = {
  tabOption: StatisticsTabOption;
  register: Register;
};

const SatisfactionContainer = ({ tabOption, register }: SatisfactionContainerProps) => {
  const { mbtiData, genderData, isLoading } = useSatisfactionData(tabOption, register);
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }
  const satisfactions =
    tabOption === STATISTICS_TAB.GENDER
      ? transformGenderData(genderData)
      : transformMbtiData(mbtiData.mbtiSatisfactionAverages);
  return <SatisFaction satisfactions={satisfactions} registerType={register} />;
};

export default SatisfactionContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
