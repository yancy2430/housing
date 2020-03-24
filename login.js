function login(that){

   // session_key 已经失效，需要重新执行登录流程
   wx.login({
    success(res) {
      console.log(res)
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'https://weixin.tdeado.com/miniapp/login',
          data: {
            code: res.code
          },
          success(res) {
            wx.setStorage({
              key: "session",
              data: res.data.data
            })

          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}


function getTokenByPhone(that,e,yes){
  //发起网络请求
  wx.request({
    url: 'https://weixin.tdeado.com/miniapp/phone',
    header: {
      'content-type': 'application/json' // 默认值
    },
    data: {
      openId:wx.getStorageSync('session').openid,
      unionId:wx.getStorageSync('session').unionid,
      sessionKey: wx.getStorageSync('session').sessionKey,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
    },
    success(res) {
      console.log(res)
      if(res.data.code==0){
        wx.setStorage({
          key: "user",
          data: res.data.data
        })
        wx.setStorageSync('sourcePhone', res.data.data.sourcePhone)
        if(yes){
          yes(res.data);
        }
      }
     
    }
  })
}
module.exports = {
  login: login,
  getTokenByPhone:getTokenByPhone
};