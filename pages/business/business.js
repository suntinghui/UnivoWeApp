import * as echarts from '../../ec-canvas/echarts';
import * as table from '../../components/table/table';
import * as topbar from '../../components/topbar/topbar';

var util = require('../../utils/util.js');
var log = require('../../utils/log.js')

const initData = [];

var that;

var app = getApp();

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
        that.chart1 = chart1;
        refreshOption1(initData);
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
      log.d(res.data);

      refreshOption1(res.data)

      refreshTable1(res.data);

    },
    fail: function (e) {
      log.d(e);

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

  that.chart1.setOption(option);
}

function refreshTable1(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = [dt, up, down];
  }

  that.setData({ titleData1: ["日期", "上行(TB)", "下行(TB)"], listData1: tableArr });
}