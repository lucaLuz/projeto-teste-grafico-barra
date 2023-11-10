import { ApexOptions} from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import json from '../APIs/barras.json'

interface DataType {
  DESC: string[];
  VARIAVEL: string[];
  '%': number[];
}

const GraficoBarra: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetch('../src/APIs/barras.json')
      .then(response => response.json())
      .then((data: DataType) => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);
  
  
  if (!data) {
    console.log(data);
    return <div>Loading...</div>;
  }

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      animations: {
        enabled: false,
      }
    },

    dataLabels: {
      enabled: true
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories:Object.values(data.VARIAVEL),
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      },
      labels:{
        formatter: function(val){
          return val.toFixed(1)
        }
      }
    },
    fill: {
      opacity: 1
    },
  };

  const series: ApexAxisChartSeries = [{
    name: 'valor',
    data: Object.values(data['%'])
  }];
  
  return (
    <>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </>
  );
};

export default GraficoBarra;
