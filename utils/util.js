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

module.exports = {
  formatTime: formatTime,
  getCurrentDate: getCurrentDate
}


