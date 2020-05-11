import React , { Component } from 'react';
import { TabBar } from 'antd-mobile';

const QuestionBank = React.lazy(() => import('./questionBank/index'));
const RecruitManage = React.lazy(() => import('./recruitManage/index'));

const tabList = [
  { 
    name: 'videoManage',
    title: '视频管理',
    icon: 'icon-shipin',
    component: <div>videoManage</div>
  },
  { 
    name: 'recruitManage',
    title: '面试管理',
    icon: 'icon-zhiwei',
    component: <RecruitManage />
  },
  { 
    name: 'questionBank',
    title: '试卷设置',
    icon: 'icon-tikuguanli',
    component: <QuestionBank />
  },
  { 
    name: 'userCenter',
    title: '我的',
    icon: 'icon-xiazai4',
    component: <div>userCenter</div>
  },
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'videoManage'
    };
  }

  render(){
    return (
      <div className="pages-home-index">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {tabList.map(tab => {
            return (
              <TabBar.Item
                title={tab.title}
                key={tab.name}
                icon={<div className={`iconfont ${tab.icon}`} style={{ fontSize: '22px' }} />}
                selectedIcon={<div className={`iconfont ${tab.icon}`} style={{ fontSize: '22px', color: '#00A0F1' }} />}
                selected={this.state.selectedTab === tab.name}
                onPress={() => {
                  this.setState({
                    selectedTab: tab.name,
                  });
                }}
              >
                {tab.component}
              </TabBar.Item>
            )
          })}
        </TabBar>
      </div>
    )
  }
}

export default Home;
