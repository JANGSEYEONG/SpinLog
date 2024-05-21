import StatisticsContentLayout from '../StatisticsContentLayout';

import Chart from 'react-apexcharts';
import SwipeContainer from '../SwipeContainer';
import { getNinetyDaysDateObjArray } from '@utils/index';
import { format } from 'date-fns';
import { DailyAmountsChartData } from './types';

type DailyAmountProps = {
  date: Date;
  dailyAmounts: DailyAmountsChartData[][];
};

const getMaxValue = (data: number[]) => Math.max(...data);

const DailyAmounts = ({ date, dailyAmounts }: DailyAmountProps) => {
  const colors = ['#47CFB0', '#C3EBE2'];

  return (
    <SwipeContainer>
      {dailyAmounts.map((dailyAmount, index) => {
        const series = dailyAmount;

        const maxValues = series.map((s) => ({
          value: getMaxValue(s.data),
          index: s.data.indexOf(getMaxValue(s.data)),
        }));

        const getSmallMarkers = (data: number[]) => {
          return data
            .map((_, index) => (index % 15 === 0 ? index : null))
            .filter((index) => index !== null) as number[];
        };

        const smallMarkers = series.map((s) => getSmallMarkers(s.data));

        const chartLabels = getNinetyDaysDateObjArray(date).map((date) => format(date, 'M/d'));

        const overallMaxValue = Math.max(...series.flatMap((s) => s.data));

        const yAxisLabelFormatter = (value: number) => {
          if (value === 0) return '0';
          if (value === overallMaxValue) return '최댓값';
          return '';
        };

        return (
          <StatisticsContentLayout
            key={index}
            message={`최근 3개월 내 감정 소비를 가장 많이 한 날은\n${dailyAmount[0].name}는 ${chartLabels[maxValues[0].index]}, ${dailyAmount[1].name}는 ${chartLabels[maxValues[1].index]} 이에요`}>
            <Chart
              height={'100%'}
              width={'100%'}
              type="line"
              series={series}
              options={{
                chart: {
                  type: 'line',
                  height: 440,
                  width: 500,
                  toolbar: { show: false },
                },
                legend: { position: 'top' },
                colors: colors,
                dataLabels: {
                  enabled: true,
                  formatter: function (val, opts) {
                    const seriesIndex = opts.seriesIndex;
                    const maxValue = maxValues[seriesIndex].value;
                    return val === maxValue ? val : '';
                  },
                  offsetY: -5,
                  style: { colors: ['black'] },
                  background: { enabled: false },
                },
                stroke: {
                  width: 3,
                },
                xaxis: {
                  axisTicks: { show: false },
                  labels: {
                    show: true,
                    style: {
                      fontSize: '14px',
                      fontFamily: 'SUIT',
                      fontWeight: 500,
                      colors: chartLabels.map((_, i) => (i % 15 === 0 ? '#9F9F9F' : 'transparent')),
                    },
                    formatter: (_, i) => (i ? chartLabels[i] : ''),
                  },
                },
                yaxis: {
                  axisBorder: { show: true },
                  min: 0,
                  max: overallMaxValue,
                  labels: {
                    formatter: yAxisLabelFormatter,
                    style: {
                      fontSize: '14px',
                      fontFamily: 'SUIT',
                      fontWeight: 500,
                      colors: '#9F9F9F',
                    },
                  },
                },
                grid: {
                  show: false,
                },
                markers: {
                  shape: 'circle',
                  strokeWidth: 0,
                  discrete: [
                    ...maxValues.map((max, seriesIndex) => ({
                      fillColor: colors[seriesIndex],
                      seriesIndex,
                      dataPointIndex: max.index,
                      size: 4,
                    })),
                    ...smallMarkers.flatMap((indices, seriesIndex) =>
                      indices.map((index) => ({
                        fillColor: colors[seriesIndex],
                        seriesIndex,
                        dataPointIndex: index,
                        size: 3,
                      })),
                    ),
                  ],
                },
              }}
            />
          </StatisticsContentLayout>
        );
      })}
    </SwipeContainer>
  );
};

export default DailyAmounts;
