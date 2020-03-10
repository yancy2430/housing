// pages/me/me.js
const app = getApp()
Page({
  data:{

    token: wx.getStorageSync('token')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'sessionKey',
      success(res) {
        console.log(res)
        that.setData({
          sessionKey: res.data
        })
      }
    })
  },
  onShow() {
    this.getTabBar().init();
    let that = this;
    this.setData({
      token: wx.getStorageSync("token"),
      scene: wx.getStorageSync("scene"),
      staff:wx.getStorageSync('isStaff')
    })
    

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.checkSession({
            success() {
              //session_key 未过期，并且在本生命周期一直有效
              console.log(that.data.sessionKey)
              if (that.data.sessionKey){
                wx.getUserInfo({
                  success: function (res) {
                    that.getToken(res)
                  }
                })
              }
            },
            fail() {

              that.getLogin()
            }
          })
        } else {

          console.log(2)
        }
      },
      fail(err) {
        console.log(err)
      }
    })

    

  },
  
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    let res = e.detail;
    let that = this;
    if(this.data.sessionKey){
      that.getToken(res);
    }else{
      that.getLogin()
    }
    
    
  },
  getLogin(){
    let that = this;
    // session_key 已经失效，需要重新执行登录流程
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'https://weixin.tdeado.com/miniapp/login',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data.data.sessionKey)
              that.setData({
                sessionKey: res.data.data.sessionKey
              })

              wx.setStorage({
                key: "sessionKey",
                data: res.data.data.sessionKey
              })
              wx.getUserInfo({
                success: function (res) {
                  that.getToken(res)
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getToken(res) {
    let that = this;
    //发起登录请求
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/info',
      data: {
        sessionKey: that.data.sessionKey,
        signature: res.signature,
        rawData: res.rawData,
        encryptedData: res.encryptedData,
        iv: res.iv,
        scene: that.data.scene
      },
      success(res) {
        console.log(res.data)
        that.setData({
          userInfo: res.data.data.userInfo
        })
        wx.setStorage({
          key: "token",
          data: res.data.data.token
        })

        //发起网络请求
        wx.request({
          url: 'https://weixin.tdeado.com/miniapp/me/count',
          header: {
            'token': res.data.data.token,
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            that.setData({
              countData: res.data.data
            })
          }
        })
      }
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail)
    console.log(e.detail.encryptedData)
    let that = this;
    //发起网络请求
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/phone',
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      data: {
        sessionKey: that.data.sessionKey,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      },
      success(res) {
        console.log(res.data)

      }
    })

  }, toCoupons() {
    wx.navigateTo({
      url: '/pages/coupons/coupons',
    })
  }, toFocus() {
    wx.navigateTo({
      url: '/pages/focus/focus',
    })
  }, toHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  }
})