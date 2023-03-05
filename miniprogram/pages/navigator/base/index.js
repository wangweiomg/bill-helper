// pages/navigator/base/index.js
import tabbar from '../../tabbar'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: tabbar
   
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
  
    const result = wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/card",
      "header": {
        "X-WX-SERVICE": "springboot-kj23"
      },
      "method": "GET"
    }).then(res => {
      console.log('@1', res.data)

      console.log('@2', res.data.data)

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