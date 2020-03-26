// pages/customer/customer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad(op){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1/miniapp/customers',
      header:{
        token:wx.getStorageSync("user").token
      },
      success(res){
        that.setData({
          customers:res.data.data
        })
      }
    })

  }
})