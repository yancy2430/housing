//index.js
//获取应用实例
const app = getApp()

Page({  
  onLoad: function (options) {
  if(options.scene){
    wx.setStorageSync('scene', options.scene)
  }

  },
  data: {
    loading: false,
    area: [],
    token: wx.getStorageSync("user").token

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
      token: wx.getStorageSync("user").token
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
          // that.location()
          
        }
      }, fail(err) {
        console.log(err)
        // that.location()
        
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
  }, onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: '厦门便民宝' ,
      path: '/pages/index/settle'
    }
  },onShareAppMessage: function (res) {
    let user = wx.getStorageSync("user")
    let scene = ''
    if(user.isStaff){
      scene = user.userInfo.id
    }else{
      scene = user.sourceId
    }
    if(scene=='' || scene == null || scene==undefined){
      scene = wx.getStorageSync('scene')
    }
    return {
      title: '分享厦门本地宝' ,
      path: '/pages/index/settle?&scene='+scene
    }
  },
})
