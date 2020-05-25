const { Ajax } = require('../../utils/service.js');

function getPositionList(code) {
  return new Promise((resolve, reject) => {
    Ajax({
      url: `/app/interviewAiBatchRecord/verificationCode.do`,
      data: {
        code
      }
    }).then(res => {
      resolve(res.data);
    })
  })
}

function getImgCode(eq) {
  return new Promise((resolve, reject) => {
    // Ajax({
    //   url: `/base/verificationCode/codeV1.do`,
    //   data: {
    //     eq
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    wx.request({
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: 'http://zhaopin.iwatchcloud.com/base/verificationCode/codeV1.do',
      method: 'post',
      data: {
        eq: eq
      },
      success: function (res) {
        resolve(res.data);
      }
    })
  })
}

function getSmsCode(data) {
  return new Promise((resolve, reject) => {
    Ajax({
      url: `/app/interviewAiBatchRecord/sendRecordSms.do`,
      data
    }).then(res => {
      resolve(res);
    })
  })
}

function recordRecruit(data) {
  return new Promise((resolve, reject) => {
    Ajax({
      url: `/app/interviewAiBatchRecord/record.do`,
      data
    }).then(res => {
      resolve(res);
    })
  })
}

function startRecruit(code) {
  return new Promise((resolve, reject) => {
    Ajax({
      url: `/app/interviewAiRecord/start.do`,
      data: {
        code
      }
    }).then(res => {
      resolve(res.data);
    })
  })
}

module.exports = {
  getPositionList,
  getImgCode,
  getSmsCode,
  recordRecruit,
  startRecruit
}
