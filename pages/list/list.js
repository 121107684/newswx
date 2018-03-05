// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageindex:1,
    actionSheetHidden: true,
    actionSheetItems: ['分享给朋友', '生成卡片 保存分享', '复制链接']
  },
  listenerButton: function (e) {
    this.setData({
      //取反
      actionSheetHidden: !this.data.actionSheetHidden,
      newid: e.currentTarget.dataset.newid,
      newtitle: e.currentTarget.dataset.newtitle,
      rightindex: e.currentTarget.dataset.index
    });
  },

  listenerActionSheet: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  shareact:function(e){
    this.setData({
     
    })
    console.log(e)
    switch (e.currentTarget.dataset.index) {
          case 0:
            
            break;
          case 1:
            console.log(e)
            wx.navigateTo({
              url: '../images/images?id=' +this.data.newid
            })
            break;
          case 2:
            wx.setClipboardData({
              data: "https://xcx.su77.net/api/new?id=" + this.data.newid,
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
       
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.publicpost("/article",'GET',{page:this.data.pageindex},res=>{
      this.setData({
        newlist:res.data.data,
        pageindex: this.data.pageindex + 1
      })
    })
    wx.showShareMenu({
      withShareTicket: true
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
    wx.showShareMenu({
      withShareTicket: true
    })
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      pageindex:1 
    })
    app.publicpost("/article", 'GET', { page: this.data.pageindex }, res => {
      this.setData({
        newlist: res.data.data,
        pageindex: this.data.pageindex++
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    app.publicpost("/article", 'GET', { page: this.data.pageindex }, res => {
      var newarr = this.data.newlist;
      var temparr = newarr.concat(res.data.data);
      this.setData({
        newlist: temparr,
        pageindex: this.data.pageindex+1
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '微信八九财经',
      desc: this.data.newtitle,
      path: '/page/card/card?id=' + this.data.newid + '&index=' + this.data.index,
      success:(res)=>{
        this.listenerActionSheet()
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) =>{
        this.listenerActionSheet()
        console.log(res)
      }
    }
  }
})