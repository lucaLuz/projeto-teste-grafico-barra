import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import data from '../APIs/heatmp.json'
import { useEffect, useState } from 'react';


// interface OriginalData {
//   timestamp: Record<string, string>;
//   [key: string]: Record<string, number>;
// }
 
// interface TransformedData {
//   name: string;
//   data: { x: string; y: number }[];
// }
 
// const originalData: OriginalData[] = [
//   {
//     timestamp: {
//       "0": "2023-11-06 08:21:00",
//       "1": "2023-11-06 08:22:00",
//       "2": "2023-11-06 08:23:00",
//       "3": "2023-11-06 08:24:00",
//       "4": "2023-11-06 08:25:00",
//       "5": "2023-11-06 08:26:00",
//     },
//     "222T781.PV": {
//       "0": 2.6974113132,
//       "1": 2.7484794523,
//       "2": 2.7470019886,
//       "3": 2.6371314306,
//       "4": 2.786195858,
//       "5": 1.2701894397,
//     },
//     "222F753.PV": {
//       "0": 0,
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 0,
//       "5": 0,
//     },
//     "222W761.PV": {
//       "0": 0,
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 0,
//       "5": 0,
//     },
//   },
// ];
 
// const transformedData: TransformedData[] = Object.keys(originalData[0]).reduce(
//   (result, key) => {
//     if (key !== "timestamp") {
//       const newData: { x: string; y: number }[] = Object.keys(
//         originalData[0].timestamp
//       ).map((timestampKey) => ({
//         x: originalData[0].timestamp[timestampKey],
//         y: originalData[0][key][timestampKey],
//       }));
 
//       result.push({ name: key, data: newData });
//     }
//     return result;
//   },
//   [] as TransformedData[]
// );
 
// console.log(JSON.stringify(transformedData, null, 2));

function generateData(count: number, yrange: { min: any; max: any; }) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push({ x: x, y: y });
    i++;
  }
  return series;
}

const GraficoHeatmap = () => {

    const [data, setData] = useState();
    useEffect (() => {
        fetch('../src/APIs/heatmp.json')
        .then((response) => response.json())
            .then((json) => {setData(json)});
    });
    
    const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
      animations:{
        enabled: false
      }
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [{
              from: -30,
              to: 5,
              name: 'low',
              color: '#00A100'
            },
            {
              from: 6,
              to: 20,
              name: 'medium',
              color: '#128FD9'
            },
            {
              from: 21,
              to: 45,
              name: 'high',
              color: '#FFB200'
            },
            {
              from: 46,
              to: 55,
              name: 'extreme',
              color: '#FF0000'
            }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1
    },
    title: {
      text: 'HeatMap Chart with Color Range'
    },
  };

 const series:ApexAxisChartSeries = [{
    name: 'Jan',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Feb',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Mar',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Apr',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'May',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Jun',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Jul',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Aug',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  },
  {
    name: 'Sep',
    data: generateData(20, {
      min: -30,
      max: 55
    })
  }
]

  return (
<>
      <ReactApexChart options={options} series={series} type="heatmap" height={350} />
    </>
  );
  }

export default GraficoHeatmap;
