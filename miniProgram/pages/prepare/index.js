const { Ajax } = require('../../utils/service.js');

// pages/prepare/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    corpName: '',
    interviewRecordId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { corpName, interviewRecordId } = options;
    this.setData({
      corpName,
      interviewRecordId: interviewRecordId || ''
    });
  },

  startRecruit: function() {
    const _this =this;
    wx.getSetting({
      success: function (res) {
        console.log(res)
        const authorized = res.authSetting['scope.camera'] && res.authSetting['scope.record']
        if (!authorized) {
          wx.showModal({
            content: '您尚未开启摄像头或麦克风授权，是否跳转授权页面开启授权？',
            success: function (action) {
              if (action.cancel) return
              if (action.confirm) {
                wx.openSetting()
                return;
              }
            }
          })
        } else {
          wx.navigateTo({
            url: `/pages/recruit/index?interviewRecordId=${_this.data.interviewRecordId}`,
          })
        }
      }
    })
  }
})