const { Ajax, BASE_URL } = require('../../utils/service.js');

//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    code: '',
    btnDisable: true,
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: BASE_URL + '/app/interviewerUser/wxLogin.do',
          method: 'post',
          data: {
            code: res.code
          },
          success: function (res) {
            const token = res.data.data.token;
            wx.setStorageSync('token', token);
          }
        })
      }
    })
  },
  //事件处理函数
  startRecruit: function() {
    Ajax({
      url: `/app/interviewAiRecord/start.do`,
      data: {
        code: this.data.code
      }
    }).then(res => {
      const { corpName, interviewRecordId } = res.data;
      wx.navigateTo({
        url: `/pages/prepare/index?corpName=${corpName}&interviewRecordId=${interviewRecordId}`,
      });
    });
  },
  
  handleInput: function(e) {
    const v = e.detail.value;

    this.setData({
      code: v,
      btnDisable: v.length !== 6,
    });
  },

  startMoni: function() {
    Ajax({
      url: `/app/interviewAiTestRecord/start.do`
    }).then(res => {
      const { corpName } = res.data;
      wx.navigateTo({
        url: `/pages/prepare/index?corpName=${corpName}`,
      });
    })
  },

  onShareAppMessage: function () {
    
  }
})
