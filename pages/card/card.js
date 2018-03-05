var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [],
    item: []
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e)
    if (e.detail.current == this.data.item.length - 1) {

      this.data.item.push(-1, -2, -3)
      this.setData({
        item: this.data.item
      });

    }
    console.log(this.data.item)
    // this.setData({
    //   currentTab: e.detail.current
    // });
    //this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  // swichNav: function (e) {
  //   var cur = e.target.dataset.current;
  //   if (this.data.currentTaB == cur) { return false; }
  //   else {
  //     this.setData({
  //       currentTab: cur
  //     })
  //   }
  // },
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
    for (var i = 0; i < Math.ceil((+option.index + 1) / 10) * 10;i++){
      newarrthis[i] = {};
    }
    this.setData({
      currentTab:+option.index,
      ajaxnum: Math.ceil((+option.index+1) / 10) 
    })
    this.setData({
      item: newarrthis
    })
    //console.log(this.data.ajaxnum)
    

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
    app.publicpost("/article", 'GET', { page: this.data.ajaxnum }, res => {
      var placrdata = this.data.currentTab;
      console.log(this.data.currentTab);
      var iteminto = this.data.item.splice(placrdata, 10, res.data.data)
      console.log(res.data.data.every())
      // this.setData({
      //   item: this.data.item.splice(placrdata, 10, res.data.data.every()),
      //   //pageindex: this.data.pageindex + 1
      // })
      // console.log(this.data.item)
    })

  },
})