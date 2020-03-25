// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let socketOpen = false
    const socketMsgQueue = []
    console.log("开始初始化")

    wx.request({
      url: 'https://weixin.tdeado.com/im/message/list',
      header: {
        token: wx.getStorageSync('user').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sender: wx.getStorageSync('user').sourceId
      },
      success(res) {
        that.setData({
          messages: res.data.data.records,
          userId: wx.getStorageSync('user').userInfo.id
        })
      }
    })

    wx.connectSocket({
      url: 'wss://weixin.tdeado.com/wss/',
      header: {
        'content-type': 'application/json'
      }
    })
    wx.onSocketOpen(function (h) {

      console.log("链接成功")
      wx.sendSocketMessage({
        data: '{"key":"bind","data":{"appVersion":"1.0.0","osVersion":"80.0.3987.132","channel":"browser","packageName":"com.farsunset.cim","device":"Chrome","deviceId":"8943c89645724ecc8099812e0695fd84"},"timestamp":1584867292991,"token":"' + wx.getStorageSync('user').token + '"}',
      })

    });
    wx.onSocketMessage(function callback(res) {
      let data = JSON.parse(res.data);
      console.log(data)
      if (data.key == 'message'){
        that.data.messages.push(data.data)
        that.setData({
          messages:that.data.messages
        })
      }
      console.log(that.data.messages)
    });

    wx.onSocketError(function (err) {

      console.log("链接失败")
    })



  },
  onConfirm: function (e) {
    let that = this;
    console.log(e.detail)

    let data={
      receiver: wx.getStorageSync('user').sourceId,
      content: e.detail.value,
      contentType: "0"
    }

    this.data.messages.push(data)
    this.setData({
      messages:that.data.messages,
      inputValue:""
    })

    wx.request({
      url: 'https://weixin.tdeado.com/im/message/send',
      method: "POST",
      header: {
        token: wx.getStorageSync('user').token
      },
      data: data,
      success(res){

      }
    })


  },
  //输入聚焦


  foucus: function (e) {

    var that = this;

    that.setData({

      bottom: e.detail.height

    })
    wx.pageScrollTo({
      duration: 300,
      selector:".bp"
    })
  },
  blur: function (e) {

    var that = this;

    that.setData({

      bottom: 0

    })

  }
})