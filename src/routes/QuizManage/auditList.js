/**
 * 竞猜审核列表
 * **/
import React, { Component } from 'react';
import {Table, Col, Row, Form, Input, Button, message, Card, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {connect} from "dva";

import styles from './quiz.less'

const FormItem = Form.Item;

@connect(state => ({
  auditlist: state.quizauditlist,
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
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title:'赛事',
      dataIndex:'eventname'
    },{
      title:'比赛名称',
      dataIndex:'gamename'
    },{
      title:'竞猜名称',
      dataIndex:'quizname'
    },{
      title:'竞猜结束时间',
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
          <Button  style={{background:'#99CC00',borderColor:'#99CC00',color:'#fff'}} type="primary" size='small' onClick={()=>this.showMsg(1,record)}>结算</Button>
          <Divider type='vertical'/>
          <Button  type="danger"  style={{color:'#fff',borderColor:'#FF6666',background:'#FF6666'}}  size='small' onClick={()=>this.showMsg(0,record)}>驳回</Button>
        </span>
      }
    }]
    return <PageHeaderLayout title="竞猜结果审核">
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
        <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
          <FormItem  style={{float:'right',display:'inline'}}>
            <Button type="primary" htmlType="submit">搜索</Button>
          </FormItem>
          <FormItem style={{float:'right',display:'inline', marginRight:10}}>
            {
              getFieldDecorator('gameName')(<Input placeholder='请输入比赛名称'/>)
            }
          </FormItem>
          <FormItem style={{float:'right',display:'inline', marginRight:10}}>
            {
              getFieldDecorator('name')(<Input placeholder='请输入赛事名称'/>)
            }
          </FormItem>
        </Form>
      </div>
        <Table dataSource={[{'status':'结算中'},{'status':'竞猜中'}]} columns={columns} pagination={false} bordered size='middle'/>
        </div>
      </Card>
    </PageHeaderLayout>
  }

}
