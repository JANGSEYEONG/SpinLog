import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
}

interface LineChartProps {
  data: ChartData;
}

function LineChart({ data }: LineChartProps) {
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: '일별 금액',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30,
      ],
      min: 0,
      max: 30,
      tickAmount: 5,
      tickPlacement: 'on',
      labels: {
        show: true,
        rotate: 0,
      },
    },
    yaxis: {
      min: 0,
      labels: {
        show: true,
      },
    },
  };

  return <ReactApexChart options={options} series={chartData.series} type="line" height={350} />;
}

export default LineChart;
