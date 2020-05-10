// pages/component/screen.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectData:{
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change:function(e){
      let value = e.detail
      let type = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      this.data.selectData[type]=value

      for (const key in this.properties.data[index].data) {
        if (this.properties.data[index].data.hasOwnProperty(key)) {
          const element = this.properties.data[index].data[key];
          if(element.value==value){
            this.properties.data[index].value=element.value
            this.properties.data[index].selectTitle=element.text
          }
        }
      }

      this.triggerEvent('choose', {
        data:this.properties.data,
        selectData:this.data.selectData
      })
     
    }
  }
})
