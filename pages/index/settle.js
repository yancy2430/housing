// pages/settle/settle.js
const app = getApp()
var login = require('../../login.js');
var binUtil = require('../../utils/binUtil.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    list: [],
    searchValue: ""
  },
  onLoad(op) {
    wx.setStorageSync('scene', op.scene)
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/check',
      success(res) {
        wx.setStorageSync('checkNum', Number(res.data.data))
      }
    })
  },
  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  },
  str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  },
  onPullDownRefresh() {

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
  onChange(e) {
    this.setData({
      searchValue: e.detail
    });
  },
  onSearch() {
    this.getNews(this.data.searchValue)
  },
  getNews(key) {
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/settle?key=' + key,
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
  toArticle(e) {
    let that = this;
    var value = wx.getStorageSync('articleNum')

    if (value > wx.getStorageSync('checkNum') && !wx.getStorageSync('user')) {
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
    login.login(this)
  },
  getPhonenumber(e) {
    login.getTokenByPhone(this, e)
  },
  onClose() {
    this.setData({
      show: false
    });
  }, onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: '厦门便民宝' ,
      path: '/pages/index/settle'
    }
  }
})