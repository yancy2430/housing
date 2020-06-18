// pages/product/basis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    basis:[]
  },
  onLoad: function (option) {
    let that = this;
    this.setData({
      token: wx.getStorageSync('session').token
    })
    wx.request({
      url: 'https://miniapp.xiambmb.com/miniapp/basis?id=' + option.id,
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          basis: res.data.data
        })
      }
    })
  },
  
})