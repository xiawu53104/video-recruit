const { getPositionList, getImgCode, getSmsCode, recordRecruit, startRecruit } = require('./apis.js');

// pages/scanCode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    corpName: '',
    positions: [],
    selectIndex: null,
    imgCodeUrl: '',
    userInfo: {
      name: '',
      mobile: '',
      positionId: '',
      code: '',
      smsCode: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const secen = decodeURIComponent(options.secen || '');
    const code = secen || '5EC7DD8BE4B0AF822954BAA5';
    this.uniCode = code;

    getPositionList(code).then(data => {
      this.setData({
        corpName: data.corpName,
        positions: data.positions,
      });
    });
  },

  inputHandle: function (e) {
    const result = {
      ...this.data.userInfo,
      [e.target.dataset.name]: e.detail.value
    }

    this.setData({
      userInfo: result
    });
  },

  bindPickerChange: function (e) {
    const val = e.detail.value;
    const { userInfo, positions } = this.data;
    userInfo.positionId = positions[val].positionId;

    this.setData({
      selectIndex: e.detail.value,
      userInfo: userInfo
    })
  },

  openModal: function (e) {
    const { name, mobile, positionId } = this.data.userInfo;
    if (!name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    if (!mobile || !/^\d{11}$/.test(mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    if (!positionId) {
      wx.showToast({
        title: '面试岗位不能为空',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    getImgCode(mobile).then(res => {
      this.setData({
        imgCodeUrl: res.data.img,
        showModal: true,
      })
    })
  },

  closeModal: function () {
    this.setData({
      showModal: false
    })
  },

  refreshImgCode: function () {
    const { mobile } = this.data.userInfo;
    getImgCode(mobile).then(res => {
      this.setData({
        imgCodeUrl: res.data.img,
      })
    })
  },

  fetchSmsCode: function () {
    const sendData = JSON.parse(JSON.stringify(this.data.userInfo));
    delete sendData.smsCode;
    delete sendData.name;
    sendData.eq = sendData.mobile;
    sendData.interviewAiBatchRecordCode = this.uniCode;
    getSmsCode(sendData).then(res => {
      this.setData({
        showModal: false
      });
      if (res.msg) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1200
        });
      } else {
        wx.showToast({
          title: '发送成功',
          icon: 'none',
          duration: 1200
        });
      }
    })
  },

  handleClick: function () {
    const { name, mobile, positionId, smsCode } = this.data.userInfo;
    if (!name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    if (!mobile || !/^\d{11}$/.test(mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    if (!positionId) {
      wx.showToast({
        title: '面试岗位不能为空',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    if (!smsCode) {
      wx.showToast({
        title: '短信验证码不能为空',
        icon: 'none',
        duration: 1200
      });
      return;
    }

    const sendData = JSON.parse(JSON.stringify(this.data.userInfo));
    delete sendData.code;
    sendData.code = this.uniCode;
    recordRecruit(sendData).then(res => {
      if (res.msg) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1200
        });
        return;
      }
      const { interviewAiRecordCode } = res.data;
      startRecruit(interviewAiRecordCode).then(response => {
        const { corpName, interviewRecordId } = response;
        wx.navigateTo({
          url: `/pages/prepare/index?corpName=${corpName}&interviewRecordId=${interviewRecordId}`,
        });
      })
    })
  }
})