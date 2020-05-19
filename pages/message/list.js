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
      url: getApp().globalData.domain+'/mini/im/dialogue',
      method:"POST",
      header: {
        token: wx.getStorageSync('session').token
      },
      success(res){
        that.setData({
          list:res.data
        })
      }
    })

  },
  toMessage(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/message/message?to='+e.currentTarget.dataset.to+"&offset="+e.currentTarget.dataset.offset,
    })
  }

})