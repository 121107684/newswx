// pages/images/images.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      imagesid: options.id
    })
    console.log(wx.getSystemInfoSync().windowHeight)
    this.setData({
      srchei: wx.getSystemInfoSync().windowHeight - 100
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
    app.publicpost("/article/info.html", 'GET', { id: this.data.imagesid }, res => {
      this.setData({
        newlist: res.data.data
      })
      const ongtext = res.data.data
      console.log(ongtext)
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.setFontSize(16)
      ctx.setTextAlign('center')
      
      ctx.fillText(ongtext.post_title, wx.getSystemInfoSync().windowWidth / 2, 80)
      ctx.strokeStyle = "blue";
      ctx.moveTo(20, 100);
      ctx.lineTo(wx.getSystemInfoSync().windowWidth - 20, 100);
      ctx.setTextAlign('left')
      ctx.setFontSize(12)
      ctx.stroke();
      drawText(ongtext.post_content, 20, 120, wx.getSystemInfoSync().windowWidth, ctx);
      console.log(ctx)
      console.log(this.data.srchei)
      ctx.drawImage("../../utils/code.jpg", wx.getSystemInfoSync().windowWidth / 2 - 60, this.data.srchei-150,120, 120)
      ctx.draw()

    });
    function drawtitle(){

    }
    function drawText(t, x, y, w, ctx) {

      var chr = t.split("");
      var temp = "";
      var row = [];

      ctx.textBaseline = "middle";

      for (var a = 0; a < chr.length; a++) {
        if (temp.length * 14 < w) { }
        else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      }
      row.push(temp);
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * 20);
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  saveimg:function(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight - 100,
      destWidth: wx.getSystemInfoSync().windowWidth,
      destHeight: wx.getSystemInfoSync().windowHeight - 100,
      canvasId: 'myCanvas',
      success: function (res) {
          console.log(res)
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
              success(res) {
                console.log(res)
              }
          })
        
      }
    })
  
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