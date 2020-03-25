// pages/message/list.js
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
      url: 'http://127.0.0.1/im/dialogue/list',
      method:"POST",
      header: {
        token: wx.getStorageSync('user').token
      },
      success(res){
        that.setData({
          list:res.data.data
        })
      }
    })

  },
  toMessage(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/message/message?id='+e.currentTarget.dataset.id,
    })
  }

})