// pages/message/message.js
const app = getApp()
var login = require('../../login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue: "",
  },
  onCall:function(e){
    console.log(e)
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/getPhone?id='+(this.data.options.receiver || wx.getStorageSync('user').sourceId),
      header:{
        token:wx.getStorageSync('session').token
      },
      success(res){
        wx.makePhoneCall({
          phoneNumber: res.data.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onHide: function () {
  },
  onUnload() {
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
      to:options.to,
      offset:options.offset
    })
    this.getmessages()
  },
  getmessages() {
    let that = this;
    wx.request({
      url: 'http://localhost:8080/mini/im/message',
      header: {
        token: wx.getStorageSync('session').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        toUserId: that.data.to,
        offset: that.data.offset ,
      },
      success(res) {
        res.data.forEach(item => {
          that.data.messages.push(item)
        });
        console.log(that.data.messages)
        that.setData({
          messages:that.data.messages
        })
      }
    })
  },
  onOpenProduct:function(e){
    console.log(this.data.messages[e.currentTarget.dataset.index].content.type)
    if(this.data.messages[e.currentTarget.dataset.index].content.type==1){
      wx.navigateTo({
        url: '/pages/product/details?id=' + this.data.messages[e.currentTarget.dataset.index].content.productId,
      })
    }else{
      wx.navigateTo({
        url: '/pages/article/article?id=' + this.data.messages[e.currentTarget.dataset.index].content.productId,
      })
    }
  },
  onConfirm: function (e) {
    let that = this;
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

    this.setData({
      inputValue: ""
    })
  },
  openProduct(){

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