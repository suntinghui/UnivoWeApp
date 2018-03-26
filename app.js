//app.js

var util = require('/utils/util.js')

App({
  onLaunch: function () {
    this.globalData.queryDate = util.getYesterday();
  },
  globalData: {
    userInfo: null,
    queryDate: "",// 查询日期
    queryDateType: "day", //查询类型
    queryDeviceArr:[] // 设备列表
  }
})