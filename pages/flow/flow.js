import * as echarts from '../../ec-canvas/echarts';

var util = require('../../utils/util.js');

const initData = [];

Page({
  data: {
    ec1: {
      onInit: function (canvas, width, height) {
        const chart1 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart1);
        chart1.setOption(refreshOption1(initData));
      }
    },

    ec2: {
      onInit: function (canvas, width, height) {
        const chart2 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart2);

        chart2.setOption(refreshOption2([initData]));
      }
    },

    ec3: {
      onInit: function (canvas, width, height) {
        const chart3 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart3);

        chart3.setOption(refreshOption3(initData));
      }
    },

    ec4: {
      onInit: function (canvas, width, height) {
        const chart4 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart4);

        chart4.setOption(refreshOption4(initData));
      }
    },

    ec5: {
      onInit: function (canvas, width, height) {
        const chart5 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart5);

        chart5.setOption(refreshOption5(initData));
      }
    },

    ec6: {
      onInit: function (canvas, width, height) {
        const chart6 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart6);

        chart6.setOption(refreshOption6(initData));
      }
    },

    ec7: {
      onInit: function (canvas, width, height) {
        const chart7 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart7);

        chart7.setOption(refreshOption7(initData));
      }
    },

    ec8: {
      onInit: function (canvas, width, height) {
        const chart8 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart8);

        chart8.setOption(refreshOption8(initData));
      }
    },

    ec9: {
      onInit: function (canvas, width, height) {
        const chart9 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart9);

        chart9.setOption(refreshOption9(initData));
      }
    },
  },

  onReady: function(){
    requestChart1();
  },

  settingAction: function (event) {
    wx.navigateTo({
      url: '../daily/daily'
    })
  },

});

function requestChart1() {
  wx.showNavigationBarLoading();

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: '20180301',
      end: '20180321',
      dim:'app.flowtrend',
      type:'day'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      refreshOption1(res.data);
    },
    fail:function(e) {
      console.log(e);
      
    },
    complete:function() {
      wx.hideNavigationBarLoading();
    }
  })
}

////////////////////////////////////////////////////////////////////////////////////////////

function refreshOption1(data) {
  return {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  };
}

function refreshOption2() {

  var data = [];
  var data2 = [];

  for (var i = 0; i < 10; i++) {
    data.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 40)
      ]
    );
    data2.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    );
  }

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  };

  return {
    color: ["#FF7070", "#60B6E3"],
    backgroundColor: '#eee',
    xAxis: axisCommon,
    yAxis: axisCommon,
    legend: {
      data: ['aaaa', 'bbbb']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [{
      type: 'scatter',
      name: 'aaaa',
      data: data
    },
    {
      name: 'bbbb',
      type: 'scatter',
      data: data2
    }
    ],
    animationDelay: function (idx) {
      return idx * 50;
    },
    animationEasing: 'elasticOut'
  };
}

function refreshOption3() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}

function refreshOption4() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}

function refreshOption5() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}

function refreshOption6() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}

function refreshOption7() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}

function refreshOption8() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}

function refreshOption9() {
  var option = {
    title: {
      text: '7天流量走势图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
      type: 'value',
      name: '总价(万元)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '包租费',
      type: 'bar',
      data: [20, 12, 31, 34, 31]
    }, {
      name: '装修费',
      type: 'bar',
      data: [10, 20, 5, 9, 3]
    }]
  };

  return option;
}
