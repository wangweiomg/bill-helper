import tabbar from '../../tabbar'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: tabbar,
    cardList: [],
    totalCardLimit: 0
   
  },
  clickListItem(e){
    console.log('card-list-->', e)
    
    wx.navigateTo({
      url: '/pages/form/card/index',
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        const card = this.data.cardList.filter(i => i.id == e.currentTarget.dataset.key)[0];
        card.isFromList = true;
        res.eventChannel.emit('sendCardData', card)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
    const userId = getApp().globalData.userInfo.id;
    wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/card/list?userId="+userId,
      "header": {
        "X-WX-SERVICE": "springboot-kj23"
      },
      "method": "GET"
    }).then(res => {
      this.setData({
        cardList: res.data.data,
        totalCardLimit: res.data.data.map(e => e.cardLimit).reduce((prev, curr) => prev + curr, 0) / 10000
      })

    }).catch(err => console.error(err))


    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})