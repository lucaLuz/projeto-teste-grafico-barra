import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const MyChart = () => {
  const [data, setData] = useState<{ name: string; data: { x: string; y: number; }[]; }[]>([]);


  useEffect(() => {
    fetch('../src/APIs/heatmp.json')
      .then(response => response.json())
      .then(data => {
        const seriesNames = Object.keys(data).filter(key => key !== 'timestamp');
        const formattedData = seriesNames.map(name => {
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

  const options = {
    // suas opções de gráfico aqui
  };

  return <Chart options={options} series={data} type="heatmap" />;
};

export default MyChart;
