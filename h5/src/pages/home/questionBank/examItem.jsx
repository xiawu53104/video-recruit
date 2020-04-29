import React from 'react';

class ExamItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.id);
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { id, name } = this.props;
    this.props.onEdit(id, name);
  }

  render() {
    const { name } = this.props;
  
    return (
      <div className="home-examItem">
        <div className="exam-name">{name}</div>
        <div className="btm-wrap">
          <div style={{marginRight: `15px`}} onClick={this.handleDelete}>
            <i className="iconfont icon-shanchu"></i>
            <span>删除</span>
          </div>
          <div onClick={this.handleEdit}>
            <i className="iconfont icon-ziyuan"></i>
            <span>编辑</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamItem;
