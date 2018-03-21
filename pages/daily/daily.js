var util = require('../../utils/util.js')
var app = getApp();

Page({
  data: {
    currentDate: util.getCurrentDate(),

    dateTypeArr: [{ name: 'day', value: '按天', checked: true },
    { name: 'week', value: '按周', checked: false },
    { name: 'month', value: '按月', checked: false }],

    deviceArray: [{ name: 'device01', value: '设备1', checked: true },
    { name: 'device02', value: '设备2', checked: false },
    { name: 'device03', value: '设备3', checked: true },
    { name: 'device04', value: '设备4', checked: true },]
  },

  // 切换日期操作
  changeDate: function (e) {
    this.setData({
      currentDate: e.detail.value
    });

    app.globalData.queryDate = e.detail.value;
  },

  // 切换查询日期类型
  radioChange: function (e) {
    app.globalData.queryDateType = e.detail.value;
  },

  checkboxChange:function(e) {
    app.globalData.queryDeviceArr = e.detail.value;
  }



})