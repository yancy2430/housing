// pages/records/records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      token: wx.getStorageSync("token")
    })

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/reports', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          reports: res.data.data
        })
      }
    })

  }

})