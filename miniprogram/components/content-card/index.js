// components/content-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String
    },
    cardPadding: {
      type: Boolean,
      value: true
    },
    isShowAddIcon: {
      type: Boolean,
      value: true
    },
    desc: {
      type: String
    },

    businessId: {
      type: String
    }

  

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickAddIcon(e) {
    
      let navigateTo = ''
      switch (this.properties.businessId) {
        case "credit_card":
          navigateTo = "/pages/form/card/index";
          break;
        case "promissory_note":
          navigateTo = "/pages/form/promissory/index";
          break;
        case "iou":
          navigateTo = "/pages/form/iou/index";
          break;
      }
      wx.navigateTo({
        url: navigateTo,
      })


    }

  }
})
