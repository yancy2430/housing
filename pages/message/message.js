// pages/message/message.js
const app = getApp()
var login = require('../../login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onHide: function () {
    wx.setStorageSync('ms', 0)
  },
  onUnload() {
    wx.setStorageSync('ms', 0)
  },
  onLoad: function (options) {
    if (wx.getStorageSync("user") && wx.getStorageSync("user").userInfo && wx.getStorageSync("user").userInfo.phone) {

    } else {
      this.setData({
        show: true
      })
    }
    this.setData({
      options: options
    })
    let that = this;
    let socketOpen = false
    const socketMsgQueue = []
    console.log(options)
    this.getmessages()

    app.globalData.callback = function (data) {
      console.log(data)
      that.getmessages()

    }
  },
  getmessages() {
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/im/message/list',
      header: {
        token: wx.getStorageSync('user').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        dialogueId: that.data.options.id || '',
        receiver: that.data.options.receiver || wx.getStorageSync('user').sourceId,
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            messages: res.data.data.records,
            dialogueId: that.data.options.id || '',
            sender: that.data.options.sender || '',
            receiver: that.data.options.receiver || '',
            userId: wx.getStorageSync('user').userInfo.id
          })
        }
        that.setData({
          scrolltop: 50000
        })

      }
    })
  },
  onConfirm: function (e) {
    console.log(e)
    let that = this;
    console.log(e.detail)
    let receiver

    if (that.data.receiver && that.data.sender) {
      receiver = that.data.receiver == wx.getStorageSync('user').userInfo.id ? that.data.sender : that.data.receiver
    } else {
      receiver = wx.getStorageSync('user').sourceId
    }

    let data = {
      receiver: receiver,
      content: e.detail.value,
      contentType: "0"
    }

    this.data.messages.push(data)
    this.setData({
      messages: that.data.messages,
      inputValue: ""
    })

    app.sendSocketMessage(

      {
        "key": "message",
        "data": data,
        "receiver": receiver,
        "token": wx.getStorageSync('user').token,
        "timestamp": new Date().getTime()
      }
    )
    that.setData({
      scrolltop: 50000
    })

  },
  //输入聚焦


  foucus: function (e) {

    var that = this;

    that.setData({
      bottom: e.detail.height,
      scrolltop: 5000
    })
    wx.pageScrollTo({
      duration: 300,
      selector: ".bp"
    })
  },
  blur: function (e) {

    var that = this;

    that.setData({

      bottom: 0

    })

  },
  onConfirmDialog() {
    login.login(this)
  },
  getPhonenumber(e) {
    let that = this;
    console.log(e)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.navigateBack({
        delta: 1
      })
      return;
    }
    login.getTokenByPhone(this, e, function yes(res) {


    })
  },
  onClose() {
    this.setData({
      show: false
    });
  }
})