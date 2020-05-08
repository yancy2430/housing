//app.js

var login = require('./login.js');
App({
  globalData: {
    localSocket: {},
    callback: function () {},
    exceptionClose: true,
    socketMsgQueue: []
  },
  onLaunch: function () {


  },

  onShow: function (options) {
    login.check(this)
  },
  onHide: function () {},

})