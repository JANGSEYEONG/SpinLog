import styled from 'styled-components';

import ReactApexChart from 'react-apexcharts';

import type { DailyAmountType } from '@models/api/dashboard';

import { getDate } from 'date-fns';
import { addCommasToNumber, compareYMDString, getTargetMonthDateObjArray } from '@utils/index';

// 차트 옵션과 시리즈 데이터 타입 정의
type ChartOptions = {
  series: { name: string; data: number[] }[];
  options: ApexCharts.ApexOptions;
};

type DailyChartProps = {
  date: Date;
  data: DailyAmountType[];
};

const DailyChart = ({ date, data }: DailyChartProps) => {
  // 선택 월의 1일~말일 Date객체 구하기
  const dateInMonthArray: Date[] = getTargetMonthDateObjArray(date);

  // 라벨에 담기는 것 : 0~말일의 "일" 숫자 배열
  // 시리즈 데이터에 담기는 것 : 각각에 해당하는 금액 배열
  const chartLabels = dateInMonthArray.map((date: Date) => getDate(date));
  const chartSeries = dateInMonthArray.map((date: Date) => {
    const dataEntry = data.find((x) => compareYMDString(x.date, date));

    // 같은 날짜가 있다면, 해당 금액을 넣어주고 아니라면 0으로 채운다.
    if (dataEntry) {
      return dataEntry.amount;
    } else {
      return 0;
    }
  });

  const lastDayIndex = chartLabels.length - 1;
  const minY = Math.min(...chartSeries);
  const maxY = Math.max(...chartSeries);

  const chartOptions: ChartOptions = {
    series: [
      {
        name: '금액',
        data: chartSeries,
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 200,
        toolbar: {
          show: false,
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
        borderColor: '#DDDDDD', // 옅은 회색
        strokeDashArray: 3, // 점선 스타일
      },
      stroke: {
        width: 1.6,
      },
      colors: ['#BCBCBC'],
      xaxis: {
        categories: chartLabels,
        axisTicks: {
          show: false,
        },
        labels: {
          // rotate: 0, 금액 커지면 x라벨 잘려서 수평 설정 제거함
          offsetY: 10,
          show: true,
          style: {
            fontSize: '14px',
            fontFamily: 'SUIT',
            fontWeight: 500,
            colors: chartLabels.map((_, i) =>
              i % 5 === 0 || i === lastDayIndex ? '#9F9F9F' : 'transparent',
            ),
          },
          formatter: (value: string) => {
            return value + '일';
          },
        },
      },
      yaxis: {
        min: minY,
        max: maxY,
        tickAmount: 4, // 최소값과 최대값만 표시되도록 설정
        labels: {
          formatter: (val) => {
            if (val === minY || val === maxY) {
              return `${addCommasToNumber(Number(val.toFixed(0)))}원`;
            }
            return '';
          },
          style: {
            fontSize: '12px', // 필요에 따라 폰트 크기 조정
            colors: ['#9F9F9F', '#9F9F9F'],
          },
        },
      },
      markers: {
        size: 5,
        colors: ['#BCBCBC'],
        discrete: chartLabels
          .map((_, i) =>
            i % 5 === 0 || i === lastDayIndex // 5일단위와, 말일에 짙은색 마커 표시
              ? {
                  seriesIndex: 0,
                  dataPointIndex: i,
                  fillColor: '#575755',
                  strokeColor: '#575755',
                  size: 6,
                }
              : {},
          )
          .filter((item) => Object.keys(item).length > 0),
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${addCommasToNumber(Number(val.toFixed(0)))}원`, // 툴팁에서 값을 소수점 없이 표시
        },
      },
    },
  };
  return (
    <Container>
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        height={200}
      />
    </Container>
  );
};

export default DailyChart;

const Container = styled.div`
  width: 100%;
  overflow: visible;
  margin-right: 30px;
`;
