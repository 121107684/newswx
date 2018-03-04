//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  publicpost: function (url, method, data, successcall, servererror) {
    let that = this
    var thistoken = wx.getStorageSync('token')
    let postdata = { ...data }
    wx.request({
      url: 'https://xcx.su77.net/api' + url, //仅为示例，并非真实的接口地址
      method: method,
      data: postdata,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        successcall(res);
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)

      },
      fail: function (res) {
        //servererror(res);
        wx.hideLoading()
      }
    })
  }

})