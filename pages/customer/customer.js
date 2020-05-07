// pages/customer/customer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customers:{
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
      url: 'https://weixin.tdeado.com/miniapp/customers',
      header:{
        token:wx.getStorageSync("user").token
      },
      data:{
        page:that.data.customers.current,
        size:that.data.customers.size
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
          that.data.customers.records.push(res.data.data.records[i])
        }
        
        that.setData({
          customers:that.data.customers
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom(){
    this.data.customers.current=this.data.customers.current+1
    this.getlist()
  },
  onPullDownRefresh(){
    this.data.customers.current=1
    this.data.customers.records=[]
    this.getlist()
    
  },
  onClickCall(e) {
    wx.makePhoneCall({phoneNumber: e.currentTarget.dataset.phone})
  }
})