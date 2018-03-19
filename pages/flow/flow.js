import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '连接分布',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    /*
    legend: {
      orient: 'vertical',
      left: 'left',
      top:'30px',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    */
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'HTTP协议' },
          { value: 310, name: '常用协议' },
          { value: 234, name: 'P2P下载' },
          { value: 135, name: '移动应用' },
          { value: 1548, name: '网络电视' },
          { value: 1548, name: '其它' },
          { value: 1548, name: '网络游戏' },
          { value: 1548, name: '未知流量' },
          { value: 1548, name: '即时通信' },
          { value: 1548, name: '流媒体' },
          { value: 1548, name: '网络电话' },
          { value: 1548, name: '股票交易' },
          { value: 1548, name: '数据库' },
          { value: 1548, name: '自定义协议' }
        ],
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

  chart.setOption(option);
  return chart;
}

function updateData(data) {
  var arr = [];
  for (var i = 0; i < data.x.length; i++) {
    var obj = {};
    obj = {
      value: data.ytotal[i],
      name: data.x[i]
    };
    arr[i] = obj;
  }

  var option = {
    title: {
      text: '连接分布',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    /*
    legend: {
      orient: 'vertical',
      left: 'left',
      top:'30px',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    */

    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: arr,
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

  chart.setOption(option);
}

function queryRequest() {

  wx.request({
    url: "https://gateway.cne-c.com/tomobile_action.php",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      "action": "loadHomepie",
      "sday": "2018-03-12"
    },
    method: "GET",
    dataType: "json",
    success: function (res) {
      console.log(res.data);
      // 更新数据
      updateData(res.data);

    },
    fail: function (err) {
      console.log(err);

      wx.showToast({ title: "出现错误" });
    }

  })

}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    queryRequest();
  }

});
