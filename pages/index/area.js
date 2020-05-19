// pages/index/area.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allArea: {},
    token: wx.getStorageSync("user").token,
    searchValue:""
  },
  onChange(e) {
    console.log(e.detail)
    this.setData({
      value: e.detail
    });
    this.getAllCity(e.detail);
  },

  onLoad: function (option) {
    let that = this
    this.setData({
      token: wx.getStorageSync("user").token
    })

    wx.getStorage({
      key: 'area',
      success(res) {
        that.setData({
          area: res.data
        })
      }
    })

    this.getAllCity("");

  },
  getAllCity(name){
    let that = this
    wx.request({
      url: 'https://miniapp.xiambmb.com/system/cityArea/byName?name='+name,
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          allArea: res.data.data
        })
      }
    })
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });

  },
  selectArea(e) {
    console.log(e.currentTarget.dataset)
    wx.setStorage({
      key: "area",
      data: e.currentTarget.dataset
    })
    wx.navigateBack()
  }
})