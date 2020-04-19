import React, { Component } from 'react';
import { Toast, Button } from 'antd-mobile';
import * as service from './apis';
import { getId } from '../../util/util';

const eq = getId();

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneVal: '',
      imgCodeData: {},
      selectedCodes: [],
      smsCodeVal: ''
    };
  }

  async componentDidMount() {
    let res = await service.getImgCode(eq);
    this.setState({
      imgCodeData: res.data
    })
  }

  handlePhoneChange = (e) => {
    this.setState({
      phoneVal: e.target.value
    });
  }

  phoneInputBlur = (e) => {
    const reg = /^\d{11}$/;
    if (!reg.test(this.state.phoneVal)) {
      Toast.info('手机号格式不正确！');
    }
  }

  onCodeItemClick = (code, e) => {
    e.preventDefault();
    const { selectedCodes } = this.state;
    if (selectedCodes.includes(code)) {
      const filterCodes = selectedCodes.filter(item => item !== code);
      this.setState({
        selectedCodes: filterCodes
      });
      return;
    }
    this.setState(preState => ({
      selectedCodes: [...preState.selectedCodes, code]
    }))
  }

  fetchSmsCode = async (e) => {
    e.preventDefault();
    const { phoneVal, selectedCodes } = this.state;
    const data = {
      mobile: phoneVal,
      code: selectedCodes.join(''),
      eq: eq
    }
    const res = await service.getSmsCode(data);
    if (res.msg) {
      Toast.info(res.msg);
    }
  }

  handleLogin = async () => {
    const { phoneVal, smsCodeVal } = this.state;
    const data = {
      mobile: phoneVal,
      smsCode: smsCodeVal
    }
    const res = await service.doLogin(data);
    if (res.msg) {
      Toast.info(res.msg);
      return;
    }
    if (res.data) {
      const { token } = res.data;
      token && window.sessionStorage.setItem('token', token);
      this.props.history.push('/home');
    }
  }

  render() {
    const { code } = this.state.imgCodeData
    const codeItems = code && code.split('') || [];

    return (
      <div className="pages-login-index">
        <div className="content-wrap content-center">
          <div className="title">视频面试登录</div>
          <div className="sub-title">通过手机号直接登录，无需注册！</div>
          <div className="form-item">
            <span className="label">手机号</span>
            <input
              className="phone-input"
              type="text"
              placeholder="请输入手机号"
              value={this.state.phoneVal}
              onChange={this.handlePhoneChange}
              onBlur={this.phoneInputBlur}
            />
          </div>
          <div className="img-code-wrap">
            <p className="label">图片验证码</p>
            <div
              className="img-wrap"
              style={{
                backgroundImage: `url(${this.state.imgCodeData.img})`,
              }}
            >
              {codeItems.map((code, i) => {
                return (
                  <div className="code-item" key={i} data-code={code} onClick={this.onCodeItemClick.bind(this, code)}>
                    {this.state.selectedCodes.includes(code) && <span className="red-dot content-center"></span>}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="form-item">
            <input
              className="phone-input"
              type="text"
              placeholder="请输入短信验证码"
              value={this.state.smsCodeVal}
              onChange={(e) => this.setState({smsCodeVal: e.target.value})}
            />
            <span className="text-btn" onClick={this.fetchSmsCode}>发送验证码</span>
          </div>
          <div className="btn-wrap">
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}
