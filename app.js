//app.js

App({
  globalData: {
    localSocket: {},
    callback: function () {},
    exceptionClose: true,
    socketMsgQueue: []
  },
  onLaunch: function () {
    

  },
  // 初始化socket
  initSocket() {
    let that = this;
    that.globalData.exceptionClose = true;

    that.globalData.localSocket = wx.connectSocket({
      url: "wss://weixin.tdeado.com/wss/"
    })

    that.globalData.localSocket.onOpen(function (res) {
      console.log('WebSocket连接已打开！readyState=' + that.globalData.localSocket.readyState)
      that.sendSocketMessage({
        "key": "bind",
        "data": {
          "appVersion": "1.0.0",
          "osVersion": "2.10.1",
          "channel": "browser",
          "packageName": "com.tdeado.house",
          "device": "WeChat",
          "deviceId": wx.getStorageSync('user').token
        },
        "timestamp": new Date().getTime(),
        "token": wx.getStorageSync('user').token
      });
      while (that.globalData.socketMsgQueue.length > 0) {
        var msg = socketMsgQueue.shift();
        that.sendSocketMessage(msg);
      }
    })
    that.globalData.localSocket.onMessage(function (res) {
  
      res = JSON.parse(res.data);
      if (res.key == "message" && wx.getStorageSync('user')) {
        var value = wx.getStorageSync('ms') || 0
        console.log(value+1)
        wx.setStorageSync('ms', value+1)
      }
      that.globalData.callback(res);
    })
    that.globalData.localSocket.onError(function (res) {
      console.log('readyState=' + that.globalData.localSocket.readyState)
    })
    that.globalData.localSocket.onClose(function (res) {
      console.log('WebSocket连接已关闭！readyState=' + that.globalData.localSocket.readyState)

      if (that.globalData.exceptionClose && wx.getStorageSync('user')) {
        that.initSocket();
      }

    })
  },
  //统一发送消息
  sendSocketMessage: function (msg) {
    if (this.globalData.localSocket.readyState === 1) {
      // console.log(JSON.stringify(msg))      
      this.globalData.localSocket.send({
        data: JSON.stringify(msg),
        success: function (res) {
          // console.log('发送成功,返回结果为',res)
          console.log(res)
        }
      })
    } else {
      this.globalData.socketMsgQueue.push(msg)
    }
  },
  onShow: function (options) {
    if (this.globalData.localSocket.readyState !== 0 && this.globalData.localSocket.readyState !== 1 && wx.getStorageSync('user')) {
      console.log('开始尝试连接WebSocket！readyState=' + this.globalData.localSocket.readyState)
      this.initSocket()
      wx.request({
        url: 'https://weixin.tdeado.com/im/message/unMsgNum',
        header:{
          token:wx.getStorageSync('user').token
        },
        success(res){
          wx.setStorageSync('ms', Number(res.data.data))
        }
      })
    }

  },
	onHide:function(){ 
	},
  
})