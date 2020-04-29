import React from 'react';
import { observer, inject } from 'mobx-react';
import { NavBar, Icon, Button, Toast, Modal } from 'antd-mobile';

@inject('questionBankStore')
@observer
class QuestionDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.questionBankStore.fetchQuestionList(id);
  }

  handleModifyName = () => {
    const { id } = this.props.match.params;
    const { examName } = this.props.questionBankStore;

    Modal.prompt('修改试卷名称', '', 
      [
        {
          text: '取消',
        },
        {
          text: '保存',
          onPress: value => new Promise(async (resolve, reject) => {
            if (!value.trim()) {
              Toast.info('试卷名称不能为空');
              reject();
            }
            await this.props.questionBankStore.modifyExamPaper(id, value);
            Toast.info('修改成功');
            this.props.questionBankStore.fetchQuestionList(id);
            resolve();
          }),
        },
      ], 'default', examName, ['请输入试卷名']
    )
  }

  handleAddQues = () => {
    const { id } = this.props.match.params;

    this.props.history.push(`/questionBank/addQuestion/create/${id}`);
  }

  handleDeleteQues = async (quesId) => {
    Modal.alert('删除', '确定要删除改题目吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: async () => {
          const store = this.props.questionBankStore;
          await store.doDeleteQuestion(quesId);
          Toast.info('删除成功');

          const { id } = this.props.match.params;
          store.fetchQuestionList(id);
        }
      }
    ])
  }

  handleQuesEdit = async (quesId) => {
    this.props.history.push(`/questionBank/addQuestion/modify/${quesId}`);
  }

  render() {
    const { showQuestionList, questionList, examName } = this.props.questionBankStore;
    const getContent = () => {
      if (!showQuestionList) {
        return <div className="empty-wrap content-center">
          此试卷还未添加题目...
        </div>;
      }
      return <div className="list-wrap">
        {questionList.map((item, i) => {
          return <QuestionItem
                  key={item.id}
                  id={item.id}
                  order={i + 1}
                  content={item.name}
                  onDelete={this.handleDeleteQues}
                  onEdit={this.handleQuesEdit}
                />
        })}
      </div>;
    }

    return <div className="pages-home-questionDetail">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >编辑试卷</NavBar>
      <div className="exam-name" onClick={this.handleModifyName}>
        <div className="label">试卷名称</div>
        <div className="name">{examName}</div>
      </div>
      {getContent()}
      <div className="btm-btn">
        <Button type="primary" onClick={this.handleAddQues}>新增题目</Button>
      </div>
    </div>;
  }
}

const QuestionItem = (props) => {
  const { id, order, content, onDelete, onEdit } = props;

  return <div className="ques-item">
  <div className="ques-order">第{order}题</div>
  <div className="ques-content">{content}</div>
  <div className="btns-box">
    <div style={{marginRight: `15px`}} onClick={() => onDelete(id)}>
      <i className="iconfont icon-shanchu"></i>
      <span>删除</span>
    </div>
    <div onClick={() => onEdit(id)}>
      <i className="iconfont icon-ziyuan"></i>
      <span>编辑</span>
    </div>
  </div>
</div>;
}

export default QuestionDetail;
