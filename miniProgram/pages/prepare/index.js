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
      interviewRecordId
    });
  },

  startRecruit: function() {
    wx.navigateTo({
      url: `/pages/recruit/index?interviewRecordId=${this.data.interviewRecordId}`,
    })
  }
})