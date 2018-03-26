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

// 取得当前的日期，格式为YYYY-MM-dd
function getCurrentDate() {
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  if (month < 10) {
    return myDate.getFullYear() + "-0" + month + "-" + myDate.getDate();
  } else {
    return myDate.getFullYear() + "-" + month + "-" + myDate.getDate();
  }
}

// 取得昨天日期
function getYesterday() {
  var day1 = new Date();
  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
  return s1;
}

// 将给定的date转换成yyyy-MM-dd
function convertStringFromDate(date) {
  var month = date.getMonth() + 1;
  if (month < 10) {
    return date.getFullYear() + "-0" + month + "-" + date.getDate();
  } else {
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  }
}

// 将yyyy-MM-dd格式的字符串转换成Date
function convertDateFromString(dateString) {
  if (dateString) {
    var date = new Date(dateString.replace(/-/, "/"))

    return date;
  }
}

// 获取给定日期所在周的周一和周日
function getWeekInfo(yyyyMMdd) {
  var theDay = convertDateFromString(yyyyMMdd);
  var monday = new Date(theDay.getTime());
  var sunday = new Date(theDay.getTime());
  monday.setDate(monday.getDate() + 1 - getChinaDay(monday));
  sunday.setDate(sunday.getDate() + 7 - getChinaDay(sunday));
  console.log(convertStringFromDate(monday) + " ----- " + convertStringFromDate(sunday));
  return [convertStringFromDate(monday), convertStringFromDate(sunday)];
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
  var tempDate = convertDateFromString(yyyyMMdd);
  var year = tempDate.getFullYear();
  var month = tempDate.getMonth() + 1;
  var day = new Date(year, month, 0);

  if (month < 10) {
    month = '0' + month;
  }

  var firstdate = year + '-' + month + '-01';
  var lastdate = year + '-' + month + '-' + day.getDate();

  console.log(firstdate);
  console.log(lastdate);

  return [firstdate, lastdate];
}

// 将自符串byte转化成TB
function convertByteToTB(b) {
  var TB = new Number(b) / 1024 / 1024 / 1024 / 1024;
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
  convertStringFromDate: convertStringFromDate,
  convertDateFromString: convertDateFromString,
  getWeekInfo: getWeekInfo,
  getMonthInfo: getMonthInfo,
  convertByteToTB: convertByteToTB,
  getSelectMode: getSelectMode
}


