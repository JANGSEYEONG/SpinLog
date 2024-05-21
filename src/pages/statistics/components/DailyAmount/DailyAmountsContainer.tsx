import { Gender, Register } from '@models/index';
import { TabOption } from '../../type';
import Spinner from '@components/information/Spinner';
import DailyAmounts from './DailyAmounts';
import useDailyAmountsData from './hooks/useDailyAmountsData';
import styled from 'styled-components';

const transformMbtiData = (
  input: {
    mbtiFactor: string;
    dailyAmountSums: { amountSum: number; date: string }[];
  }[],
) => {
  const output: {
    name: string;
    data: number[];
  }[][] = [];

  const grouped = input.reduce<Record<string, number[]>>((acc, item) => {
    acc[item.mbtiFactor] = item.dailyAmountSums.map((sum) => sum.amountSum);
    return acc;
  }, {});

  const pairs: [string, string][] = [
    ['E', 'I'],
    ['N', 'S'],
    ['F', 'T'],
    ['P', 'J'],
  ];

  pairs.forEach((pair) => {
    output.push(pair.map((mbti) => ({ name: mbti, data: grouped[mbti] })));
  });

  return output;
};

const transformGenderData = (
  input: {
    gender: Gender;
    dailyAmountSums: { amountSum: number; date: string }[];
  }[],
) => {
  const output: {
    name: string;
    data: number[];
  }[][] = [];

  const grouped: Record<string, number[]> = {};

  input.forEach((item) => {
    grouped[item.gender] = item.dailyAmountSums.map((sum) => sum.amountSum);
  });

  const pairs: [[Gender, Gender]] = [['MALE', 'FEMALE']];

  const genderByKorean: Record<Gender, string> = {
    FEMALE: '여자',
    MALE: '남자',
  };

  pairs.forEach((genders) => {
    output.push(
      genders.map((gender) => ({
        name: genderByKorean[gender],
        data: grouped[gender],
      })),
    );
  });

  return output;
};

type DailyAmountsContainerProps = {
  tabOption: TabOption;
  register: Register;
};

const DailyAmountsContainer = ({ tabOption, register }: DailyAmountsContainerProps) => {
  const { mbtiData, genderData, isLoading } = useDailyAmountsData(tabOption, register);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  const dailyAmounts =
    tabOption === 'TAB_GENDER'
      ? transformGenderData(genderData)
      : transformMbtiData(mbtiData.mbtiDailyAmountSums);

  return <DailyAmounts dailyAmounts={dailyAmounts} date={new Date()} />;
};

export default DailyAmountsContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
