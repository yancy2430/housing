// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync("user").token

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
    })

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/historyList',
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 0) {

          that.setData({
            products: res.data.data.records
          })
        }
      }
    })


  },
  goProduct(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/details?id=' + e.currentTarget.dataset.id,
    })
  },
})