import React, { useEffect } from 'react';
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

export default function BarChart({ figureId, data }) {
  useEffect(() => {
    renderChart();
  }, []);

  const renderChart = () => {
    Highcharts.chart(figureId, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Monthly Sales Report',
      },
      subtitle: false,
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Monthly Sales',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Sales: <b>{point.y:.1f}</b>',
      },
      series: [
        {
          name: 'Sales',
          data: data,
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}',
            y: 10,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
      ],
    });
  };
  return (
    <div>
      <figure>
        <div id={figureId}></div>
      </figure>
    </div>
  );
}
