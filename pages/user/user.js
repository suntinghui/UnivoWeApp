import * as echarts from '../../ec-canvas/echarts';
import * as table from '../../components/table/table';
import * as topbar from '../../components/topbar/topbar';

var util = require('../../utils/util.js');

const initData = [];

var app = getApp();
var that;

Page({
  data: {
    selectDate: app.globalData.queryDate,
    selectMode: util.getSelectMode(app.globalData.queryDateType),
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
  },

  onReady: function () {
    requestCharts();
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {
    this.setData({
      selectDate: app.globalData.queryDate,
      selectMode: util.getSelectMode(app.globalData.queryDateType)
    });

    requestCharts();
  },

});

function requestCharts() {
  requestChart1();
  requestChart2();
}

// 活跃用户月走势图
function requestChart1() {
  wx.showNavigationBarLoading();

  var monthInfo = util.getMonthInfo(app.globalData.queryDate);

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: monthInfo[0],
      end: monthInfo[1],
      dim: 'app.user',
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
  wx.showNavigationBarLoading();

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: app.globalData.queryDate,
      end: app.globalData.queryDate,
      dim: 'app.flowtrend',
      type: 'hour'
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

////////////////////////////////////////////////////////////////////////////////////////////

function refreshOption1(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToGB(data[i].avg_up);
    down[i] = util.convertByteToGB(data[i].avg_down);
  }

  var option = {
    title: {
      text: '活跃用户月走势图'
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
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dt
    },
    yAxis: {
      type: 'value',
      name: '流量(GB)',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '上行',
        type: 'line',
        stack: '流量(GB)',
        data: up
      },
      {
        name: '下行',
        type: 'line',
        stack: '流量(GB)',
        data: down
      }
    ]
  };
  return option;
}

function refreshTable1(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToGB(data[i].avg_up);
    var down = util.convertByteToGB(data[i].avg_down);

    tableArr[i] = {
      dt: dt,
      upbytes: up,
      downbytes: down
    };
  }

  that.setData({ titleData1: ["日期", "上行(GB)", "下行(GB)"], listData1: tableArr });
}

function refreshOption2(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].h;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  var option = {
    title: {
      text: '活跃用户24小时分布图'
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
      name: '流量(GB)',
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
    var dt = data[i].h + "点";
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = {
      dt: dt,
      upbytes: up,
      downbytes: down
    };
  }

  that.setData({ titleData2: ["日期", "上行(GB)", "下行(GB)"], listData2: tableArr });
}
