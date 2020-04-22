import React from 'react';
import { observer, inject } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Modal, Toast } from 'antd-mobile';
import ExamItem from './examItem';

const pageEeqData = {
  pageNum: 1,
  pageSize: 999,
  recordCount: 0
};

@inject('questionBankStore')
@observer
class QuestionBank extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.questionBankStore.fetchExamList(pageEeqData);
  }

  handleAdd = (e) => {
    e.preventDefault();
    Modal.prompt('新增试卷', '', 
      [
        {
          text: '取消',
        },
        {
          text: '确定',
          onPress: value => new Promise(async (resolve, reject) => {
            if (!value.trim()) {
              Toast.info('试卷名称不能为空');
              reject();
            }
            const res = await this.props.questionBankStore.addExamPaper(value);
            if (!res.msg) {
              Toast.info('新增成功');
              this.props.questionBankStore.fetchExamList(pageEeqData);
              resolve();
            } else {
              Toast.info(res.msg);
              reject();
            }
          }),
        },
      ], 'default', null, ['请输入试卷名']
    )
  }

  handleDeleteExam = async (id) => {
    try {
      const store = this.props.questionBankStore;
      await store.deleteExamPaper(id);
      store.fetchExamList(pageEeqData);
      Toast.info('删除成功');
    } catch(e) {

    }
  }

  render() {
    const { examList } = this.props.questionBankStore;

    return (
      <div className="pages-home-questionBank clear-mgn">
        <div className="add-btn-wrap" onClick={this.handleAdd}>
          <i className="iconfont icon-jia"></i>
          <div className="btn-text">
            <span>新增试卷</span>
          </div>
        </div>
  
        {!examList.length && <div className="empty-text">暂无数据...</div>}
        
        {!!examList.length && (
          <div className="exam-list-wrap">
            {examList.map(item => (<ExamItem
              key={item.id}
              name={item.name}
              id={item.id}
              onDelete={this.handleDeleteExam}
            />))}
          </div>
        )}
      </div>
    )
  }
}

export default QuestionBank;
