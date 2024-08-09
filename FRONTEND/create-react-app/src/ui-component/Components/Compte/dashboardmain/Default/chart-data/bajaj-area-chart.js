// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //

function Chart(data){
  const chartData = {
    type: 'area',
    height: 400,
    options: {
      chart: {
        id: 'support-chart',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: 'Ticket '
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      {
        data: data
      }
    ]
  };
  return chartData
}

export default Chart;
