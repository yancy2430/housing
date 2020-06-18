// pages/message/message.js
const app = getApp()
var login = require('../../login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setInter:'',
    messages: [],
    inputValue: "",
  },
  onCall:function(e){
    wx.makePhoneCall({
      phoneNumber:  wx.getStorageSync('userInfo').sourcePhone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onHide: function () {
  },

  onUnload: function () {
    var that =this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  onLoad: function (options) {
    console.log(wx.getSystemInfo())


    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
      dialogueId:options.dialogueId
    })
    this.getmessages()
    let that =this
    wx.onKeyboardHeightChange(function(res){
      that.setData({
        bottom:res.height
      })

      console.log("onKeyboardHeightChange")
      console.log(res.height)
    });
  },

  toBottom:function(){
    let that = this;
    wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
      console.log(rect.height)
      that.setData({
        scrolltop: rect.height,
        tb:"tb"
      })
    }).exec()
  },

  newmsg:function(){
    let that = this;
    wx.request({
      url: getApp().globalData.domain+'/mini/im/newmsg',
      header: {
        token: wx.getStorageSync('session').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        dialogueId: that.data.dialogueId || "",
      },
      success:function(res) {
        if(res.data.data.length>0){
          res.data.data.forEach(item => {
            that.data.messages.push(item)
          });
         
          that.setData({
            messages:that.data.messages
          })
          that.toBottom();
        }
      }
    })
  
  },
  getmessages() {
    let that = this;
    wx.request({
      url: getApp().globalData.domain+'/mini/im/message',
      header: {
        token: wx.getStorageSync('session').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        dialogueId: that.data.dialogueId || "",
      },
      success(res) {
        console.log(res)
        res.data.data.records.forEach(item => {
          that.data.messages.push(item)
        });
        console.log(that.data.messages)
        that.setData({
          messages:that.data.messages
        })
        that.toBottom();
      //将计时器赋值给setInter
      that.data.setInter = setInterval(function(){that.newmsg()}, 500);
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

    let data = {
      dialogueId: that.data.dialogueId || "",
      content: e.detail.value,
      type: "0"
    }

    this.setData({
      inputValue: ""
    })
    wx.request({
      url: getApp().globalData.domain+'/mini/im/sendMessage',
      header: {
        token: wx.getStorageSync('session').token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:data,
      success:function(res){
        that.data.messages.push({
          content: e.detail.value,
          from: wx.getStorageSync('userInfo').id,
          fromAvatar: "https://weixin.tdeado.com/static/images/avatar.jpg",
          fromName: "匿名客户",
          toAvatar: "https://weixin.tdeado.com/static/images/avatar.jpg",
          toName: "匿名客户",
          type: 1
        })
        that.setData({
          messages:that.data.messages
        })
        that.toBottom();
      }
    })
  },
  openProduct(){
  },
  //输入聚焦
  foucus: function (e) {
    var that = this;

    that.toBottom();

  },
  blur: function (e) {
    var that = this;


  },
  onConfirmDialog() {
    login.login(this)
  },
  getPhonenumber(e) {
    let that = this;
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