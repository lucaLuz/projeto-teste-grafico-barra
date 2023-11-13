import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';


const GraficoHeatmap = () => {

  const [data, setData] = useState<{ name: string; data: { x: string; y: number; }[]; }[]>([]);

  useEffect(() => {
    fetch('../src/APIs/heatmp.json')
      .then(response => response.json())
      .then(data => {

        const seriesNomes = Object.keys(data).filter(key => key !== 'timestamp');

        const formattedData = seriesNomes.map(name => {

          const dataPoints = Object.keys(data[name]).map(key => {


            return {
              x: data.timestamp[key],
              y: data[name][key]
            };
          });


          return {
            name,
            data: dataPoints
          };
        });

        setData(formattedData);
      });
  }, []);
  // console.log(data)
  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false
      },
      height: 350,
      type: 'heatmap',
      animations: {
        enabled: false
      }
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        // colorScale: {
        //   ranges: [{
        //     from: -30,
        //     to: 1,
        //     name: 'low',
        //     color: '#00A100'
        //   },
        //   {
        //     from: 3,
        //     to: 5,
        //     name: 'medium',
        //     color: '#128FD9'
        //   },
        //   {
        //     from: 10,
        //     to: 30,
        //     name: 'high',
        //     color: '#FFB200'
        //   },
        //   {
        //     from: 30,
        //     to: 40,
        //     name: 'extreme',
        //     color: '#FF0000'
        //   }
        //   ]
        // }
      }
    },
    tooltip: {
      shared: true,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        format: 'dd MMM yyyy HH:mm',
      },

    },
    // theme: {
    //   mode: 'light', 
    //   // palette: 'palette10', 
    //   monochrome: {
    //       enabled: true,
    //       color: '#0F293A',
    //       shadeTo: 'dark',
    //       shadeIntensity: 0.65
    //   },
    // },
     colors: ["#0F293A","#13AFDB","#CECFD1","#F79D1C","#FB8102","#F15F3E"],
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          day: 'dd MMM yyyy',
        }

      },
    },
    noData: {
      text: 'No Data'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1
    },
    title: {
      text: ' Grafico HeatMap'
    },
    grid: {
      padding: {
        right: 20
      }
    }
  };



  return (
    <>
      <ReactApexChart options={options} series={data} type="heatmap" height={350} />
    </>
  );
}

export default GraficoHeatmap;
