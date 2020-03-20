// pages/settle/settle.js
const app = getApp()
var login = require('../../login.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cates: [],

    token: wx.getStorageSync('token'),
    active:0
  }, onPullDownRefresh() {
    this.getNews("");

  },
  onShow() {
    
    this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
    })
    this.getNews("");
  },
  onChange(event) {
    let that = this;

    this.getNews("");

  },
  getNews(key){
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/certificate?key='+key,
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.records)
        that.setData({
          list: res.data.data.records
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail
    });
  },
  onSearch(){
    this.getNews(this.data.searchValue)
  },
  toArticle(e) {
    let that = this;
    var value = wx.getStorageSync('articleNum')

      if(value>wx.getStorageSync('checkNum') && !wx.getStorageSync('user')){
        that.setData({
          show:true
        })
       
        return;
      }else{
        wx.navigateTo({
          url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
        })
        
      }
  
  },
  onConfirm(){
      login.login(this)
  },
  getPhonenumber(e) {
    login.getTokenByPhone(this,e)
  },
  onClose() {
    this.setData({ show: false });
  },
})