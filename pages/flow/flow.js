import * as echarts from '../../ec-canvas/echarts';
import * as table from '../../components/table/table';
import * as topbar from '../../components/topbar/topbar';
import * as selectbar from '../../components/selectbar/selectbar';


var util = require('../../utils/util.js');
var log = require('../../utils/log.js');

const initData = [];

var that;

var app = getApp();

var colors = ['#004565', '#00b8b2'];

Page({
  data: {
    imgUrls: [
      '../../img/swipe/swipe01.jpg',
      '../../img/swipe/swipe02.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    swiperCurrent: 0,

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
        //refreshOption1(initData);
      }
    },

    ec2: {
      onInit: function (canvas, width, height) {
        const chart2 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart2);
        that.chart2 = chart2;
        //refreshOption2(initData);
      }
    },

    ec3: {
      onInit: function (canvas, width, height) {
        const chart3 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart3);
        that.chart3 = chart3;
        //refreshOption3(initData);
      }
    },

    ec4: {
      onInit: function (canvas, width, height) {
        const chart4 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart4);
        that.chart4 = chart4;
        //refreshOption4(initData);
      }
    },

    ec5: {
      onInit: function (canvas, width, height) {
        const chart5 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart5);
        that.chart5 = chart5;
        //refreshOption5(initData);
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

  onHide: function () {
    clearCharts();
  },
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

});

function requestCharts() {
  requestChart1();
  requestChart2();
  requestChart3();
  requestChart4();
  requestChart5();
}

function clearCharts() {
  that.chart1.clear();
  that.chart2.clear();
  that.chart3.clear();
  that.chart4.clear();
  that.chart5.clear();
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
      log.dd("7天流量走势", res.data);

      refreshOption1(res.data)

      refreshTable1(res.data);
    },
    fail: function (e) {
      log.dd("7天流量走势", e);

      refreshOption1(initData);
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
      end: monthInfo[1],
      dim: 'app.flowtrend',
      type: 'wk'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      log.dd("周累计流量", res.data);

      refreshOption2(res.data)

      refreshTable2(res.data);
    },
    fail: function (e) {
      log.dd("周累计流量", e);

      refreshOption2(initData);

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
      type: 'hour'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      log.dd("当日流量状态", res.data);

      refreshOption3(res.data)

      refreshTable3(res.data);

    },
    fail: function (e) {
      log.dd("当日流量状态", e);

      refreshOption3(initData);
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
      log.dd("分协议流量分布", res.data);

      refreshOption4(res.data)

      refreshTable4(res.data);
    },
    fail: function (e) {
      log.dd("分协议流量分布", e);

      refreshOption4(initData);

    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  })
}

// 用户流量均值
function requestChart5() {
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
      log.dd("用户流量均值", res.data);

      refreshOption5(res.data)

      refreshTable5(res.data);

    },
    fail: function (e) {
      log.dd("用户流量均值", e);

      refreshOption5(initData);
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
    color: colors,
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
    color: colors,
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

  that.chart2.setOption(option);
}

function refreshTable2(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = [dt, up, down];
  }

  that.setData({ titleData2: ["日期", "上行(TB)", "下行(TB)"], listData2: tableArr });
}

function refreshOption3(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].h;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  var option = {
    color: colors,
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

  that.chart3.setOption(option);
}

function refreshTable3(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].h + "点";
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = [dt, up, down];
  }

  that.setData({ titleData3: ["时间", "上行(TB)", "下行(TB)"], listData3: tableArr });
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

  that.chart4.setOption(option);
}

function refreshTable4(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].cname;
    var up = util.convertByteToTB(data[i].app_upbytes);
    var down = util.convertByteToTB(data[i].app_downbytes);

    tableArr[i] = [dt, up, down];
  }

  that.setData({ titleData4: ["类别", "上行(TB)", "下行(TB)"], listData4: tableArr });
}

function refreshOption5(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToGB(data[i].avg_up);
    down[i] = util.convertByteToGB(data[i].avg_down);
  }

  var option = {
    color: colors,
    title: {
      text: '用户流量均值'
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
      type: 'value'
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
  that.chart5.setOption(option);
}

function refreshTable5(data) {
  var tableArr = [];
  for (var i = 0; i < data.length; i++) {
    var dt = data[i].dt;
    var up = util.convertByteToGB(data[i].avg_up);
    var down = util.convertByteToGB(data[i].avg_down);

    tableArr[i] = [dt, up, down];
  }

  that.setData({ titleData5: ["日期", "上行(GB)", "下行(GB)"], listData5: tableArr });
}