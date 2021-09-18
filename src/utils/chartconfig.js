export const options = {
  title: {
    text: ' '
  },
  chart: {
    height: 555,
  },
  caption: {
    align: "right",
  },
  xAxis: {
    lineWidth: 0,
    gridLineWidth: 30,
    gridLineColor: '#fafafa',
  },
  yAxis: [{
    title: {
      text: ' '
    },
    opposite: false,
    labels: {
      enabled: false,
    },
    gridLineWidth: 0,
    align: 'right'
  }, {
    title: {
      text: ' '
    },
    opposite: true,
    labels: {
      align: 'center',
    },
    gridLineWidth: 0,
    align: 'right',
  }],
  series: [],
}

export const SERIES = [
  {
  type: 'column',
  data: [],
  showInLegend: false,
  yAxis: 0,
  name: 'Volume',
}, 
{
  type: 'spline',
  data: [],
  showInLegend: false,
  yAxis: 1,
  name: 'Close',
  marker: {
    radius: 1,
  }
}]