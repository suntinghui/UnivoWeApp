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
  var oneDayLong = 24 * 60 * 60 * 1000;

  var tempDate = convertDateFromString(yyyyMMdd);
  var nowTime = tempDate.getTime();
  var day = tempDate.getDay();
  // 获取本周所在的周一
  var MondayTime = nowTime - (day - 1) * oneDayLong;
  // 获取本周所在的周日
  var SundayTime = nowTime + (7 - day) * oneDayLong;

  console.log(convertStringFromDate(new Date(MondayTime)));
  console.log(convertStringFromDate(new Date(SundayTime)));
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
}

module.exports = {
  formatTime: formatTime,
  getCurrentDate: getCurrentDate,
  convertStringFromDate: convertStringFromDate,
  convertDateFromString: convertDateFromString,
  getWeekInfo: getWeekInfo,
  getMonthInfo: getMonthInfo
}


