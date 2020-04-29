import React from 'react';
import './fixButton.scss';

export default class FixButton extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return <div className="fix-btn-wrap" onClick={this.handleClick}>
      <i className="iconfont icon-jia"></i>
      <div className="btn-text">
        <span>{this.props.text}</span>
      </div>
    </div>;
  }
}
