import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Modal, Toast } from 'antd-mobile';
import ExamItem from './examItem';
import FixButton from '../../../components/fixButton/index';

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

  handleAdd = () => {
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
      Modal.alert('删除', '确定要删除改题目吗？', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '确定',
          onPress: async () => {
            const store = this.props.questionBankStore;
            await store.deleteExamPaper(id);
            store.fetchExamList(pageEeqData);
            Toast.info('删除成功');
          }
        }
      ])
    } catch(e) {

    }
  }

  handleEditExam = (id, name) => {
    const { history } = this.props;
    history.push(`/questionBank/questionDetail/${id}/${name}`);
  }

  render() {
    const { examList } = this.props.questionBankStore;

    return (
      <div className="pages-home-questionBank clear-mgn">
        <FixButton text="新增试卷" onClick={this.handleAdd}></FixButton>
  
        {!examList.length && <div className="empty-text">暂无数据...</div>}
        
        {!!examList.length && (
          <div className="exam-list-wrap">
            {examList.map(item => (<ExamItem
              key={item.id}
              name={item.name}
              id={item.id}
              onDelete={this.handleDeleteExam}
              onEdit={this.handleEditExam}
            />))}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(QuestionBank);
