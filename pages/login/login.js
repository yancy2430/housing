// pages/me/me.js
const app = getApp()
var login = require('../../login.js');
Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.scene) {
      wx.setStorage({
        key: "scene",
        data: options.scene
      })
    }
    login.login(this)
  },
  onShow() {

  },
  getPhoneNumber(e) {
    login.getTokenByPhone(this, e, function (res) {
      console.log(getCurrentPages().length)
      if (getCurrentPages().length == 1) {
        wx.switchTab({
          url: '/pages/index/settle'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }

    })
  }
})