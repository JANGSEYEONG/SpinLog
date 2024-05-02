import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartData {
  series: {
    data: number[];
  }[];
}

interface BarChartProps {
  data: ChartData;
}

function BarChart({ data }: BarChartProps) {
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        colors: {
          backgroundBarColors: ['#e7e7e7'],
          backgroundBarRadius: 6,
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 120,
      style: {
        colors: ['#000'],
      },
      formatter: (val) => val + '%',
    },
    xaxis: {
      categories: [''],
      max: 100,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    colors: ['#47cfb0'],
    grid: {
      show: false,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={chartData.series}
      type="bar"
      width={400}
      height={90}
    />
  );
}

export default BarChart;
