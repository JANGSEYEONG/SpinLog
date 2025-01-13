import { getEmotionColor, getEmotionText } from '@models/emotion';
import type { EmotionAmountTotalType } from '@service/dashboard/types';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';
import { cloneDeep } from 'lodash';
import styled, { useTheme } from 'styled-components';

import ReactApexChart from 'react-apexcharts';

// 차트 옵션과 시리즈 데이터 타입 정의
type ChartOptions = {
  series: number[];
  options: ApexCharts.ApexOptions;
};

type EmotionChartProps = {
  data: EmotionAmountTotalType[];
};

const EmotionChart = ({ data }: EmotionChartProps) => {
  // #20240522.syjang, 상위 3개 감정 + 나머지는 "기타" 로 표시
  const sortedData = cloneDeep(data);
  const theme = useTheme();
  sortedData.sort((a, b) => b.amount - a.amount);
  const chartData = sortedData.splice(0, 3).map((data) => ({
    ...data,
    emotion: getEmotionText(data.emotion),
    color: getEmotionColor(data.emotion),
  }));
  chartData.push({
    emotion: '기타',
    amount: sortedData.reduce((acc, val) => acc + val.amount, 0),
    color: theme.colors.lightGray2,
  });

  const chartLabels = chartData.map((data) => data.emotion);
  const chartSeries = chartData.map((data) => data.amount);
  const chartColors = chartData.map((data) => data.color);

  // 전체 값의 합계 계산
  const total = chartSeries.reduce((acc, value) => acc + value, 0);

  const chartOptions: ChartOptions = {
    series: chartSeries,
    options: {
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '55%', // 도넛 두께 조정
            labels: {
              show: true,
              name: {
                fontSize: '13px',
                fontFamily: 'SUIT',
                fontWeight: 400,
                color: theme.colors.darkLightGary,
                offsetY: -5,
              },
              value: {
                fontSize: '17px',
                fontFamily: 'SUIT',
                fontWeight: 600,
                color: theme.colors.darkGray,
                offsetY: 0,
                formatter: (value) => {
                  const percent = ((parseInt(value) / total) * 100).toFixed(1); // 퍼센트 계산
                  return `${percent}%`; // 퍼센트 값 표시
                },
              },
            },
          },
          expandOnClick: false, // 클릭 시 확장 효과 비활성화
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      labels: chartLabels,
      dataLabels: {
        enabled: false, // 데이터 라벨 숨기기
      },
      legend: {
        show: false, // 범례 숨기기
      },
      colors: chartColors,
      tooltip: {
        enabled: false,
      },
      states: {
        hover: {
          filter: {
            type: 'lighten', // 호버 시 밝아지는 효과 적용
            value: 0.05,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false, // 여러 데이터 포인트를 동시에 선택하지 않음
          filter: {
            type: 'lighten',
            value: 0.05,
          },
        },
      },
    },
  };

  return (
    <Container>
      <DonutChartContainer>
        <div id="emotion-donut-chart" style={{ zIndex: 1 }}>
          <ReactApexChart
            options={chartOptions.options}
            series={chartOptions.series}
            type="donut"
            width="200"
          />
        </div>
        <CenterLabel />
      </DonutChartContainer>
    </Container>
  );
};

export default EmotionChart;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100%;
`;

const DonutChartContainer = styled.div`
  ${flexCenter}
  position: relative;
`;

const CenterLabel = styled.div`
  ${flexCenter}
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.shadows.around};
  font-size: 16px;
  font-weight: bold;
  z-index: 0;
`;
