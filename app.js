//app.js

var util = require('/utils/util.js')

App({
  onLaunch: function () {
    // 设置默认日期，如果是周一则提前一天，否则没有数据
    this.globalData.queryDate = util.getYesterday();
  },
  globalData: {
    userInfo: null,
    DEBUG: false,
    queryDate: "",// 查询日期
    queryDateType: "day", //查询类型
    queryDeviceArr: [] // 设备列表
  }
})