// pages/me/me.js
const app = getApp()
Page({
  data:{

    token: wx.getStorageSync('token'),
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.scene){

      wx.setStorage({
        key: "scene",
        data: options.scene
      })
    }
    
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
    
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.checkSession({
            success() {
              //session_key 未过期，并且在本生命周期一直有效
              console.log(that.data.sessionKey)
              if (that.data.sessionKey) {
                wx.getUserInfo({
                  success: function (res) {
                    that.getToken(res)
                  }
                })
              }
            },
            fail() {

              this.getLogin()
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
  /**
   * 页面的初始数据
   */
  data: {
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    let res = e.detail;
    let that = this;
    if (this.data.sessionKey) {
      this.getToken(res);
    } else {
      this.getLogin()
    }


  },
  getLogin() {
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
        scene: wx.getStorageSync('scene')
      },
      success(res) {
        console.log(res.data)
        that.setData({
          userInfo: res.data.data.userInfo
        })

        wx.setStorage({
          key: "userInfo",
          data: res.data.data.userInfo
        })
        wx.setStorage({
          key: "isStaff",
          data: res.data.data.isStaff
        })
        
        wx.setStorage({
          key: "token",
          data: res.data.data.token
        })

        wx.switchTab({
          url: '/pages/index/me'
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