// pages/customer/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharelog:{
      size: 20,
      current: 1,
      records:[]
    }
  },
  onLoad(op){
    this.getlist()
  },
  getlist(){
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/sharelog',
      header:{
        token:wx.getStorageSync("user").token
      },
      data:{
        page:that.data.sharelog.current,
        size:that.data.sharelog.size
      },
      success(res){
        if(res.data.code!=0){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        console.log(res.data.data.records.length)
        for(var i =0;i<res.data.data.records.length;i++){
          that.data.sharelog.records.push(res.data.data.records[i])
        }
        
        that.setData({
          sharelog:that.data.sharelog
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom(){
    this.data.sharelog.current=this.data.sharelog.current+1
    this.getlist()
  },
  onPullDownRefresh(){
    this.data.sharelog.current=1
    this.data.sharelog.records=[]
    this.getlist()
    
  },
  onClickCall(e) {
    wx.makePhoneCall({phoneNumber: e.currentTarget.dataset.phone})
  }
})