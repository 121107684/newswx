var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [],
    item: [],
    actionSheetHidden: true,
    actionSheetItems: ['分享给朋友', '生成卡片 保存分享', '复制链接']
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e)
    if (e.detail.current / 10 == (this.data.ajaxnumup - 1) && (this.data.ajaxnumup - 1)>0){
      this.setData({
        ajaxnumup: this.data.ajaxnumup - 1
      })
      app.publicpost("/article", 'GET', { page: this.data.ajaxnumup }, res => {
        var iteminto = this.data.item
        var j = 0;
        for (var i = (this.data.ajaxnumup - 1) * 10; i < (this.data.ajaxnumup - 1) * 10 + res.data.data.length; i++) {
          iteminto[i] = res.data.data[j];
          j++
        }
        this.setData({
          item: iteminto
        })
      })
    }
    if (e.detail.current == this.data.item.length - 1) {
      console.log(e)
      this.setData({
       ajaxnum: this.data.ajaxnum+1
     })
     console.log(this.data.ajaxnum)
      app.publicpost("/article", 'GET', { page: this.data.ajaxnum }, res => {
        var iteminto = this.data.item
        var j = 0;
        for (var i = (this.data.ajaxnum - 1) * 10; i < (this.data.ajaxnum - 1) * 10 + res.data.data.length; i++) {
          iteminto[i] = res.data.data[j];
          j++
        }
        this.setData({
          item: iteminto
        })
      })

      // this.data.item.push(-1, -2, -3)
      // this.setData({
      //   item: this.data.item
      // });
      console.log(this.data.item)
    }
   
    
  },
 
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (option) {
    console.log(option)
    var newarrthis = new Array();
    for (var i = 0; i < Math.ceil((+option.index + 1) / 10) * 10; i++) {
      newarrthis[i] = {};
    }
    if (option.idshare==undefined){
      this.setData({
        currentTab: +option.index,
        ajaxnum: Math.ceil((+option.index + 1) / 10),
        ajaxnumup: Math.ceil((+option.index + 1) / 10)
      })
      this.setData({
        item: newarrthis
      })
    }else{
      this.setData({
        currentTab: 0,
        ajaxnum: 1,
        ajaxnumup: 1,
        sharenewid: option.idshare
      })
    }
    
    //  高度自适应
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
  },
  onShow: function () {
    if (this.data.sharenewid==undefined){
      var odjdata = { page: this.data.ajaxnum }
    }else{
      var odjdata = { page: this.data.ajaxnum, startid: this.data.sharenewid}
    }
    app.publicpost("/article", 'GET', odjdata, res => {
      var iteminto = this.data.item
      var j = 0;
      for (var i = (this.data.ajaxnum - 1) * 10; i < (this.data.ajaxnum - 1) * 10 + res.data.data.length;i++ ){
        iteminto[i] = res.data.data[j];
        j++
      }
      this.setData({
        item: iteminto
        //pageindex: this.data.pageindex + 1
      })
      // console.log(this.data.item)
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
  shareacthide: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onShareAppMessage: function () {
    return {
      title: '微信八九财经',
      desc: this.data.newtitle,
      path: 'pages/sharecard/sharecard?idshare=' + this.data.newid,
      success: (res) => {
        this.listenerActionSheet()
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        this.listenerActionSheet()
        console.log(res)
      }
    }
  }
})