// pages/product/list.js
Page({  
  
  onLoad: function (options) {
  if(options.scene){
    wx.setStorageSync('scene', options.scene)
  }

    this.data.where.area = options.areaId || '';
    console.log(this.data.where)
    this.setData({
      where: this.data.where
    });
    this.getProdcut();
  },
  /**
   * 页面的初始数据
   */
  data: {
    max: 100,
    token: wx.getStorageSync('token'),
    houseType: [{
        text: "不限",
        value: 0,
        selectd: true
      },
      {
        text: "1居",
        value: 1,
        selectd: false
      },
      {
        text: "2居",
        value: 2,
        selectd: false
      },
      {
        text: "3居",
        value: 3,
        selectd: false
      },
      {
        text: "4居",
        value: 4,
        selectd: false
      },
      {
        text: "5居+",
        value: 5,
        selectd: false
      }
    ],
    areaList: [{
      // 导航名称
      text: '城区',
      // 禁用选项
      disabled: false,
      // 该导航下所有的可选项
      children: []
    }],
    priceInterval: [{
        "text": "总价",
        "disabled": false,
        "children": [{
            "text": "不限",
            "id": "0"
          },
          {
            "text": "40万以下",
            "id": "0-40"
          },
          {
            "text": "40-60万",
            "id": "40-60"
          },
          {
            "text": "60-80万",
            "id": "60-80"
          },
          {
            "text": "80-100万",
            "id": "80-100"
          },
          {
            "text": "100-150万",
            "id": "100-150"
          },
          {
            "text": "150-200万",
            "id": "150-200"
          },
          {
            "text": "200万以上",
            "id": "200"
          }
        ]
      },
      {
        "text": "单价",
        "disabled": false,
        "children": [{
            "text": "不限",
            "id": "0"
          },
          {
            "text": "5000元/㎡以下",
            "id": "0-5000"
          },
          {
            "text": "5000-8000元/㎡",
            "id": "5000-8000"
          },
          {
            "text": "8000-10000元/㎡",
            "id": "8000-10000"
          },
          {
            "text": "10000-15000元/㎡",
            "id": "10000-15000"
          },
          {
            "text": "15000-20000元/㎡",
            "id": "15000-20000"
          },
          {
            "text": "20000-30000元/㎡",
            "id": "20000-30000"
          },
          {
            "text": "30000-50000元/㎡",
            "id": "30000-50000"
          },
          {
            "text": "50000元/㎡以上",
            "id": "50000"
          }
        ]
      }
    ],
    priceActiveIndex: 0,
    priceActiveId: 0,
    mainActiveIndex: 0,
    activeId: 0,
    selectNum:0,
    sortList: [ {
        text: '综合排序',
        value: 1
      },
      {
        text: '时间排序',
        value: 2
      },
      {
        text: '价格排序',
        value: 3
      }
    ],

    where: {
      area: {},
      price: {},
      houseType: {},
      sort: 0,
      key:""
    }
  },
  sortChange(e) {
    this.data.where.sort = e.detail
    this.setData({
      where: this.data.where
    })
    this.getProdcut();
  },
  onClickPriceNav({
    detail = {}
  }) {
    this.setData({
      priceActiveIndex: detail.index || 0
    });
  },
  onClickPriceItem({
    detail = {}
  }) {
    const priceActiveId = this.data.priceActiveId === detail.id ? null : detail.id;


    this.data.where.price = priceActiveId;
    this.setData({
      priceActiveId: priceActiveId,
      priceTitle: detail.text,
      where: this.data.where
    });
    this.selectComponent('#priceitem').toggle();
    this.getProdcut();
  },

  clickHouseType(e) {
    let selectNum =0
    if (e.currentTarget.dataset.id === 0) {
      for (let i in this.data.houseType) {
        this.data.houseType[i].selectd = false
      }
      this.data.houseType[e.currentTarget.dataset.id].selectd = true;
    } else {
      
      this.data.houseType[0].selectd = false;
      if (this.data.houseType[e.currentTarget.dataset.id].selectd){
        this.data.houseType[e.currentTarget.dataset.id].selectd = false;
      }else{
        this.data.houseType[e.currentTarget.dataset.id].selectd = true;
      }
    }
    for (let i in this.data.houseType) {
      if (this.data.houseType[i].selectd && this.data.houseType[i].text!="不限") {
        selectNum++;
      }
    }
    this.setData({
      houseType: this.data.houseType,
      selectNum: selectNum
    })

    this.getProdcut();
  },
  onHouseTypeConfirm() {
    let list = []
    for (let i in this.data.houseType) {
      if (this.data.houseType[i].selectd) {
        list.push(this.data.houseType[i])
      }
    }
    this.data.where.houseType = list
    this.setData({
      where: this.data.where
    })
    this.selectComponent('#houseTypeitem').toggle();
    this.getProdcut();
  },
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },
  onClickItem({
    detail = {}
  }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    console.log(detail)
    this.data.where.area = detail;
    this.setData({
      activeId: activeId,
      where: this.data.where,
      areaTitle: detail.name
    });

    console.log(this.data.where)
    this.selectComponent('#areaitem').toggle();

    this.getProdcut();
  },
  onSearch(e){
    this.data.where.key = e.detail
    this.setData({
      where: this.data.where
    })
    this.getProdcut();
  },
  toArea(e) {
    wx.navigateTo({
      url: '/pages/index/area',
    })
  },
  goProduct(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/details?id=' + e.currentTarget.dataset.id,
    })
  },
  getProdcut(){
    let that = this;
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/list', //仅为示例，并非真实的接口地址
      data: that.data.where,
      method:"POST",
      header: {
        'token': that.data.token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          products: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    this.setData({
      token: wx.getStorageSync("user").token
    })

    wx.getStorage({
      key: 'area',
      success(res) {
        that.data.where.area = res.data
        that.setData({
          area: res.data,
          where: that.data.where
        })
        wx.request({
          url: "https://weixin.tdeado.com/system/cityArea/byPid?pid=" + res.data.id,
          data: {},
          header: {
            'token': that.data.token,
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            res.data.data.unshift({
              text:"不限",
              id:0
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

      }
    })
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