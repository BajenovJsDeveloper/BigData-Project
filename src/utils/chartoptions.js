export const options = {
  title: {
    text: ' '
  },
  caption: {
    align: "right",
  },
  xAxis: {
    lineWidth: 0,
    gridLineWidth: 50,
    gridLineColor: '#fafafa',
    categories: ['Foo', 'Bar', 'Foobar'],
    // labels: {
    //   // format: '${text}',
    //   formatter: function () {
    //     var label = this.axis.defaultLabelFormatter.call(this);

    //     return label
    //   }
    // },
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
      align: 'left',
    },
    gridLineWidth: 0,
    align: 'right',
  }],
  series: [
    // {
    //   type: 'column',
    //   data: [],
    //   showInLegend: false,
    //   yAxis: 0
    // },
    // {
    //   type: 'spline',
    //   data: [],
    //   showInLegend: false,
    //   yAxis: 1
    // }
  ],
}