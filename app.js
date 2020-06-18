//app.js

var login = require('./login.js');
App({
  globalData: {
    // domain:"http://192.168.0.104:8080",
    domain:"https://miniapp.xiambmb.com",
    localSocket: {},
    callback: function () {},
    msThat: null,
    exceptionClose: true,
    socketMsgQueue: []
  },
  onLaunch: function () {
    wx.removeStorageSync('session')
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('articleNum')
    let that=this;
    clearInterval(that.globalData.setInter)
      //将计时器赋值给setInter
    that.globalData.setInter = setInterval(function(){that.newmsg()}, 2000);

  },
  onShow:function(){
    let that=this;
    clearInterval(that.globalData.setInter)
      //将计时器赋值给setInter
    that.globalData.setInter = setInterval(function(){that.newmsg()}, 2000);
  },
  onHide:function(){
    var that =this;
    //清除计时器 即清除setInter
    clearInterval(that.globalData.setInter)
  },
  newmsg:function(){
    let that = this;
    wx.request({
      url: getApp().globalData.domain+'/mini/im/msgcount',
      header: {
        token: wx.getStorageSync('session').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        wx.setStorageSync('ms', res.data.data)
        if(null!=that.globalData.msThat){
          that.globalData.msThat.getTabBar().setData({
            ms: wx.getStorageSync('ms')
          })
        }
      }
    })
  
  },
  onShow: function (options) {
  },
  onHide: function () {},

})