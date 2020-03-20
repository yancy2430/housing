// pages/product/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    active: 0,
    photo: [],
    token: wx.getStorageSync('token'),
    show: false,
    selectImg:""
  },
  onLoad: function (option) {
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
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

    this.data.selectImg = []
    for (let index = 0; index < this.data.photo[e.target.dataset.upid].list.length; index++) {
      const element = this.data.photo[e.target.dataset.upid].list[index];
   

      this.data.selectImg.push(element.image)
    }

    this.setData({
      selectImg: this.data.selectImg,
      current:e.target.dataset.index
    })
  },

  onClickHide() {
    this.setData({ show: false });
  },
})