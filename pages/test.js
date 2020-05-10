// pages/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId:null,
    data:[
      {
        "id":"area",
        "name": "区域",
        "data": [
          {
            "text": "不限",
            "value": 0
          },
          {
            "text": "温州",
            "value": 1
          },
          {
            "text": "杭州",
            "value": 2
          }
        ]
      },
      {
        "id":"model",
        "name": "户型",
        "data": [
          {
            "text": "不限",
            "value": 0
          },
          {
            "text": "一居室",
            "value": 1
          },
          {
            "text": "二居室",
            "value": 2
          },
          {
            "text": "三居室",
            "value": 3
          }
        ]
      },
      {
        "id":"price",
        "name": "价格",
        "data": [
          {
          "text": "不限",
          "value": "0"
        },
        {
          "text": "40万以下",
          "value": "0-40"
        },
        {
          "text": "40-60万",
          "value": "40-60"
        },
        {
          "text": "60-80万",
          "value": "60-80"
        },
        {
          "text": "80-100万",
          "value": "80-100"
        },
        {
          "text": "100-150万",
          "value": "100-150"
        },
        {
          "text": "150-200万",
          "value": "150-200"
        },
        {
          "text": "200万以上",
          "value": "200"
        }
      ]
      },
      {
        "id":"sort",
        "name": "排序",
        "data": [
          {
            "text": "默认",
            "value": 0
          },
          {
            "text": "价格",
            "value": 1
          }
        ]
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  choose: function (options) {
    console.log(options.detail)
    this.setData({
      data:options.detail.data
    })
  },

})