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
    
    app.publicpost("/article/info.html", 'GET', { id: this.data.imagesid }, res => {
      this.setData({
        newlist: res.data.data
      })
      var srcww = wx.getSystemInfoSync().windowWidth
      var tith = (this.data.newlist.post_title.length * 16) / srcww
      var contenth = (this.data.newlist.post_content.length * 12) / srcww
      console.log(Math.ceil(contenth))
      this.setData({
        srchei: tith * 25*3 + contenth*20*3 +300*3,
        srcwid: wx.getSystemInfoSync().windowWidth*3
      })

      const ctx = wx.createCanvasContext('myCanvas');
      const ctxsm = wx.createCanvasContext('myCanvassm');
      this.dataonShow(3, ctx)
      this.dataonShow(1, ctxsm)
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
  dataonShow: function (n,ctx) {
   
      console.log()
      const ongtext = this.data.newlist
     
      
      ctx.setFillStyle('white')
      // console.log(0, 0, wx.getSystemInfoSync().windowHeight, this.data.srchei)
      ctx.fillRect(0, 0, wx.getSystemInfoSync().windowHeight*n, this.data.srchei*n)
      ctx.restore()
      ctx.setFillStyle('black')
      ctx.setFontSize(16 * n)
      ctx.setTextAlign('center')
      var chr = ongtext.post_title.split("");
      var temp = "";
      var row = [];
      var ystart = 30 * n
      ctx.textBaseline = "middle";

      for (var a = 0; a < chr.length; a++) {
        if (temp.length * 16 * n < (wx.getSystemInfoSync().windowWidth - 60 * n) * n) { }
        else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      }
      row.push(temp);
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], (wx.getSystemInfoSync().windowWidth / 2) * n, ystart + (b + 1) * 20 * n);
      } 
      ystart = ystart + b * 20 * n
      ctx.setTextAlign('right')
      ystart = ystart + 25 * n
      ctx.setFontSize(12 * n)
      ctx.fillText(ongtext.published_time, wx.getSystemInfoSync().windowWidth * n - 20 * n, ystart)
      ystart = ystart + 15 * n
      console.log(ystart)
      ctx.strokeStyle = "#333";
      ctx.moveTo(20 * n, ystart);
      ctx.lineTo(wx.getSystemInfoSync().windowWidth * n - 20 * n, ystart);
      ctx.setTextAlign('left')
      ctx.setFontSize(12 * n)
      ctx.stroke();
      ystart = ystart + 10 * n
      drawText(ongtext.post_content, 20 * n, ystart, wx.getSystemInfoSync().windowWidth * n, ctx);
      console.log(wx.getSystemInfoSync().windowWidth * n / 2 - 50 * n, this.data.srchei / (n==3?1:3) - 140 * n, 100 * n, 100 * n)
      ctx.drawImage("../../utils/code.jpg", wx.getSystemInfoSync().windowWidth * n / 2 - 50 * n, this.data.srchei / (n == 3 ? 1 : 3) - 140 * n, 100 * n, 100 * n)
      ctx.draw()
      

    
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
      console.log(chr)
      ctx.textBaseline = "middle";
      var sunw = 0
      for (var a = 0; a <t.length; a++) {
        if (sunw > w-20) { 
          row.push(temp);
          temp = "";
          sunw = 0
        }
        if (t.charCodeAt(a) > 128) {
          sunw+=13*n
        } else {
          sunw += 8*n
        }
        temp += chr[a];
      }
      row.push(temp);
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * 20*n);
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
      width: wx.getSystemInfoSync().windowWidth*3,
      height: this.data.srchei,
      destWidth: wx.getSystemInfoSync().windowWidth * 3,
      destHeight: this.data.srchei,
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