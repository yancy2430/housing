// pages/product/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    product: {}
  },
   onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享' + this.data.product.details.productName,
      path: '/pages/product/details?id=' + this.data.product.details.id+"&userId=1"
    }
  },
  onLoad: function(option) {
    console.log("userId=" + option.userId)
    let that = this
    this.setData({
      token: wx.getStorageSync("token")
    })


 
    console.log(that.data.token)
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/details?id=' + option.id,
      data: {},
      header: {
        'token': that.data.token,
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
      phoneNumber: '18152733661' //仅为示例，并非真实的电话号码
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
  share() {

  }
})