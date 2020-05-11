import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import FixButton from '../../../components/fixButton/index';

const pageData = {
  pageNum: 1,
  pageSize: 999,
  recordCount: 0
};

@inject('recruitManageStore')
@observer
class RecruitManage extends React.Component {
  componentDidMount() {
    this.props.recruitManageStore.fetchRecruitList(pageData);
  }

  handleInvite = () => {
    this.props.history.push('/recruitManage/aiInvite');
  }

  render() {
    return <div className="pages-home-recruitManage">
      recruitManage
      <FixButton text="发起邀请" onClick={this.handleInvite} />
    </div>
  }
}

export default withRouter(RecruitManage);
