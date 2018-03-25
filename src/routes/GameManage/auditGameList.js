/**
 * 上架审核列表
 * **/

import React, { Component } from 'react';
import {connect} from "dva";
import {Table, Col, Row, Form, Input, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './game.less'

const FormItem = Form.Item;

@connect(state => ({
  gameauditlist: state.gameauditlist,
}))
@Form.create()

export default class AuditLisr extends Component {

  state = {
    formValues :{
      pageSize:10,
      pageSequence:1,
    },


  };

  componentDidMount(){
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type:'auditlist/fetch',
      payload:formValues
    })
  }

  showMsg(){

  }

  renderAdvanceForm(){
    const { getFieldDecorator } = this.props.form;
    return <Form layout='inline'  onSubmit={this.handleSubmit}>
      <FormItem>
        {getFieldDecorator('name')(
          <Input placeholder='请输入赛事名称'/>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('gamename')(
          <Input placeholder='请输入比赛名称'/>
        )}
      </FormItem>
      <FormItem>
        <Button htmlType='submit' type='primary'>搜索</Button>
      </FormItem>
    </Form>
  }

  render(){

    const columns = [{
      title:'赛事',
      dataIndex:'eventname'
    },{
      title:'比赛名称',
      dataIndex:'gamename'
    },{
      title:'比赛开始时间',
      dataIndex:'startTime'
    },{
      title:'战队A',
      dataIndex:'quizEndtime'
    },{
      title:'对赛',
      dataIndex:'teams'
    },{
      title:'竞猜状态',
      dataIndex:'status'
    },{
      title:'操作',
      dataIndex:'',
      render:(text,record)=>{
        return <span>
          <a onClick={()=>this.showMsg(0,record)}>驳回</a>
          <a onClick={()=>this.showMsg(1,record)}>结算</a>
        </span>
      }
    }]
    return <PageHeaderLayout title="上架审核列表">
      <Card>
        <p>正在开发调试中....</p>
      </Card>
      {/*<div className={styles.TableForm}>*/}
        {/*{ this.renderAdvanceForm() }*/}
      {/*</div>*/}
      {/*<div>*/}
        {/*<Table dataSource={[{'teams':'巴西'}]} columns={columns} pagination={false} bordered size='middle'/>*/}
      {/*</div>*/}
    </PageHeaderLayout>
  }

}
