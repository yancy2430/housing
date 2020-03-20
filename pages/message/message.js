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

  },
//输入聚焦

foucus: function (e) {

  var that = this;
  
  that.setData({
  
  bottom: e.detail.height
  
  })
  
  },
  blur:function(e){

    var that = this;
    
    that.setData({
    
    bottom: 0
    
    })
    
    }
})