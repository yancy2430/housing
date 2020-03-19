//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    loading: false,
    area: [],
    token: wx.getStorageSync('token')

  }, onPullDownRefresh() {
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/hot', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          products: res.data.data
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onShow() {
    this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("token")
    })
  
    wx.getStorage({
      key: 'area',
      success(res) {
        console.log(res)
        if(res.data){

          that.setData({
            area: res.data
          })
        }else{
          that.location()
          
        }
      }, fail(err) {
        console.log(err)
        that.location()
        
      }
    })
    

    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/hot', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          products: res.data.data
        })
        wx.stopPullDownRefresh()
      }
    })

  },
  location(){
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        wx.request({
          url: 'https://weixin.tdeado.com/location/cityByGps?longitude=' + res.latitude + '&latitude=' + res.longitude,
          data: {},
          header: {
            'token': that.data.token,
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data.data)
            wx.setStorage({
              key: "area",
              data: res.data.data
            })
            that.setData({
              area: res.data.data
            })
          }
        })

      }
    })
  },
 goProduct(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/details?id=' + e.currentTarget.dataset.id,
    })
  },
  toList(e) {
    wx.navigateTo({
      url: '/pages/product/list?area=' + e.currentTarget.dataset.area,
    })
  },
  toArea(e){
    wx.navigateTo({
      url: '/pages/index/area',
    })
  }
})
