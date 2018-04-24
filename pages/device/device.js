var util = require('../../utils/util.js')
var app = getApp();

Page({
  data: {
    deviceArray: [
      { name: 'device01', value: '设备1', checked: true },
      { name: 'device02', value: '设备2', checked: false },
      { name: 'device03', value: '设备3', checked: true },
      { name: 'device04', value: '设备4', checked: true },
      { name: 'device05', value: '设备5', checked: false },
      { name: 'device06', value: '设备6', checked: true },
      { name: 'device07', value: '设备7', checked: false },
      { name: 'device08', value: '设备8', checked: true },
      { name: 'device09', value: '设备9', checked: true },]
  },

  onLoad: function (e) {

  },

  checkboxChange: function (e) {
    app.globalData.queryDeviceArr = e.detail.value;
  }



})