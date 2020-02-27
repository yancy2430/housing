// pages/settle/settle.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    list: []
  },
  onShow() {
    this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("token")
    })

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/edu',
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
  toArticle(e) {
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
    })
  }

})