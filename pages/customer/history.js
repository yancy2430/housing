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
  },
  gethistory(type,page){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1/miniapp/customerhistory?type='+type+'&page='+page,
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