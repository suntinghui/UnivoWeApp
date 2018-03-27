// components/topbar/topbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: {
      type: Array,
      value: [],
      observer: function (newData, oldData) {

      }
    },
    selectDate: {
      type: String,
      value: "",
      observer: function (newData, oldData) {

      }
    },
    selectMode: {
      type: String,
      value: "",
      observer: function (newData, oldData) {

      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    settingAction: function () {
      wx.navigateTo({
        url: '../daily/daily'
      })
    }

  }
})
