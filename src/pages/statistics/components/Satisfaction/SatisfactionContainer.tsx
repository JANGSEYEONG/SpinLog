import { useQuery } from 'react-query';
import SatisFaction from './Satisfaction';
import { fetchSatisfactionByGender, fetchSatisfactionByMbti } from '@api/get';
import { TabOption } from '../../type';
import { Gender, Register } from '@models/index';
import Spinner from '@components/information/Spinner';
import styled from 'styled-components';

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
  tabOption: TabOption;
  register: Register;
};

const SatisfactionContainer = ({ tabOption, register }: SatisfactionContainerProps) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchSatisfactionByMbti', register],
    () => fetchSatisfactionByMbti(register),
    {
      enabled: tabOption === 'TAB_MBTI',
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchSatisfactionByGender', register],
    () => fetchSatisfactionByGender(register),
    {
      enabled: tabOption === 'TAB_GENDER',
    },
  );
  if (isMbtiDataLoading || isGenderDataLoading) {
    return (
      <LoadingContainer>
        <Spinner />;
      </LoadingContainer>
    );
  }
  const satisfactions =
    tabOption === 'TAB_GENDER'
      ? transformGenderData(genderData)
      : transformMbtiData(mbtiData.mbtiSatisfactionAverages);
  return <SatisFaction satisfactions={satisfactions} />;
};

export default SatisfactionContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
