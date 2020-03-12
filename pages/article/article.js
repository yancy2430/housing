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
      id: options.id,
      src: 'https://weixin.tdeado.com/miniapp/article/' + options.id+'.html'
    })
 
  }, onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: '分享' ,
      path: '/pages/article/article?id=' + this.data.id
    }
  },
  getMessage(e) {
    console.log(e)
    let that = this;
    let shareUrl = e.detail.data[e.detail.data.length - 1];
    that.shareUrl = JSON.parse(shareUrl);
  }
})