import React from 'react';
import { observer, inject } from 'mobx-react';
import { NavBar, Icon, Button, Toast, TextareaItem, Picker, List } from 'antd-mobile';

const durationOpts = [
  { label: '1分钟', value: 1*60 },
  { label: '2分钟', value: 2*60 },
  { label: '3分钟', value: 3*60 },
  { label: '4分钟', value: 4*60 },
  { label: '5分钟', value: 5*60 },
];

@inject('questionBankStore')
@observer
class AddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      duration: [],
      btnText: ''
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    const { mode, id } = this.props.match.params;
    const map = {
      'create': '添加',
      'modify': '修改'
    };
    
    this.setState({
      btnText: map[mode]
    });

    const res = await this.props.questionBankStore.fetchQuestionDetail(id);
    this.setState({
      content: res.data.name,
      duration: [res.data.duration]
    });
  }

  handleSubmit = async () => {
    const { content, duration } = this.state;
    if (!content) {
      Toast.info('题目内容不能为空！');
      return;
    }

    if (!duration.length) {
      Toast.info('请选择答题时长！');
      return;
    }

    const { id, mode } = this.props.match.params;
    const postData = {
      name: content,
      duration: duration[0]
    };

    let res;

    switch (mode) {
      case 'create':
        postData.examPaperId = id;
        res = await this.props.questionBankStore.doAddQuestion(postData);
        break;
      case 'modify':
        postData.examPaperDetailId = id;
        res = await this.props.questionBankStore.modifyQuestion(postData);
    }

    if (res.msg) {
      Toast.info(res.msg);
      return;
    }
    Toast.info(`${mode === 'create' ? '添加' : '修改'}成功`);
    this.props.history.goBack();
  }

  render() {
    return <div className="pages-home-addQuestion">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >{this.state.btnText}题目</NavBar>

      <div className="form-wrap">
        <div className="label">题目内容</div>
        <TextareaItem
          placeholder="请输入题目内容"
          autoHeight
          rows={5}
          count={300}
          value={this.state.content}
          onChange={v => this.setState({ content: v })}
        />

        <div className="picker-wrap">
          <Picker
            data={durationOpts}
            cols={1}
            value={this.state.duration}
            onChange={v => this.setState({ duration: v })}
          >
            <List.Item arrow="horizontal">答题时长</List.Item>
          </Picker>
        </div>

        <div className="btn-wrap">
          <Button type="primary" onClick={this.handleSubmit}>{this.state.btnText}</Button>
        </div>
      </div>
    </div>;
  }
}

export default AddQuestion;
