// pages/focus/focus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token')

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
      token: wx.getStorageSync('session').token
    })

    wx.request({
      url: getApp().globalData.domain+'/miniapp/focusList',
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 0) {

          that.setData({
            products: res.data.data.records
          })
        }
      }
    })
    

  },
 goProduct(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/details?id=' + e.currentTarget.dataset.id,
    })
  },
  onShareAppMessage: function (res) {
    let user = wx.getStorageSync('session')
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
      title: '分享厦门便民宝' ,
      path: '/pages/index/settle?&scene='+scene
    }
  },
})