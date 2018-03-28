/**
 * 比赛详情和竞猜详情，
 * props：比赛id
 *
 * 竞猜列表形式的
 *
 * **/

import React, { PureComponent } from 'react';
import {Tabs, Table,Form, Input, Button } from 'antd';
import QuziTable from './GameDetailA';

const TabPane = Tabs.TabPane;
const FormItem= Form.Item;

@Form.create()
export default class GameDetail extends PureComponent {

  state = {
    canEdit:true
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props;
    const { canEdit } =this.state;
    return <div>
      <Tabs>
        <TabPane tab="比赛详情" key="1">比赛详情</TabPane>
        <TabPane tab="比赛竞猜列表" key="2">
          <QuziTable data={[{name:'1',status:0},{name:'1',status:1}]}/>
        </TabPane>
      </Tabs>
      <div>
        <p>当前的比赛状态：{ data.statusStr }</p>
        <Form layout='inline'>
          <FormItem label='A队比分'>
            {
              getFieldDecorator('scoreA',{

              })(<Input disabled={canEdit}/>)
            }
          </FormItem>
          <FormItem label='B队比分'>
            {
              getFieldDecorator('scoreB',{

              })(<Input disabled={canEdit}/>)
            }
          </FormItem>
          <FormItem>
            <Button type='primary' onClick={()=>alert('比分查看')}>编辑比分</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  }
}





