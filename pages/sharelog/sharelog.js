// pages/sharelog/sharelog.js
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
      url: 'https://weixin.tdeado.com/miniapp/sharelog',
      header:{
        token:"7c2f215940c364b93d6518ab51bfc50"
      },
      success(res){
        that.setData({
          list:res.data.data.records
        })

      }

    })
  },

})