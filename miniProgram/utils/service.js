const BASE_URL = 'http://zhaopin.iwatchcloud.com';

const Ajax = function(config) {
  return new Promise((resolve, reject) => {
    wx.request({
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: wx.getStorageSync('token') || '',
      },
      url: BASE_URL + config.url,
      data: config.data,
      method: config.method || 'post',
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        reject(err);
      }
    })
  })
}

module.exports = {
  Ajax,
  BASE_URL
};
