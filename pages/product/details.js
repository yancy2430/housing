// pages/product/details.js
var login = require('../../login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    product: {}
  },
   onShareAppMessage: function (res) {
    let that = this
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/saveShareLog',
      data: {
        contentId:this.data.product.details.id,
        type:1,
        contentName:this.data.product.details.productName
      },
      method:"POST",
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
    
      }
    })
    let user = wx.getStorageSync("user")
    let scene = ''
    if(user.isStaff){
      scene = user.userInfo.id
    }else{
      scene = user.sourceId
    }
    if(scene=='' || scene == null || scene==undefined){
      scene = wx.getStorageSync('scene')
    }
    return {
      title: '分享' + this.data.product.details.productName,
      path: '/pages/product/details?id=' + this.data.product.details.id + "&scene=" + scene
    }
  },  
  onLoad: function (options) {
    login.login(this)
    if(options.scene){
      wx.setStorageSync('scene', options.scene)
    }
    let that = this
    this.setData({
      token: wx.getStorageSync("user").token,
      staff:wx.getStorageSync('user').isStaff
    }) 
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/details?id=' + options.id,
      data: {},
      header: {
        'token': wx.getStorageSync('user').token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          product: res.data.data
        })
      }
    })
  },
  onReport:function(e){
    wx.navigateTo({
      url: '/pages/product/report?id=' + this.data.product.details.id,
    })
  },
  toPhoto: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/photo?id=' + e.currentTarget.dataset.id,
    })
  },
  toBasis: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/basis?id=' + e.currentTarget.dataset.id,
    })
  },
  onClickCall() {
    wx.makePhoneCall({
      phoneNumber: wx.getStorageSync('sourcePhone') //仅为示例，并非真实的电话号码
    })
  },
  focus(e) {
    let that = this

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/focus?id=' + this.data.product.details.id,
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.data.product.focus = res.data.data
        that.setData({
          product: that.data.product
        })
      }
    })
  },
  onTag(e){
    wx.switchTab({
      url: e.target.dataset.page
    })
  },
  onMessage(e){
    if (wx.getStorageSync("user") && wx.getStorageSync("user").userInfo && wx.getStorageSync("user").userInfo.phone){
      wx.navigateTo({
        url: '/pages/message/message',
      })
    }else{
      this.setData({
        show: true
      })
    }
  },
  onConfirm() {
    login.login(this)
  },
  getPhonenumber(e) {
    let that = this;
    login.getTokenByPhone(this, e, function yes(res) {

  
    })
  },
  onClose() {
    this.setData({ show: false });
  }
})