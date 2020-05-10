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
  },
  onHide: function () {},

})