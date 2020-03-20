// pages/product/report.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    mobile:"",
    show:false,
    minHour: 9,
    maxHour: 20, 
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      } else if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    minDate: new Date().getTime(),
    maxDate: new Date(2099, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    selectDate:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      productId: options.id,
      token: wx.getStorageSync("user").token
    }) 
  },
  submit(){

    let that =this;
    console.log(this.data.name)
    if (!this.data.name && !this.data.mobile && !this.data.selectDate) {
      Toast('必填项不能为空');
      return;

    }
    wx.request({
      url: 'https://weixin.tdeado.com/miniapp/report',
      data: {
        name: that.data.name,
        mobile: that.data.mobile,
        date: that.data.selectDate,
        productId: that.data.productId,
      },
      header: {
        'token': that.data.token,
      },
      success(res) {
        console.log(res.data)
        if (res.data.code==0){
          const toast = Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '报备成功',
            loadingType: 'success',
            selector: '#custom-selector'
          });
          let second = 3;
          const timer = setInterval(() => {
            second--;
            if (second) {
              toast.setData({
                message: `报备成功`
              });
            } else {
              clearInterval(timer);
              Toast.clear();
              wx.navigateBack({

              })
            }
          }, 1000);
        }else{
          Toast('报备失败');
        }
      }
    })


  },
  onChangeName(value) {
    this.setData({
      name: value.detail
    })
  },
  onChangeMobile(value) {
    this.setData({
      mobile: value.detail
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onConfirm(event) {

    this.setData({
      selectDate: this.formatDate(new Date(event.detail))
    });
    this.setData({ show: false });
  },


  onClose() {
    this.setData({ show: false });
  },
  formatDate(now) {
    var year = now.getFullYear();  //取得4位数的年份
    var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
    var date = now.getDate();      //返回日期月份中的天数（1到31）
    var hour = now.getHours();     //返回日期中的小时数（0到23）
    var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    var second = now.getSeconds(); //返回日期中的秒数（0到59）
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + "00";
  }
})