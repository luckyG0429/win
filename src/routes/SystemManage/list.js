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
import AuthorRoleForm from '../../components/System/AuthorRoleForm';
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
    btnloading:false,

    eventformValues:{
      currentPage:1,
      pageSize: 10,
    },

    roleLoading:false,
    roleList:[],
    roleRecord:{},
    roleformValues:{
      currentPage:1,
      pageSize: 10,
    },

  };

  /**请求参数列表**/
  componentDidMount() {

    this.setState({
      eventloading:true
    })
    const {eventformValues} = this.state;
    this.fetch('eventtypefetch','eventType','eventloading',eventformValues)
  }


  fetch(url,a,b,params){
    const { dispatch } = this.props;
    dispatch({
      type:`systemlist/${url}`,
      payload:params,
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
    const { eventformValues } = this.state;
    if(key === '1'){
      this.setState({
        eventLoading:true
      })
      this.fetch('eventtypefetch','eventType','eventloading',eventformValues)
    }else if(key === '2' ){
      this.setState({
        quizLoading:true
      })
      this.fetch('quizfetch','quizRules','quizLoading')
    }
   // this.fetch('')
  }

  handleOk = (params)=>{

    const { modaltype,eventformValues} = this.state;
    const { dispatch } = this.props;
    this.setState({
      btnloading:true,});
    /** type 1为赛事类型  2为竞猜规则**/
    if(modaltype === 1){
      dispatch({
        type:'systemlist/addEventtype',
        payload: params,
        callback:(result)=>{
            this.setState({
              btnloading:false,
              modalVisible:false,
            },()=>{
              this.handleResult(result);
            });
          }
        })
    }
  }

  handleResult = (result)=>{
    if(result.resultCode === 0){
      Modal.success({
        title: '结果反馈',
        content: '操作成功',
        onOk:()=>{this.sendList()}
      });
    }else{
      Modal.error({
        title: '结果反馈',
        content: result.resultmsg,
      })
    }
  }

  sendList(){
    const { eventformValues } = this.state;
    this.fetch('eventtypefetch','eventType','eventloading',eventformValues)
  }


  asyStatefn=()=>{
    console.log(arguments);
    this.setState({
      ...arguments[0]
    })
  }

  renderModal=(type,obj)=>{
    switch(type){
      case 1: return <EventTypeForm {...obj}/>;
      case 2: return <QuizRuleForm {...obj}/>;
      case 3: return <AuthorRoleForm {...obj}/>;
    }
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
      eventformValues: {
        ...params,
      },
    });
    dispatch({
      type: 'eventlist/fetch',
      payload: params
    });
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { systemlist: { eventdata, eventloading } ,  dispatch } = this.props;
    const { modalVisible,modaltype, eventLoading, eventType, quizLoading, quizRules, roleRecord, roleLoading,btnloading } = this.state;


    const eventColumns = [{
      title: '类型',
      dataIndex: 'type',
    },{
      title: '名称',
      dataIndex: 'name',
    },{
      title: '图标',
      dataIndex: 'icon',
      render:(text,record)=>{
        let href= `http://www.nannan.kim/guessing/${text}`;
        // console.log(href);
        return <a href={href}>图片连接
        </a>
      }
    },{
      title: '状态',
      dataIndex: 'available',
      render:text=><span>{text?'启用中':'未启用'}</span>
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
      title: '类型',
      dataIndex: 'type',
    },{
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


    const authorizeColumns = [{
      title: '类型',
      dataIndex: 'type',
    },{
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
          <a onClick={() => this.handleConfirm(record,'delete')}>权限设置</a>
          <Divider type='vertical'/>
          <a onClick={() => this.handleModalVisible(true,record,1)}>修改</a>
          <Divider type='vertical'/>
          <a onClick={() => this.handleModalVisible(true,record,1)}>删除</a>
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
                <StandardTable data={eventdata}
                               columns={eventColumns}
                               loading={eventloading}
                               rowKey ={ (record)=>record.id}
                               onChange={this.handleStandardTableChange}
                               size='small'
                               bordered/>
              </TabPane>
              <TabPane tab="职位配置" key="2" className={styles.tableTab}>
                <Button type='primary' ghost icon="plus" onClick={()=>this.handleModalVisible(true,2)}>创建职位</Button>
                <p className={styles.tips}><Icon type="smile-o" /> 您好，以下是当前已配置好的竞猜规则列表</p>
                <Table dataSource={[{type:1}]}
                       columns={authorizeColumns}
                       loading={roleLoading}
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

            { modalVisible && this.renderModal(modaltype,{
              handleOk: (params)=>this.handleOk(params),
              handlCancel:()=>this.handleModalVisible(),
              record:roleRecord,
              btnloading
            })}
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}


