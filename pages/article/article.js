// pages/article/article.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:true
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.login(this)
    if(options.scene){
      wx.setStorageSync('scene', options.scene)
    }
    wx.getStorageSync('key')
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
    })
    try {
      var value = wx.getStorageSync('articleNum')
      value=value+1
      wx.setStorageSync('articleNum', Number(value))
    } catch (e) {
      // Do something when catch error
    }
    this.setData({
      id: options.id,
      src: 'https://weixin.tdeado.com/miniapp/article/' + options.id+'.html'
    })
 
  }, onShareAppMessage: function (res) {
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
      title: '分享' ,
      path: '/pages/article/article?id=' + this.data.id +"&scene="+scene
    }
  },
  getMessage(e) {
    console.log(e)
    let that = this;
    let shareUrl = e.detail.data[e.detail.data.length - 1];
    that.shareUrl = JSON.parse(shareUrl);
  }
})