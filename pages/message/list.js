// pages/message/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    dialogues:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  onShow:function(){
    let that = this;
    wx.request({
      url: getApp().globalData.domain+'/mini/im/dialogue',
      method:"POST",
      header: {
        token: wx.getStorageSync('session').token
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          dialogues:res.data.data
        })
      }
    })
  },
  toMessage(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/message/message?dialogueId='+e.currentTarget.dataset.id,
    })
  }

})