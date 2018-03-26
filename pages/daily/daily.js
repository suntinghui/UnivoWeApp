var util = require('../../utils/util.js')
var app = getApp();

Page({
  data: {
    selectedDate: app.globalData.queryDate,
    maxDate:util.getYesterday(),

    dateTypeArr: [{ name: 'day', value: '日报', checked: true },
    { name: 'week', value: '周报', checked: false },
    { name: 'month', value: '月报', checked: false }],

    deviceArray: [{ name: 'device01', value: '设备1', checked: true },
    { name: 'device02', value: '设备2', checked: false },
    { name: 'device03', value: '设备3', checked: true },
    { name: 'device04', value: '设备4', checked: true },]
  },

  onLoad: function (e) {
    this.setData({
      selectedDate: app.globalData.queryDate
    });
  },

  // 切换日期操作
  changeDate: function (e) {
    this.setData({
      selectedDate: e.detail.value
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