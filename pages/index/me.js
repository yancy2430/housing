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

  },
  onPullDownRefresh() {
    this.isSet()

  },
  onShow() {
    this.getTabBar().init();
    let that = this;
    if (wx.getStorageSync('user').token) {
      this.setData({
        login: true,
        phone:wx.getStorageSync('user').userInfo.phone,
        staff:wx.getStorageSync('user').isStaff,
        ms:wx.getStorageSync('ms')
      })
    }
    this.isSet()




  },
  isSet(){
    let that = this
    //发起网络请求
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/me/count',
      header: {
        'token': wx.getStorageSync('user').token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          countData: res.data.data
        })
        wx.stopPullDownRefresh()
      }
    })
    
  },
  toLogin(e) {
    this.setData({
      show: true
    })
  },

  celltel() {
    wx.makePhoneCall({
      phoneNumber: this.data.countData.contact
    })

  },
  toCoupons() {
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
  clearCache() {
    wx.clearStorage()
    this.setData({
      login:false,
      countData:{},
      phone:""
    })

  },
  onConfirm() {
    login.login(this)
  },
  getPhonenumber(e) {
    let that = this;
    login.getTokenByPhone(this, e,function yes(res){

      that.isSet()
      if (wx.getStorageSync('user').token) {
        that.setData({
          login: true,
          phone: wx.getStorageSync('user').userInfo.phone,
          staff: wx.getStorageSync('user').isStaff
        })
      }
    })
  },
  onClose() {
    this.setData({ show: false });
  },
})