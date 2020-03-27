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
      url: 'https://weixin.tdeado.com/miniapp/customers',
      header:{
        token:wx.getStorageSync("user").token
      },
      success(res){
        that.setData({
          customers:res.data.data
        })
      }
    })

  }  ,onClickCall(e) {
    wx.makePhoneCall({phoneNumber: e.currentTarget.dataset.phone})
  },
})