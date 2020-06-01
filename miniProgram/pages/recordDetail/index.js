// pages/recordDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: {}
  },

  onShow: function () {
    const data = wx.getStorageSync('recruitRecord');
    this.setData({
      record: data
    })
  },

  clickHandle: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }

})