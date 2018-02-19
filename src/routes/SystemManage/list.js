/**
 * 系统参数配置
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Icon, Select, Button, DatePicker, Modal, Divider, Tabs, Table } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EventTypeForm from '../../components/System/EventTypeForm';
import QuizRuleForm from '../../components/System/QuizRuleForm';
import styles from './Servicelist.less';

const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  systemlist : state.systemlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible:false,
    modaltype:'',

    eventloading:false,
    eventType:[],

    quizloading:false,
    quizRules:[],

  };

  /**请求参数列表**/
  componentDidMount() {

    this.setState({
      eventloading:true
    })
    this.fetch('eventtypefetch','eventType','eventloading')
  }


  fetch(url){
    const { dispatch } = this.props;
    console.log(arguments);
    dispatch({
      type:`systemlist/${url}`,
      callback:(result)=>{
        if(result.resultCode === 0){
          this.setState({
            [arguments[1]]:result.data,
          })
        }
        this.setState({
          [arguments[2]]:false
        })

      }
    })
  }


  handleConfirm=(record, type)=>{
    const obj = ((type)=>type==='stop'?{
      title:'您确定要提前结束当前的比赛竞猜吗？',
      content:'提示：一旦结束，将无法在重新开始！',
    }:{
      title:'您确定要删除当前的竞猜吗？',
      content:'提示：一旦删除，将无法恢复数据！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
    })(type);

    console.log(obj);
    return Modal.confirm({
      ...obj,
      width:'480px',
      onOk(){

      },
      onCancel(){

      }
    })
  }

  /*TODO: 弹框的显示与隐藏  - 传递操作*/
  handleModalVisible(flag = false, type){
    /** type 1为赛事类型  2为竞猜规则**/
    this.setState({
      modalVisible: flag,
      modaltype:type,
    });
  }


  onSwitch=(key)=>{
    console.log(typeof key);
    if(key === '1'){
      this.setState({
        eventloading:true
      })
      this.fetch('eventtypefetch','eventType','eventloading')
    }else if(key === '2' ){
      this.setState({
        quizloading:true
      })
      this.fetch('quizfetch','quizRules','quizloading')
    }
   // this.fetch('')
  }

  handleOk = (params)=>{

    const { modaltype } = this.state;
    const { dispatch } = this.props;
    /** type 1为赛事类型  2为竞猜规则**/
    if(modaltype === 1){
      dispatch({
        type:'systemlist/addEventtype',
        payload: params,
        callback:(result)=>{
          if(result.resultCode === 0){
            this.setState({
              eventloading:true
            })
            this.fetch('eventtypefetch')
          }
        }
      })
    }

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { systemlist: { data, loading } ,  dispatch } = this.props;
    const { modalVisible,modaltype, eventloading, eventType, quizloading, quizRules } = this.state;


    const eventColumns = [{
      title: '类别',
      dataIndex: 'type',
    },{
      title: '名称',
      dataIndex: 'name',
    },{
      title: '图标',
      dataIndex: 'icon',
      render:(text,record)=>{
        return <div>
          阿斯顿接口设计的
        </div>
      }
    },{
      title: '状态',
      dataIndex: 'available',

    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record){
          case 0: return <div>
            <a onClick={() => this.handleConfirm(record,'delete')}>删除</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleModalVisible(true,record,1)}>修改</a>
          </div>;
          case 1:return <a onClick={() => this.handleConfirm(record,'stop')}>结束</a>;
          default: return '-'
        }
      }
    }];


    const quizColumns = [{
      title: '名称',
      dataIndex: 'name',
    },{
      title: '描述',
      dataIndex: 'desc',
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
            <a onClick={() => this.handleConfirm(record,'delete')}>停用</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleModalVisible(true,record,1)}>修改</a>
          </div>;
      }
    }];

    return (
      <PageHeaderLayout title="系统参数列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Tabs tabPosition='left' onChange={this.onSwitch}>
              <TabPane tab="赛事类型" key="1" className={styles.tableTab}>
                <Button type='primary' ghost icon="plus" onClick={()=>this.handleModalVisible(true,1)}>添加赛事类型</Button>
                <p className={styles.tips}><Icon type="smile-o" /> 您好，以下是当前已配置好的赛事类型列表</p>
                <Table dataSource={eventType}
                       columns={eventColumns}
                       loading={eventloading}
                       size='small'
                       bordered/>
              </TabPane>
              <TabPane tab="竞猜规则" key="2" className={styles.tableTab}>
                <Button type='primary' ghost icon="plus" onClick={()=>this.handleModalVisible(true,2)}>添加竞猜规则</Button>
                <p className={styles.tips}><Icon type="smile-o" /> 您好，以下是当前已配置好的竞猜规则列表</p>
                <Table dataSource={quizRules}
                       columns={quizColumns}
                       loading={quizloading}
                       size='small'
                       rowKey={record=>record.id}
                       bordered/>
              </TabPane>
            </Tabs>
          </div>
          <Modal title={modaltype===1?'添加赛事类型':'添加竞猜规则'}
                 visible={modalVisible}
                 footer={[]}
                 onCancel={()=>this.handleModalVisible()}>
            {
              modaltype===1?<EventTypeForm handleOk={this.handleOk} handlCancel={()=>this.handleModalVisible()}/>:<QuizRuleForm/>
            }
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}


