import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import data from '../APIs/linhas.json';

type SeriesState = {
  monthDataSeries1: {
    threshold: number[];
    index: number[];
    dates: number[];
  };
} | null;

  const GaficoLinha = () => {
    const [series, setSeries] = useState<SeriesState>(null);

    useEffect(() => {
      fetch('../src/APIs/linhas.json')
        .then(response => response.json())
        .then(data => {
          setSeries({
            monthDataSeries1: {
              threshold: data.map((item: { threshold: number[]; }) => item.threshold),
              index: data.map((item: { index: number[]; }) => item.index),
              dates: data.map((item: { timestamp: string | number | Date; }) => new Date(item.timestamp).getTime()),
            }
          });
        });
    }, []);

    if (!series) {
      return null;
    }

    const options: ApexOptions = {
      series: [{
        name: 'Threshold',
        data: series.monthDataSeries1.threshold,
      }, {
        name: 'Index',
        data: series.monthDataSeries1.index,
      }],
      chart: {
        height: 350,
        type: 'line',
        id: 'areachart-2',
        animations: {
          enabled: false,
        }
      },
      annotations: {
        xaxis: [
          {
            x: new Date('2023-11-06 12:10').getTime(),
            x2: new Date('2023-11-06 15:30').getTime(),
            fillColor: '#EA1100',
            opacity: 0.4,
            label: {
              borderColor: '#7A0A00',
              style: {
                fontSize: '10px',
                color: '#fff',
                background: '#EA1100',
              },
              offsetY: -10,
              text: 'Off',
            }
          },
          {
            x: new Date('2023-11-06 10:30').getTime(),
            x2: new Date('2023-11-06 12:10').getTime(),
            fillColor: '#FA8E50',
            opacity: 0.4,
            label: {
              borderColor: '#FA6E19',
              style: {
                fontSize: '10px',
                color: '#fff',
                background: '#FA8E50',
              },
              offsetY: -10,
              text: 'Progress',
            }
          },
          {
            x: new Date('2023-11-06 15:30').getTime(),
            x2: new Date('2023-11-06 16:40').getTime(),
            fillColor: '#FA8E50',
            opacity: 0.4,
            label: {
              borderColor: '#FA6E19',
              style: {
                fontSize: '10px',
                color: '#fff',
                background: '#FA8E50',
              },
              offsetY: -10,
              text: 'Progress',
            }
          }
        ],
      },
      legend: {
        show: true,
      },

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: [2, 2]

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
      title: {
        text: 'Grafico Line',
        align: 'left'
      },
      labels: series.monthDataSeries1.dates.map((date: string | number | Date) => new Date(date).toISOString()),

      yaxis: {
        labels: {
          formatter: function (val: number) {
            return val.toFixed(1);
          }
        }
      },

      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            day: 'dd MMM yyyy',
          }
        },
        categories: data.map(item => item.timestamp)
      },
      noData: {
        text: 'No Data'
      }
    };

    return (
      <div id="chart">
        <ReactApexChart options={options} series={options.series} type="line" height={350} />
      </div>
    );
  };

export default GaficoLinha;
