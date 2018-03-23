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
    //requestChart1();
    //requestChart2();
    //requestChart3();
    requestChart4();
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
      start: '20180319',
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

function requestChart2() {
  wx.showNavigationBarLoading();

  wx.request({
    url: 'https://wx.cne-c.com/mobile/api/app',
    method: 'GET',
    data: {
      start: '20180305',
      end: '20180318',
      dim: 'app.flowtrend',
      type: 'wk'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      refreshOption2(res.data);
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
      start: '20180301',
      end: '20180321',
      dim: 'app.flowtrend',
      type: 'day'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      refreshOption3(res.data);
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
      start: '20180321',
      end: '20180321',
      dim: 'app.apx',
      type: 'day'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      refreshOption4(res.data);
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

  for (var i=0; i<data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  console.log(dt);
  console.log(up);
  console.log(down);
  
  up = [2.94,2.9,2.94];
  down = [20.38,21.06,22.17];

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

function refreshOption2(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i = 0; i < data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  console.log(dt);
  console.log(up);
  console.log(down);

  dt = ["2018-03-05", "2018-03-12"];
  up = [7.65, 23.06];
  down = [54.32, 171.36];

  var option = {
    title: {
      text: '周累计流量图'
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

function refreshOption3(data) {
  var dt = [];
  var up = [];
  var down = [];

  for (var i=0; i<data.length; i++) {
    dt[i] = data[i].dt;
    up[i] = util.convertByteToTB(data[i].app_upbytes);
    down[i] = util.convertByteToTB(data[i].app_downbytes);
  }

  console.log(dt);
  console.log(up);
  console.log(down);

  dt = ["2018-03-10", "2018-03-11", "2018-03-12", "2018-03-13", "2018-03-14", "2018-03-15", "2018-03-16", "2018-03-17", "2018-03-18", "2018-03-19", "2018-03-20", "2018-03-21"];
  up = [3.89, 3.76, 2.92, 3.07, 3.11, 3.15, 3.32, 4.04, 3.45, 2.94, 2.9, 2.94];
  down = [28.13, 26.19, 20.19, 25.33, 24.03, 24.79, 24.91, 26.96, 25.15, 20.38, 21.06, 22.17];

  var option = {
    title: {
      text: '当日流量状态'
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

function refreshOption4(data) {
  var legendData = [];
  var seriesData = [];

  for (var i=0; i<data.length; i++) {
    legendData.push(data[i].cname);
    seriesData.push({
      name: data[i].cname,
      value: (data[i].app_upbytes + data[i].app_downbytes)
    });
  }

  console.log(legendData);
  console.log(seriesData);

  legendData = ["未知流量", "常用协议", "P2P下载", "网络电视", "即时通信", "流媒体", "网络电话", "网络游戏", "股票交易", "数据库", "其它", "HTTP协议", "移动应用"];
  seriesData = [
    {name: "未知流量", value: "158587778534302742118940" },
  {name: "常用协议", value: "3392896846014113475013510" },
  {name: "P2P下载", value: "8837746647951744620437255" },
  {name: "网络电视", value: "507399500923952671305856" },
  {name: "即时通信", value: "75411329863249671600466" },
  {name: "流媒体", value: "1499958988234273997723" },
  {name: "网络电话", value: "759998024404154822" },
  {name: "网络游戏", value: "134103316084600579176701" },
  {name: "股票交易", value: "126801518523423619" },
  {name: "数据库", value: "3010041392966" },
  {name: "其它", value: "242959094070543467018058" },
  {name: "HTTP协议", value: "73796848689014029365128836" },
  {name: "移动应用", value: "1415406193891808192482980" }
  ];

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
