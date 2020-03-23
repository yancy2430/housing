// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let socketOpen = false
    const socketMsgQueue = []
    console.log("开始初始化")

    wx.connectSocket({
      url: 'ws://127.0.0.1:3456',
      header: {
        'content-type': 'application/json'
      }
    })
    wx.onSocketOpen(function (h) {

      console.log("链接成功")
      wx.sendSocketMessage({
        data: '{"key":"client_bind","data":{"appVersion":"1.0.0","osVersion":"80.0.3987.132","channel":"browser","packageName":"com.farsunset.cim","device":"Chrome","deviceId":"8943c89645724ecc8099812e0695fd84","account":"'+wx.getStorageSync('user').userInfo.id+'"},"timestamp":1584867292991}',
      })

    });
    wx.onSocketMessage(function callback(res) {

      console.log(res)
    });

    wx.onSocketError(function (err) {

      console.log("链接失败")
    })



  },
  //输入聚焦

  foucus: function (e) {

    var that = this;

    that.setData({

      bottom: e.detail.height

    })

  },
  blur: function (e) {

    var that = this;

    that.setData({

      bottom: 0

    })

  }
})