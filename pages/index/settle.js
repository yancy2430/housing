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
    msg:"",
    searchValue: ""
  },  
  onLoad: function (options) {
   
    this.data.res.current = 0
    this.data.res.records = []
    this.getNews("");
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

    login.check(this)
    let that = this;
    getApp().globalData.msThat = this
   
    
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
    console.log(wx.getStorageSync('userInfo'))
    wx.request({
      url: getApp().globalData.domain+'/mini/home/settle',
      header: {
        'token': wx.getStorageSync('session').token,
        'content-type': 'application/json' // 默认值
      },
      data:{
        key:key,
        page:that.data.res.current
      },
      success(res) {
        if(res.data.code!=0){
          setTimeout(function () {
              that.getNews("")
           }, 2000) //延迟时间 这里是1秒
          that.setData({
            msg:res.data.msg
          })
          return;
        }
        that.data.res.current = res.data.data.current
        res.data.data.records.forEach(e => {
          
          that.data.res.records.push(e)
        });

        that.setData({
          res: that.data.res
        })
        wx.stopPullDownRefresh()
        wx.hideLoading()
      }
    })
  },
  toArticle(e) {
    let that = this;
    wx.request({
      url: getApp().globalData.domain + '/mini/member/check?tyep=2',
      header: {
        'token': wx.getStorageSync('session').token,
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data) {
          wx.navigateTo({
            url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
          })
        } else {
          that.setData({
            show: true
          })
        }

      }
    })
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
      title: '分享厦门便民宝' ,
      path: '/pages/index/settle?&scene='+scene
    }
  },
})