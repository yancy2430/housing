// pages/settle/settle.js
const app = getApp()
var login = require('../../login.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    res: {
      current:0,
      records:[]
    },
    searchValue: ""
  },  
  onLoad: function (options) {
    if(options.scene){
      wx.setStorageSync('scene', options.scene)
    }
  },
  onPullDownRefresh() {
    this.data.res.current = 0
    this.data.res.records = []
    this.getNews(this.data.searchValue);
  },
  onShow() {
    this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
    })
    that.getTabBar().setData({
      ms: wx.getStorageSync('ms')
    })
    app.globalData.callback=function(res){
      that.getTabBar().setData({
        ms: wx.getStorageSync('ms')
      })
    }
    this.getNews("");
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail
    });
  },
  onSearch() {
    this.data.res.current = 0
    this.data.res.records = []
    this.getNews(this.data.searchValue)
  },
  onReachBottom(){
    this.data.res.current=this.data.res.current+1
    this.getNews(this.data.searchValue)
  },
  getNews(key) {
    let that = this;
    wx.request({
      url: getApp().globalData.domain+'/mini/home/certificate',
      header: {
        'token': wx.getStorageSync('session').token,
        'content-type': 'application/json' // 默认值
      },
      data:{
        key:key,
        page:that.data.res.current
      },
      success(res) {
        console.log(res.data.data.records)
        that.data.res.current = res.data.data.current
        res.data.data.records.forEach(e => {
          
          that.data.res.records.push(e)
        });

        that.setData({
          res: that.data.res
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  toArticle(e) {
    let that = this;
    var value = wx.getStorageSync('articleNum')
    if (value > wx.getStorageSync('checkNum') && !wx.getStorageSync('userInfo')) {
      that.setData({
        show: true
      })

      return;
    } else {
      wx.navigateTo({
        url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
      })

    }

  },
  onConfirm() {
    login.check(this)
  },
  getPhonenumber(e) {
    login.getTokenByPhone(this, e)
  },
  onClose() {
    this.setData({
      show: false
    });
  }, onShareAppMessage: function (res) {
    let user = wx.getStorageSync("userInfo")
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