import styled, { useTheme } from 'styled-components';

import type { Register } from '@models/index';

import Chart from 'react-apexcharts';

import SwipeLayout from '@components/layout/SwipeLayout';
import StatisticsContentLayout from '../StatisticsContentLayout';
import { getRegisterTypeText } from '@models/expense';

type SatisfactionProps = {
  satisfactions: {
    data: number[];
    name: string[];
  }[];
  registerType: Register;
};

const Satisfaction = ({ satisfactions, registerType }: SatisfactionProps) => {
  const theme = useTheme();
  const colors = [theme.colors.lightGreen, theme.colors.lightRed];

  return (
    <SwipeLayout>
      {satisfactions.map(({ data, name }, index) => {
        return (
          <StatisticsContentLayout
            key={index}
            message={
              <Message>
                {getRegisterTypeText(registerType)} 만족도는
                <br />
                <span className="green">
                  {name[0]}는 {data[0]}점
                </span>
                ,{' '}
                <span className="red">
                  {name[1]}는 {data[1]}점
                </span>{' '}
                이에요
              </Message>
            }>
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
                  labels: {
                    style: {
                      colors: theme.colors.darkLightGray,
                      fontSize: '14px',
                    },
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  stepSize: 1,
                  max: 5,
                  axisBorder: { show: true },

                  labels: {
                    style: {
                      colors: theme.colors.gray2,
                      fontSize: '14px',
                    },
                    formatter(val) {
                      return String(Math.floor(val));
                    },
                  },
                },
                tooltip: { enabled: false },
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
                states: {
                  hover: {
                    filter: {
                      type: 'none', // 마우스 오버 시 필터 없음
                    },
                  },
                  active: {
                    filter: {
                      type: 'none', // 클릭 시 필터 없음
                    },
                  },
                },
                colors: colors,
                dataLabels: {
                  enabled: true,
                  offsetY: -25,
                  style: {
                    fontSize: '14px',
                    fontWeight: 400,
                    colors: [theme.colors.darkGray],
                  },
                },
              }}
            />
          </StatisticsContentLayout>
        );
      })}
    </SwipeLayout>
  );
};

export default Satisfaction;

const Message = styled.div`
  & > span.green {
    color: ${(props) => props.theme.colors.lightGreen};
  }
  & > span.red {
    color: ${(props) => props.theme.colors.lightRed};
  }
`;
