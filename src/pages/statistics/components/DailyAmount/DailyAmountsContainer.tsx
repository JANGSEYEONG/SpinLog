import Spinner from '@components/information/Spinner';
import type { Register } from '@models/common';
import type { Gender } from '@models/user';
import { subDays } from 'date-fns';
import styled from 'styled-components';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../type';
import DailyAmounts from './DailyAmounts';
import useDailyAmountsData from './hooks/useDailyAmountsData';

const transformMbtiData = (
  input: {
    mbtiFactor: string; // I, E, N, F, ...
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
  tabOption: StatisticsTabOption;
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
    tabOption === STATISTICS_TAB.GENDER
      ? transformGenderData(genderData)
      : transformMbtiData(mbtiData.mbtiDailyAmountSums);

  // #20240521.syjang, 데이터는 오늘 포함이 아니라, "어제" 포함 30일이라 subDays로 어제 날짜 전달 필요
  return (
    <DailyAmounts
      dailyAmounts={dailyAmounts}
      date={subDays(new Date(), 1)}
      registerType={register}
    />
  );
};

export default DailyAmountsContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
