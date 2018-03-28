function d(msg) {
  var app = getApp();
  if (app.globalData.DEBUG) {
    console.log(msg);
  } 
}

module.exports = {
  d: d
}