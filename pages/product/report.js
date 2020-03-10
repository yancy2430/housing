// pages/product/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    minHour: 9,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2099, 10, 1).getTime(),
    currentDate: new Date().getTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  }
})