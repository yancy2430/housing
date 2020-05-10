// pages/product/list.js
Page({

  onLoad: function (options) {
    if (options.scene) {
      wx.setStorageSync('scene', options.scene)
    }
    this.data.where.area = options.areaId || '';
    this.data.area = this.data.where.area
    this.setData({
      where: this.data.where
    });
    let that= this
    wx.request({
      url: 'http://localhost:8080/mini/house/screen?area='+this.data.where.area,
      method: "POST",
      header: {
        'token': wx.getStorageSync('session').token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          screen:res.data.data
        })
      }
  
    })

    this.getProdcut();
  },
  /**
   * 页面的初始数据
   */
  data: {
    screen: [],
    where: {},
    res: {
      current:0,
      records:[]
    }

  },
  onPullDownRefresh() {
    this.data.res.current = 0
    this.data.res.records = []
    this.getProdcut();
  },
  onReachBottom(){
    this.data.res.current=this.data.res.current+1
    this.getProdcut()
  },
  onSearch(e) {
    this.data.where.key = e.detail
    this.setData({
      where: this.data.where
    })
    this.data.res.current = 0
    this.data.res.records = []
    this.getProdcut();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  choose: function (options) {

    let newObj = {};
    Object.assign(newObj,this.data.where,options.detail.selectData)
    this.setData({
      screen: options.detail.data,
      where:  newObj
    })
    console.log(newObj)
    this.data.res.current = 0
    this.data.res.records = []
    this.getProdcut();

  },
  goProduct(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/details?id=' + e.currentTarget.dataset.id,
    })
  },
  getProdcut() {
    let that = this;
    console.log(this.data.where)
    wx.request({
      url: 'http://localhost:8080/mini/house/list?page='+this.data.res.current, //仅为示例，并非真实的接口地址
      data: that.data.where,
      method: "POST",
      header: {
        'token': wx.getStorageSync('session').token,
        'content-type': 'application/json' // 默认值
      },
  
      success(res) {
        that.data.res.current = res.data.data.current
        res.data.data.records.forEach(e => {
          
          that.data.res.records.push(e)
        });

        that.setData({
          res: that.data.res
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
    })

    wx.request({
      url: "https://weixin.tdeado.com/system/cityArea/byPid?pid=" + this.data.where.area,
      data: {},
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        res.data.data.unshift({
          text: "不限",
          id: 0
        })

        that.setData({
          areaList: [{
              // 导航名称
              text: '城区',
              // 禁用选项
              disabled: false,
              // 该导航下所有的可选项
              children: res.data.data
            },

          ]
        })
      }
    })
    that.getProdcut();
  },
  onShareAppMessage: function (res) {
    let user = wx.getStorageSync("user")
    let scene = ''
    if (user.isStaff) {
      scene = user.userInfo.id
    } else {
      scene = user.sourceId
    }
    if (scene == '' || scene == null || scene == undefined) {
      scene = wx.getStorageSync('scene')
    }
    return {
      title: '分享厦门本地宝',
      path: '/pages/index/settle?&scene=' + scene
    }
  },

})