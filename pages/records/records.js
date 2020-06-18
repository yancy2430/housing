// pages/records/records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: getApp().globalData.domain+'/mini/member/reportLog', //仅为示例，并非真实的接口地址
      data: {
        
      },
      header: {
        'token': wx.getStorageSync("session").token,
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