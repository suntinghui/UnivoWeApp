var util = require('../../utils/util.js');
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectedDate: {
      type: String,
      value: "",
      observer: function (newData, oldData) {

      }
    },
    maxDate: {
      type: String,
      value: "",
      observer: function (newData, oldData) {

      }
    },


  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedDate: app.globalData.queryDate,
    maxDate: util.getYesterday(),
    typeArray: ["日报", "周报", "月报"],
    deviceValue: [],
    deviceArray: [{ name: 'A', value: '设备一' }, { name: 'B', value: '设备二' }, { name: 'C', value: '设备三' }, { name: 'D', value: '设备四' }, { name: 'E', value: '设备五' }, { name: 'F', value: '设备六' }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeDate: function (e) {
      app.globalData.queryDate = e.detail.value;
    },

    changeType: function (e) {
      app.globalData.queryDateType = e.detail.value;
    },

    changeDevice: function (e) {
      app.globalData.queryDateType = e.detail.value;
    },

  }
})
