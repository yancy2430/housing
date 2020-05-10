// pages/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[
      {
        "name": "区域",
        "type": "tree",
        "data": [
          {
            "text": "所有城市",
            "disabled": false,
            "children": [
              {
                "text": "温州",
                "id": 1,
                "disabled": true
              },
              {
                "text": "杭州",
                "id": 2
              }
            ]
          }
        ]
      },
      {
        "name": "户型",
        "type": "tag",
        "data": [
          {
            "text": "一居室",
            "id": 1
          },
          {
            "text": "二居室",
            "id": 1
          },
          {
            "text": "三居室",
            "id": 1
          }
        ]
      },
      {
        "name": "价格",
        "type": "select",
        "data": [
          {
            "text": "所有城市",
            "disabled": false,
            "children": [
              {
                "text": "温州",
                "id": 1,
                "disabled": true
              },
              {
                "text": "杭州",
                "id": 2
              }
            ]
          }
        ]
      },
      {
        "name": "排序",
        "type": "select",
        "data": [
          {
            "text": "默认排序",
            "id": 1
          },
          {
            "text": "价格排序",
            "id": 1
          },
          {
            "text": "时间排序",
            "id": 1
          }
        ]
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})