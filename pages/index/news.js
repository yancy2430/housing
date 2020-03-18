// pages/settle/settle.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cates: [],

    token: wx.getStorageSync('token'),
    active:0
  },
  onShow() {
    
    this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("token")
    })

    console.log(that.data.token)
    getNews("");
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
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
    })
  }
})