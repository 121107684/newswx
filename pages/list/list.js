// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageindex:1
  },
  shareact:function(e){
    wx.showActionSheet({
      itemList: ['分享给朋友', '生成卡片 保存分享', '复制链接'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
           
            break;
          case 1:
            break;
          case 2:
            wx.setClipboardData({
              data: "https://xcx.su77.net/api/new?id=" + e.currentTarget.dataset.newid,
              success: function (res) {
                console.log(res)
              }
            })
            break;
        }
       
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.publicpost("/article",'GET',{page:this.data.pageindex},res=>{
      this.setData({
        newlist:res.data.data
      })
    })
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