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
    wx.showToast({
      title: `点击了${e.currentTarget.dataset.key}`,
      icon:'none'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
    wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/card/list",
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