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
  onHide:function(){
     
    clearTimeout(this.data.id)

  },
  onLoad: function (options) {
    this.setData({
      options:options
    })
    let that = this;
    let socketOpen = false
    const socketMsgQueue = []
    console.log(options)
    this.getmessages()
    let id= setInterval(function() {
      console.log("获取消息")
      that.getmessages()
     }, 2000)
    


   this.setData({
     id:id
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
      if (data.key == 'message' && options.id==data.data.dialogueId){
        that.data.messages.push(data.data)
        that.setData({
          messages:that.data.messages
        })
        wx.pageScrollTo({
          duration: 300,
          selector:".bp"
        })
      }
      console.log(that.data.messages)
    });

    wx.onSocketError(function (err) {

      console.log("链接失败")
    })



  },
  getmessages(){
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/im/message/list',
      header: {
        token: wx.getStorageSync('user').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        dialogueId: that.data.options.id || '',
        receiver:that.data.options.receiver || wx.getStorageSync('user').sourceId,
      },
      success(res) {
        that.setData({
          messages: res.data.data.records,
          dialogueId:that.data.options.id,
          sender:that.data.options.sender,
          receiver:that.data.options.receiver,
          userId: wx.getStorageSync('user').userInfo.id
        })
      }
    })
  },
  onConfirm: function (e) {
    let that = this;
    console.log(e.detail)
    let receiver

    if(that.data.receiver && that.data.sender){
      receiver = that.data.receiver==wx.getStorageSync('user').userInfo.id?that.data.sender:that.data.receiver
    }else{
      receiver = wx.getStorageSync('user').sourceId
    }

    let data={
      receiver: receiver,
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

      bottom: e.detail.height,
      scrolltop:5000
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