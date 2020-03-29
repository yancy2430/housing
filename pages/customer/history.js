// pages/customer/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0
  },
  onLoad(op){
    this.gethistory("article",1)
    this.gethistory("house",2)
  },onClickCall(e) {
    wx.makePhoneCall({phoneNumber: e.currentTarget.dataset.phone})
  },
  onChange(event) {
    this.setData({
      active:event.detail.name
    })
  },
  gethistory(type,page){
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/customerhistory?type='+type+'&page='+page,
      header: {
        token: wx.getStorageSync("user").token
      },
      success(res) {
        if (type =='article'){
          that.setData({
            articles: res.data.data
          })
        } else if (type == 'house'){
          that.setData({
            houses: res.data.data
          })
        }

      }
    })
  }
})