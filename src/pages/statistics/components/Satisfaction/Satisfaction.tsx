import Chart from 'react-apexcharts';
import SwipeContainer from '../SwipeContainer';
import StatisticsContentLayout from '../StatisticsContentLayout';

type SatisfactionProps = {
  satisfactions: {
    data: number[];
    name: string[];
  }[];
};

const Satisfaction = ({ satisfactions }: SatisfactionProps) => {
  return (
    <SwipeContainer>
      {satisfactions.map(({ data, name }, index) => {
        return (
          <StatisticsContentLayout
            key={index}
            message={`최근 90일 내 감정 소비에 대해\n${name[0]}는 ${data[0]}점, ${name[1]}은 ${data[1]}점을 주었어요`}>
            <Chart
              height={'80%'}
              width={'90%'}
              type="bar"
              series={[{ data }]}
              options={{
                grid: {
                  show: false,
                },
                legend: {
                  show: false,
                },
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: name,
                },
                yaxis: {
                  stepSize: 1,
                  max: 5,
                  axisBorder: { show: true },
                  labels: {
                    formatter(val) {
                      return String(Math.floor(val));
                    },
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 15,
                    borderRadiusApplication: 'end',
                    columnWidth: 30,
                    dataLabels: {
                      position: 'top',
                    },
                    distributed: true,
                  },
                },
                colors: ['#47CFB0', '#C3EBE2'],
                dataLabels: {
                  enabled: true,
                  offsetY: -25,
                  style: {
                    fontSize: '12px',
                    colors: ['#304758'],
                  },
                },
              }}
            />
          </StatisticsContentLayout>
        );
      })}
    </SwipeContainer>
  );
};

export default Satisfaction;
