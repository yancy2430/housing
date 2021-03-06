function check(that){
  if(wx.getStorageSync('session')){
    wx.checkSession({
      success() {
        getUserInfo(that)
      },
      fail() {
        login(that)
      }
    })
  }else{
    login(that)
  }
}

function login(that){
  wx.login({
    success(res) {
      console.log(res)
      if (res.code) {
        //发起网络请求
        wx.request({
          url: getApp().globalData.domain+'/mini/member/maLogin',
          data: {
            code: res.code,
            scene: wx.getStorageSync('scene') || ''
          },
          success(res) {
            wx.setStorageSync('session', res.data.data)
            getUserInfo(that)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
        wx.showToast({
          title: res.errMsg,  // 标题
          icon: 'none',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      }
    }
  })
}

function getUserInfo(that){
  wx.request({
    url: getApp().globalData.domain+'/mini/member/userInfo',
    header: {
      'content-type': 'application/json', // 默认值
      'token':wx.getStorageSync('session').token
    },
    success(res) {
      if(res.data.code==0){
        wx.setStorageSync('userInfo', res.data.data)
        if(that.loginCallback){
          that.loginCallback(res.data.data)
        }
      }else{
        wx.showToast({
          title: res.data.msg,  // 标题
          icon: 'none',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      }
     
    }
  })

}


function getTokenByPhone(that,e,yes){
  //发起网络请求
  wx.request({
    url: getApp().globalData.domain+'/mini/member/setPhone',
    header: {
      "token":wx.getStorageSync('session').token,
      'content-type': 'application/json' // 默认值
    },
    data: {
      openId:wx.getStorageSync('session').openid,
      unionId:wx.getStorageSync('session').unionid || '',
      sessionKey: wx.getStorageSync('session').sessionKey,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
    },
    success(res) {
      console.log(res)
      if(res.data.code==0){
        
        login(that)
        if(yes){
          yes(res.data);
        }
      }else{
        wx.showToast({
          title: res.data.msg,  // 标题
          icon: 'none',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      }
     
    }
  })
}
module.exports = {
  check: check,
  login: login,
  getTokenByPhone:getTokenByPhone
};