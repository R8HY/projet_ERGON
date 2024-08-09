// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //
function chartData(donnees){
    const chartData = {
    type: 'area',
    height: 90,
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
        data: donnees
      }
    ]
  };

  return chartData
}


export default chartData;
