import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartData {
  series: number[];
  labels: string[];
}

interface PieChartProps {
  data: ChartData;
}

function PieChart({ data }: PieChartProps) {
  const [chartData, setChartData] = useState<ChartData>(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: chartData.labels,
    colors: ['#fc4873', '#ffc700', '#ff88ad', '#dddddd'],
    dataLabels: {
      formatter: function (value: number, { seriesIndex, w }) {
        return w.globals.labels[seriesIndex] + ':  ' + value.toFixed(1) + '%';
      },
    },
  };

  return <ReactApexChart options={options} series={chartData.series} type="pie" width={500} />;
}

export default PieChart;
