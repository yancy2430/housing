//app.js

var login = require('./login.js');
App({
  globalData: {
    domain:"http://localhost:8881",
    localSocket: {},
    callback: function () {},
    exceptionClose: true,
    socketMsgQueue: []
  },
  onLaunch: function () {
    wx.removeStorageSync('session')
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('articleNum')
    

  },
  onShow: function (options) {
  },
  onHide: function () {},

})