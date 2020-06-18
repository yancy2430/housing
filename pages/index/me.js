// pages/me/me.js
const app = getApp()
var login = require('../../login.js');
Page({
  data: {
    login: false
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    if (options.scene) {
      wx.setStorageSync('scene', options.scene)
    }

  },
  toCoupons() {
    wx.showToast({
      title: 'title',
    })
    wx.navigateTo({
      url: '/pages/coupons/coupons',
    })
  },
  toFocus() {
    wx.navigateTo({
      url: '/pages/focus/focus',
    })
  },
  toHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  onPullDownRefresh() {

  },
  onShow() {
    this.getTabBar().init();
    let that = this;
    getApp().globalData.msThat = this
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      session: wx.getStorageSync('session')
    })

    that.getTabBar().setData({
      ms: wx.getStorageSync('ms')
    })

    that.setData({
      ms: wx.getStorageSync('ms')
    })
  
  },
  
  toLogin(e) {
    if(wx.getStorageSync('userInfo').phone){
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        session: wx.getStorageSync('session')
      })
  
      wx.navigateTo({
        url: '/pages/message/message',
      })
    }else{
      this.setData({
        show: true
      })
    }
    
  },

  celltel() {
    wx.makePhoneCall({
      phoneNumber: this.data.userInfo.sourcePhone
    })

  },
 
  onConfirm() {
    login.login(this)
  },
  getPhonenumber(e) {
    login.getTokenByPhone(this, e, function yes(res) {

     
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onShareAppMessage: function (res) {
    let user = wx.getStorageSync("userInfo")
    let scene = ''
    if (user.isStaff) {
      scene = user.userInfo.id
    } else {
      scene = user.sourceId
    }
    if (scene == '' || scene == null || scene == undefined) {
      scene = wx.getStorageSync('scene')
    }
    return {
      title: '分享厦门本地宝',
      path: '/pages/index/settle?&scene=' + scene
    }
  },
})