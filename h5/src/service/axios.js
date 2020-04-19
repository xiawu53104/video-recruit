import axios from 'axios';

const baseURL = 'http://zhaopin.iwatchcloud.com';

const instance = axios.create({
  baseURL: baseURL
});

instance.interceptors.request.use(function (config) {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error)
});

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});

const service = function service (config) {
  config.method = config.method || 'post' // 修改默认请求方式为 post
  return new Promise((resolve, reject) => {
    instance(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  });
}

export default service;
