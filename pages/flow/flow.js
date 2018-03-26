import * as echarts from '../../ec-canvas/echarts';
import * as table from '../../components/table/table';

var util = require('../../utils/util.js');

const initData = [];

var app = getApp();
var that;

Page({
  data: {
    ec1: {
      onInit: function (canvas, width, height) {
        const chart1 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart1);
        app.chart1 = chart1;
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
        app.chart2 = chart2;
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
        app.chart3 = chart3;
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
        app.chart4 = chart4;
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

  onReady: function () {
    requestCharts();
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {
    requestCharts();
  },

  settingAction: function (event) {
    wx.navigateTo({
      url: '../daily/daily'
    })
  },

});

function requestCharts() {
  requestChart1();
  requestChart2();
  requestChart3();
  requestChart4();
}

function requestChart1() {
  wx.showNavigationBarLoading();

  var weekInfo = util.getWeekInfo(app.globalData.queryDate);

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: weekInfo[0],
      end: weekInfo[1],
      dim: 'app.flowtrend',
      type: 'day'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      app.chart1.setOption(refreshOption1(res.data));

      refreshTable1(res.data);

    },
    fail: function (e) {
      console.log(e);

    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  })
}

function requestChart2() {
  var monthInfo = util.getMonthInfo(app.globalData.queryDate);

  wx.showNavigationBarLoading();

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: monthInfo[0],
      end: monthInfo[1] ,
      dim: 'app.flowtrend',
      type: 'wk'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      app.chart2.setOption(refreshOption2(res.data));

      refreshTable2(res.data);
    },
    fail: function (e) {
      console.log(e);

    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  })
}

// 当日流量状态
function requestChart3() {
  wx.showNavigationBarLoading();

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: app.globalData.queryDate,
      end: app.globalData.queryDate,
      dim: 'app.flowtrend',
      type: 'day'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      app.chart3.setOption(refreshOption3(res.data));

      refreshTable3(res.data);

    },
    fail: function (e) {
      console.log(e);

    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  })
}

// 分协议流量分布
function requestChart4() {
  wx.showNavigationBarLoading();

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: app.globalData.queryDate,
      end: app.globalData.queryDate,
      dim: 'app.apx',
      type: 'day'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      app.chart4.setOption(refreshOption4(res.data));

      refreshTable4(res.data);

    },
    fail: function (e) {
      console.log(e);

    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  })
}

////////////////////////////////////////////////////////////////////////////////////////////

function refreshOption1(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  var option = {
    title: {
      text: '7天流量走势图'
    },
    legend: {
      data: ['上行', '下行'],
      align: 'right',
      right:'0'
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
      data: dt
    }],
    yAxis: [{
      type: 'value',
      name: '流量(TB)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '上行',
      type: 'bar',
      data: up
    }, {
      name: '下行',
      type: 'bar',
      data: down
    }]
  };

  return option;
}

function refreshTable1(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = {dt:dt,
    upbytes:up,
    downbytes:down};
  }
 
  that.setData({ listData1: tableArr });
}

function refreshOption2(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  var option = {
    title: {
      text: '周累计流量图'
    },
    legend: {
      data: ['上行', '下行'],
      align: 'right',
      right: '0'
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
      data: dt
    }],
    yAxis: [{
      type: 'value',
      name: '流量(TB)',
      axisLabel: {
        formatter: '{value}'
      }
    }],
    series: [{
      name: '上行',
      type: 'bar',
      data: up
    }, {
      name: '下行',
      type: 'bar',
      data: down
    }]
  };

  return option;
}

function refreshTable2(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = {
      dt: dt,
      upbytes: up,
      downbytes: down
    };
  }

  that.setData({ listData2: tableArr });
}

function refreshOption3(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  var option = {
    title: {
      text: '当日流量状态'
    },
    legend: {
      data: ['上行', '下行'],
      align: 'right',
      right: '0'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dt
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '上行',
        type: 'line',
        stack: '流量(TB)',
        data: up
      },
      {
        name: '下行',
        type: 'line',
        stack: '流量(TB)',
        data: down
      }
    ]
  };
  return option;
}

function refreshTable3(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = {
      dt: dt,
      upbytes: up,
      downbytes: down
    };
  }

  that.setData({ listData3: tableArr });
}

function refreshOption4(data) {
  var legendData = [];
  var seriesData = [];

  for (var i = 0; i < data.length; i++) {
    legendData.push(data[i].cname);
    seriesData.push({
      name: data[i].cname,
      value: (data[i].app_upbytes + data[i].app_downbytes)
    });
  }

  var option = {
    title: {
      text: '分协议流量分布',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b}:{d}%"
    },
    series: [
      {
        name: '流量',
        type: 'pie',
        radius: '40%',
        center: ['45%', '70%'],
        data: seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return option;
}

function refreshTable4(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].cname;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = {
      dt: dt,
      upbytes: up,
      downbytes: down
    };
  }

  that.setData({ listData4: tableArr });
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
