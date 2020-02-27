// pages/product/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    photo: [],
    token: wx.getStorageSync('token'),
    show: false,
    selectImg:""
  },
  onLoad: function (option) {
    let that = this;
    this.setData({
      token: wx.getStorageSync("token")
    })

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/photos?id=' + option.id,
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          photo: res.data.data
        })
      }
    })
  },

  onClickShow(e) {
    console.log(e)
    this.setData({ show: true, selectImg: e.currentTarget.dataset.src });
  },

  onClickHide() {
    this.setData({ show: false });
  },
})