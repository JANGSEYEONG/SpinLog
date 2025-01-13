import Spinner from '@components/information/Spinner';
import type { EmotionKey, Register } from '@models/common';
import type { Gender, MbitFactor } from '@models/user';
import type {
  EmotionAmountsByGenderDto,
  EmotionAmountsByMbtiDto,
} from '@service/statistics/emotionAmountService';
import styled from 'styled-components';

import { STATISTICS_TAB, type StatisticsTabOption } from '../../type';
import EmotionalAmountChart from './EmotionalAmountChart';
import useEmotionalAmount from './hooks/useEmotionalAmount';

interface OutputData {
  data: { type: EmotionKey; left: number; right: number }[];
  leftKey: string;
  rightKey: string;
}

const transformMbtiData = (
  input: EmotionAmountsByMbtiDto['mbtiEmotionAmountAverages'],
): OutputData[] => {
  const pairs: [MbitFactor, MbitFactor][] = [
    ['E', 'I'],
    ['N', 'S'],
    ['F', 'T'],
    ['P', 'J'],
  ];

  const result: OutputData[] = [];

  pairs.forEach(([leftKey, rightKey]) => {
    const emotionMap = new Map<EmotionKey, { left: number; right: number }>();

    input.forEach(({ mbtiFactor, emotionAmountAverages }) => {
      emotionAmountAverages.forEach(({ emotion, amountAverage }) => {
        if (!emotionMap.has(emotion)) {
          emotionMap.set(emotion, { left: 0, right: 0 });
        }

        if (mbtiFactor === leftKey) {
          emotionMap.get(emotion)!.left += amountAverage;
        } else if (mbtiFactor === rightKey) {
          emotionMap.get(emotion)!.right += amountAverage;
        }
      });
    });

    const data = Array.from(emotionMap.entries()).map(([type, { left, right }]) => ({
      type,
      left,
      right,
    }));

    result.push({ data, leftKey, rightKey });
  });

  return result;
};

const genderByKorean: Record<Gender, string> = {
  FEMALE: '여자',
  MALE: '남자',
};
const transformGenderData = (input: EmotionAmountsByGenderDto): OutputData[] => {
  const result: OutputData[] = [];

  const pairs: [[Gender, Gender]] = [['MALE', 'FEMALE']];

  pairs.forEach(([leftKey, rightKey]) => {
    const emotionMap = new Map<EmotionKey, { left: number; right: number }>();

    input.forEach(({ gender, emotionAmountAverages }) => {
      emotionAmountAverages.forEach(({ emotion, amountAverage }) => {
        if (!emotionMap.has(emotion)) {
          emotionMap.set(emotion, { left: 0, right: 0 });
        }

        if (gender === leftKey) {
          emotionMap.get(emotion)!.left += amountAverage;
        } else if (gender === rightKey) {
          emotionMap.get(emotion)!.right += amountAverage;
        }
      });
    });

    const data = Array.from(emotionMap.entries()).map(([type, { left, right }]) => ({
      type,
      left,
      right,
    }));

    result.push({ data, leftKey: genderByKorean[leftKey], rightKey: genderByKorean[rightKey] });
  });

  return result;
};

type EmotionalAmountChartContainerProps = {
  tabOption: StatisticsTabOption;
  register: Register;
};
const EmotionalAmountChartContainer = ({
  register,
  tabOption,
}: EmotionalAmountChartContainerProps) => {
  const { genderData, mbtiData, isLoading } = useEmotionalAmount(tabOption, register);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  const emotionalAmounts =
    tabOption === STATISTICS_TAB.GENDER
      ? transformGenderData(genderData ? genderData : [])
      : transformMbtiData(mbtiData ? mbtiData.mbtiEmotionAmountAverages : []);

  return <EmotionalAmountChart dataList={emotionalAmounts} registerType={register} />;
};

export default EmotionalAmountChartContainer;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
