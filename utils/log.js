function d(msg) {
  var app = getApp();
  if (app.globalData.DEBUG) {
    console.log(msg);
  }
}

function dd(tip, msg) {
  var app = getApp();
  if (app.globalData.DEBUG) {
    console.log(tip + " --- " + JSON.stringify(msg));
  }
}

module.exports = {
  d: d,
  dd: dd
}