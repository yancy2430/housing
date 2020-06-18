// pages/article/article.js

var login = require('../../login.js');
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
      id: options.id,
      options:options,
      token: wx.getStorageSync('session').token
    })
    try {
      var value = wx.getStorageSync('articleNum')
      value=value+1
      wx.setStorageSync('articleNum', Number(value))
    } catch (e) {
      // Do something when catch error
    }
  
 
  },
  loginCallback:function(res){
    let that = this
    this.setData({
      id: that.data.options.id,
      src: getApp().globalData.domain+'/mini/house/' + that.data.options.id+'.html?token='+wx.getStorageSync('session').token+"&openid="+wx.getStorageSync('session').openid
    })
  }
  , onShareAppMessage: function (res) {
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

    let that = this
    wx.request({
      url: getApp().globalData.domain+'/mini/member/saveShareLog',
      data: {
        contentId:that.data.id,
        type:1,
        contentName:""
      },
      method:"POST",
      header: {
        'token': wx.getStorageSync('session').token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
    
      }
    })

    console.log('/pages/product/details?id=' + this.data.id +"&scene="+scene)
    return {
      title: that.data.message.title ,
      path: '/pages/product/details?id=' + this.data.id +"&scene="+scene
      // imageUrl: that.data.message.image
    }
  },
  getMessage(e) {
    console.log(e)
    let that = this;
    let data = e.detail.data[e.detail.data.length - 1];
    that.data.message = JSON.parse(data);
    console.log(data)
  }
})