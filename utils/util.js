const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// 取得当前的日期，格式为YYYY-MM-dd
function getCurrentDate() {
  var myDate = new Date();
  return myDate.format("yyyy-MM-dd");
}

// 取得昨天日期
function getYesterday() {
  var day1 = new Date();
  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  var month = day1.getMonth() + 1;

  var s = day1.format("yyyy-MM-dd");

  return s;
}

// 获取给定日期所在周的周一和周日
function getWeekInfo(yyyyMMdd) {
  var theDay = new Date(yyyyMMdd);
  var monday = new Date(theDay.getTime());
  var sunday = new Date(theDay.getTime());
  monday.setDate(monday.getDate() + 1 - getChinaDay(monday));
  sunday.setDate(sunday.getDate() + 7 - getChinaDay(sunday));

  return [monday.format("yyyy-MM-dd"), sunday.format("yyyy-MM-dd")];
}

// 从 Date 对象返回一周中的某一天 (0 ~ 6)=》( 1-7)
function getChinaDay(date) {
  var theDay = date.getDay();
  if (theDay == 0)
    return 7;
  else
    return theDay;
}

// 获取给定日期所在月的第一天和最后一天
function getMonthInfo(yyyyMMdd) {
  var tempDate = new Date(yyyyMMdd);
  var year = tempDate.getFullYear();
  var month = tempDate.getMonth() + 1;
  var day = new Date(year, month, 0);

  if (month < 10) {
    month = '0' + month;
  }

  var firstdate = year + '-' + month + '-01';
  var lastdate = year + '-' + month + '-' + day.getDate();

  return [firstdate, lastdate];
}

// 将自符串byte转化成TB
function convertByteToTB(b) {
  var TB = new Number(b) / 1024 / 1024 / 1024 / 1024;
  return parseFloat(TB.toFixed(2));
}

// 将自符串byte转化成GB
function convertByteToGB(b) {
  var TB = new Number(b) / 1024 / 1024 / 1024;
  return parseFloat(TB.toFixed(2));
}

function getSelectMode(mode) {
  if (mode == 'day') {
    return '日报';
  }

  if (mode == 'wk') {
    return '周报';
  }

  if (mode == 'mon') {
    return '月报';
  }

  return '未知';
}

module.exports = {
  formatTime: formatTime,
  getCurrentDate: getCurrentDate,
  getYesterday: getYesterday,
  getWeekInfo: getWeekInfo,
  getMonthInfo: getMonthInfo,
  convertByteToGB: convertByteToGB,
  convertByteToTB: convertByteToTB,
  getSelectMode: getSelectMode
}


