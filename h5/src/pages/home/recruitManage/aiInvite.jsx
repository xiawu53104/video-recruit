import React from 'react';
import { observer, inject } from 'mobx-react';
import { List, InputItem, Button, Picker, DatePicker, TextareaItem, Toast  } from 'antd-mobile';
import { createForm } from 'rc-form';

import { formatDate } from '../../../util/util';

const pageData = {
  pageNum: 1,
  pageSize: 999,
  recordCount: 0
}

@inject('recruitManageStore')
@observer
class AiInvite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labelNumber: 7,
    }
  }

  componentDidMount() {
    this.props.recruitManageStore.fetchExamList(pageData);
  }

  handleSubmit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      if (error) {
        const keys = ['corpName', 'examPaperId', 'beginTime', 'endTime', 'interviewerName', 'interviewerMobile', 'positionName'];
        for(const key of keys) {
          if (error[key]) {
            const msg = error[key].errors[0].message;
            Toast.info(msg);
            return;
          }
        }
      }
      const data = JSON.parse(JSON.stringify(value));
      data.examPaperId = data.examPaperId[0];
      data.beginTime = formatDate(new Date(data.beginTime), 'yyyy-MM-dd hh:mm:ss');
      data.endTime = formatDate(new Date(data.endTime), 'yyyy-MM-dd hh:mm:ss');
      if (data.beginTime > data.endTime) {
        Toast.info('面试开始时间不能大于结束时间');
        return;
      }
      if (!/^\d{11}$/.test(data.interviewerMobile)) {
        Toast.info('手机号格式不正确');
        return;
      }
      this.props.recruitManageStore.fetchAiCode(data);
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { examList } = this.props.recruitManageStore;
    const { labelNumber } = this.state;

    return <div className="pages-home-recruitManage-aiInvite">
      <div className="title">ai面试邀请</div>
      <List>
        <InputItem
        labelNumber={labelNumber}
          placeholder="请输入"
          clear
          {...getFieldProps('corpName', {
            rules: [{required: true, message: '公司名不能为空'}],
          })}
        >公司名</InputItem>
        <Picker data={examList} cols={1} {...getFieldProps('examPaperId', {
          rules: [{required: true, message: '题库不能为空'}],
        })}>
          <List.Item arrow="horizontal">题库名</List.Item>
        </Picker>
        <DatePicker
          {...getFieldProps('beginTime', {
            rules: [{required: true, message: '开始时间不能为空'}],
          })}
        >
          <List.Item arrow="horizontal">开始时间</List.Item>
        </DatePicker>
        <DatePicker
          {...getFieldProps('endTime', {
            rules: [{required: true, message: '结束时间不能为空'}],
          })}
        >
          <List.Item arrow="horizontal">结束时间</List.Item>
        </DatePicker>
        <InputItem
          placeholder="请输入"
          labelNumber={labelNumber}
          clear
          {...getFieldProps('interviewerName', {
            rules: [{required: true, message: '面试者姓名不能为空'}],
          })}
        >面试者姓名</InputItem>
        <InputItem
          labelNumber={labelNumber}
          placeholder="请输入"
          clear
          {...getFieldProps('interviewerMobile', {
            rules: [{required: true, message: '面试者手机不能为空'}],
          })}
        >面试者手机</InputItem>
        <InputItem
          labelNumber={labelNumber}
          placeholder="请输入"
          clear
          {...getFieldProps('positionName', {
            rules: [{required: true, message: '岗位名不能为空'}],
          })}
        >岗位名</InputItem>
        <TextareaItem
          {...getFieldProps('positionDescription')}
          placeholder="请输入"
          title="岗位描述"
          autoHeight
          rows={3}
          labelNumber={labelNumber}
        />
      </List>
      <Button type="primary" onClick={this.handleSubmit} style={{marginTop: '15px'}}>发起邀请</Button>
    </div>;
  }
}

export default createForm()(AiInvite);
