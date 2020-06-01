const { getRecruitList } = require('./apis.js');

// pages/userCenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitList: []
  },

  onShow: function (options) {
    this.initData();
  },

  initData: function () {
    getRecruitList().then(res => {
      this.setData({
        recruitList: res.recordList
      });
    })
  },

  clickHandle: function (e) {
    const i = e.currentTarget.dataset.index;
    const item = this.data.recruitList[i];
    wx.setStorageSync('recruitRecord', item);

    wx.navigateTo({
      url: '/pages/recordDetail/index',
    })
  }

})