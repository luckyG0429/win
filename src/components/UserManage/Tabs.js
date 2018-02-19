import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import UserInfo from './userinfo'

const TabPane = Tabs.TabPane;

class ModalTabs extends PureComponent{
  state = {
    activekey: "1",
  }

  componentDidMount(){
    const { userdata, dispatch} = this.props;
    //获取用户的基本信息

  }

  onSwitch=(key)=>{
    this.setState({
      activekey: key
    })
  }

  render(){
    const { userdata } = this.props;
    return  <Tabs>
      <TabPane tab="个人资料" key="1">
        <UserInfo userdata={userdata}/>
      </TabPane>
      <TabPane tab="好友列表" key="2">该用户关注的好友列表</TabPane>
      <TabPane tab="交易记录" key="3">用互相关的充值和提现流水</TabPane>
      <TabPane tab="竞猜记录" key="4">用户参加过的比赛竞猜记录</TabPane>
    </Tabs>
  }
}

export default ModalTabs
