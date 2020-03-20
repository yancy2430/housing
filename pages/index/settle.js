// pages/settle/settle.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    list:[],
    searchValue:""
  },
  onPullDownRefresh() {

    this.getNews("");
  },
	onShow() {
		this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("token")
    })

    this.getNews("");
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail
    });
  },
  onSearch(){
    this.getNews(this.data.searchValue)
  },
  getNews(key){
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/settle?key='+key, 
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res.data.data.records)
        that.setData({
          list: res.data.data.records
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  toArticle(e){
    let that = this;
    var value = wx.getStorageSync('articleNum')

      if(value>3 && !this.data.token){
        that.setData({
          show:true
        })
       
        return;
      }else{
        wx.navigateTo({
          url: '/pages/article/article?id=' + e.currentTarget.dataset.id,
        })
        
      }
  
  },
  getPhonenumber(event) {
    console.log(event.detail);
  },
  onClose() {
    this.setData({ show: false });
   
  },
})