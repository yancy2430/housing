Component({
	data: {
    active: 0,
    ms:0,
		list: [
      {
        "icon":"hotel-o",
        "url": "/pages/index/settle",
        "text": "落户"
      },
      {
        "icon":"flower-o",
        "url": "/pages/index/edu",
        "text": "教育"
      },
      {
        "icon":"newspaper-o",
        "url": "/pages/index/news",
        "text": "证件"
      },
      {
        "icon": "home-o",
        "url": "/pages/index/index",
        "text": "新房"
      },
      {
        "icon":"contact",
        "url": "/pages/index/me",
        "text": "我的"
      }
    ]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
      const page = getCurrentPages().pop();
      let that = this;
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
      if(wx.getStorageSync('user')){
        wx.request({
          url: 'https://weixin.tdeado.com/im/message/unMsgNum?token='+wx.getStorageSync('user').token,
          success(res){
            that.setData({
              ms:res.data.data
            })
            wx.setStorageSync('ms', res.data.data)
          }
        })
      }
      
      

    }
    ,
    onMessage(res){
      
      console.log(res)
        
    }
	}
});
