import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import data from './barras.json'

const App: React.FC = () => {

  const options: ApexOptions = {
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: false,
        }
      },

      dataLabels: {
        enabled: false
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

 const series:ApexAxisChartSeries = [{
    name: Object.values(data.DESC).toString(),
    data:Object.values(data['%'])
  }];

  return (
    <>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </>
  );
};

export default App;