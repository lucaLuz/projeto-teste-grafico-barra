import { ApexOptions} from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

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
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      }
    },
    
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toString().substring(0,4) + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories:Object.values(data.VARIAVEL),
      labels:{
        formatter: function (val) {
          return val.toString()  ;
        },
      }
    },
    yaxis: {
      title: {
        text: '% Contribuição'
      },
      labels:{
        formatter: function(val){
          return val.toFixed(1) + '%'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: function(val, opts) {
          return val + " : " + data.DESC[opts.dataPointIndex] ;
        }
      }
    },
  };

  const series: ApexAxisChartSeries = [{
    name: 'Contribuição',
    data: Object.values(data['%']),
  },
];
  
  return (
    <>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </>
  );
};

export default GraficoBarra;
