// pages/article/article.js
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
    let that = this;
    
    this.setData({
      src: 'https://weixin.tdeado.com/miniapp/article/' + options.id+'.html'
    })
 
  },
})