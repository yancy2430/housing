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
    let that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
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
        console.log(res.data)
        that.setData({
          product: res.data.data
        })
      }
    })
    return {
      title: '分享' + this.data.product.details.productName,
      path: '/pages/product/details?id=' + this.data.product.details.id + "&scene=" + wx.getStorageSync('scene')
    }
  },
  onLoad: function(option) {
    console.log("scene=" + option.scene)
    let that = this
    this.setData({
      token: wx.getStorageSync("user").token,
      staff:wx.getStorageSync('isStaff')
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
  onTag(e){
    wx.switchTab({
      url: e.target.dataset.page
    })
  },
  share() {

  }
})