// pages/coupons/coupons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    token: wx.getStorageSync('token'),
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.scene){
      wx.setStorageSync('scene', options.scene)
    }
    let that = this;
    this.setData({
      token:wx.getStorageSync("user").token
    })
    
  },
  onShareAppMessage: function (res) {
    let user = wx.getStorageSync("user")
    let scene = ''
    if(user.isStaff){
      scene = user.userInfo.id
    }else{
      scene = user.sourceId
    }
    if(scene=='' || scene == null || scene==undefined){
      scene = wx.getStorageSync('scene')
    }
    return {
      title: '分享厦门本地宝' ,
      path: '/pages/index/settle?&scene='+scene
    }
  },
})