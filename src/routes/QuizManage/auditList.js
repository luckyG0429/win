/**
 * 竞猜审核列表
 * **/
import React, { Component } from 'react';
import {Table, Col, Row, Form, Input, Button, Modal, Card, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {connect} from "dva";

import styles from './quiz.less'
import {handleResult} from "../../utils/utils";

const FormItem = Form.Item;

@connect(state => ({
  quizauditlist: state.quizauditlist,
}))
@Form.create()

export default class AuditLisr extends Component {

  state = {
    formValues :{
      pageSize:10,
      currentPage:1,
    },

  };

  componentDidMount(){
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type:'quizauditlist/fetch',
      payload:formValues
    })
  }

  showMsg =(type, record)=>{

    const {dispatch} = this.props;
    const obj = ((type)=>{
      if(type === 1) {
        return {
          title:'结算当前竞猜？',
          okText: '结算',
        }
      }else{
        return {
          title:'您确定要驳回当前竞猜的结果',
          okText: '驳回',
          okType: 'danger',
          cancelText: '取消',
        }
      }
    })(type);

    const params = {
      url: 'quizauditlist/auditQuizResult',
      msg: type===1?'提交成功！系统进行结算中...':'操作成功',
      data: {
        id: record.id,
        pass: type === 1? true : false
      }
    }

    return Modal.confirm({
      ...obj,
      width:'480px',
      onOk:()=>{
        dispatch({
          type: params.url,
          payload: params.data,
          callback:(result)=>{
            if(result.resultCode ==0){
              handleResult(result,params.msg,this.setFetch());
            }
          }
        })
      },
      onCancel(){

      }
    })
  }


  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.setState({
      formValues:{
        ...params
      }
    });
    dispatch({
      type: 'quizauditlist/fetch',
      payload: params
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {quizauditlist: {data, loading }, dispatch} = this.props;
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
          <StandardTable
            columns = { columns }
            loading={loading}
            data={ data }
            onChange={this.handleStandardTableChange}/>
        </div>
      </Card>
    </PageHeaderLayout>
  }

}
