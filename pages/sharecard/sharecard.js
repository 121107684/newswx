// pages/sharecard/sharecard.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetItems: ['分享给朋友', '生成卡片 保存分享', '复制链接']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        this.setData({
          winHeight: calc,
          centerwinHeight: calc - 30
        });
      }
    });
    app.publicpost("/article/info.html", 'GET', { id: options.idshare}, res => {
      this.setData({
        item: res.data.data,
      });
    })
  },
  listenerButton: function (e) {
    this.setData({
      //取反
      actionSheetHidden: !this.data.actionSheetHidden,
      newid: e.currentTarget.dataset.newid,
      newtitle: e.currentTarget.dataset.newtitle,
      rightindex: e.currentTarget.dataset.index,
      newurl: e.currentTarget.dataset.url
    });
  },

  listenerActionSheet: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  shareact: function (e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        break;
      case 1:
        console.log(e)
        wx.navigateTo({
          url: '../images/images?id=' + this.data.newid
        })
        break;
      case 2:
        wx.setClipboardData({
          data: this.data.newurl,
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
        break;
    }
    this.listenerActionSheet()
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