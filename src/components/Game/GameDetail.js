

import React, { PureComponent } from 'react';
import {Tabs, Table} from 'antd';

const TabPane = Tabs.TabPane;


class GameDetail extends PureComponent {

  state = {

  }

  render(){
    return <div>
      <Tabs>
        <TabPane tab="比赛详情" key="1">比赛详情</TabPane>
        <TabPane tab="比赛竞猜列表" key="2"></TabPane>
      </Tabs>
    </div>
  }
}





