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
      srchei: wx.getSystemInfoSync().windowHeight - 80
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
      
      var chr = ongtext.post_title.split("");
      var temp = "";
      var row = [];
      var ystart =30
      ctx.textBaseline = "middle";

      for (var a = 0; a < chr.length; a++) {
        if (temp.length * 16 < wx.getSystemInfoSync().windowWidth) { }
        else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      }
      row.push(temp);
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], wx.getSystemInfoSync().windowWidth / 2, ystart + (b + 1) * 20);
      } 
      ystart = ystart + b*20
      ctx.setTextAlign('right')
      ystart = ystart + 25
      ctx.setFontSize(12)
      ctx.fillText(ongtext.published_time, wx.getSystemInfoSync().windowWidth-20, ystart)
      ystart = ystart+15
      console.log(ystart)
      ctx.strokeStyle = "#333";
      ctx.moveTo(20, ystart);
      ctx.lineTo(wx.getSystemInfoSync().windowWidth - 20, ystart);
      ctx.setTextAlign('left')
      ctx.setFontSize(12)
      ctx.stroke();
      ystart = ystart+10
      drawText(ongtext.post_content, 20, ystart, wx.getSystemInfoSync().windowWidth, ctx);
      console.log(ctx)
      console.log(this.data.srchei)
      ctx.drawImage("../../utils/code.jpg", wx.getSystemInfoSync().windowWidth / 2 -50, this.data.srchei-100,100, 100)
      ctx.draw()

    });
    function drawtitle(){
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
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
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
  
  }

  /**
   * 用户点击右上角分享
   */
  
})