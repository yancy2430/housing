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
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/certificate',
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
  onChange(event) {
    let that = this;
    console.log(this.data.cates[event.detail.index])
    let cateId = this.data.cates[event.detail.index].id;

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/newsList?cateId='+cateId,
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.cates[event.detail.index]['list'] = res.data.data
        that.setData({
          cates: that.data.cates
        })
        console.log(that.data.cates)
      }
    })

  },
  toArticle(e) {
    wx.navigateTo({
      url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
    })
  }
})