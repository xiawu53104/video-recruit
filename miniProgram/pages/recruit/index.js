const { Ajax } = require('../../utils/service.js');

const btnList = [
  { name: 'start', text: '开始答题' },
  { name: 'next', text: '下一题' },
];

const LIMIT_ANSWER_TIME = 5;

// pages/recruit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interviewRecordId: '',
    answerExamPaperDetailId: '',
    quesInfo: {},
    quesDuration: 60,
    currentBtnName: 'start',
    currentBtnText: '开始答题',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { interviewRecordId } = options;
    this.setData({
      interviewRecordId
    })
    this.getQuesInfo();
  },

  onReady: function () {
    this.livePusherCtx = wx.createLivePusherContext('myPusher');
    this.innerAudioCtx = wx.createInnerAudioContext();

    this.innerAudioCtx.onEnded(() => {
      this.startAnswer();
    });
  },

  getQuesInfo: function() {
    const { interviewRecordId, answerExamPaperDetailId } = this.data;
    Ajax({
      url: `/app/interviewAiRecord/getCurrentExamPaperDetail.do`,
      data: {
        interviewRecordId,
        answerExamPaperDetailId
      }
    }).then(res => {
      console.log(res);
      if (res.data.recordStatus === 3) {
        wx.navigateTo({
          url: '/pages/complete/index',
        })
      } else {
        this.setData({
          quesInfo: res.data,
          answerExamPaperDetailId: res.data.interviewExamPaperDetailId,
          quesDuration: res.data.duration,
        });
        this.innerAudioCtx.title = 'xx';
        this.innerAudioCtx.src = res.data.audioUrl;
        this.innerAudioCtx.play();
      }
    })
  },

  // 开始答题
  startAnswer: function () {
    this.innerAudioCtx.pause();

    this.setData({
      currentBtnName: 'next',
      currentBtnText: '下一题'
    });

    this.startCutdown();  // 开始倒计时
    this.startLimitCount();  // 最短答题时间计时
  },

  startCutdown: function () {
    this.t = setInterval(() => {
      let total = this.data.quesDuration;
      if (total > 0) {
        total--;
        this.setData({
          quesDuration: total
        });
      } else {
        this.handleNext();
        clearInterval(this.t);
      }
    }, 1000);
  },

  startLimitCount: function () {
    this.limitTime = LIMIT_ANSWER_TIME;
    this.tt = setInterval(() => {
      let total = this.limitTime;
      if (total > 0) {
        this.limitTime--;
      } else {
        clearInterval(this.tt);
      }
    }, 1000)
  },

  // 下一题
  handleNext: function () {
    if (this.limitTime > 0) {
      wx.showToast({
        title: `最短答题时长为${LIMIT_ANSWER_TIME}秒`,
        icon: 'none',
        duration: 1000
      });
      return;
    }

    this.livePusherCtx.stop();
    this.t && clearInterval(this.t);
    this.setData({
      currentBtnName: 'start',
      currentBtnText: '开始答题',
    });

    this.getQuesInfo();
  },

  handleClick: function () {
    if (this.data.currentBtnName === 'start') {
      this.startAnswer();
    } else {
      this.handleNext();
    }
  },
})