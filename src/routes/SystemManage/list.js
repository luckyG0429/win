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
import RoleTab from '../../components/System/RoleTab';
import AuthorRoleForm from '../../components/System/AuthorRoleForm';
import styles from './Servicelist.less';
import {handleResult} from '../../utils/utils'

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

    roleRecord:{},

  };

  /**请求参数列表**/
  componentDidMount() {

  }

  /*TODO: 弹框的显示与隐藏  - 传递操作*/
  handleModalVisible(flag = false, type, record={}){
    /** type 1为赛事类型  2为职位**/
    this.setState({
      modalVisible: flag,
      modaltype:type,
      roleRecord:record
    })
  }

  onSwitch=(key)=>{
    const { eventformValues } = this.state;
    if(key === '1'){
      this.setState({
        eventLoading:true
      })
    }else if(key === '2' ){
      this.setState({
        quizLoading:true
      })
    }
  }

  //提交函数
  handleOk = (params)=>{
    const { modaltype,eventformValues} = this.state;
    const { dispatch } = this.props;
    this.setState({btnloading:true});
    /** type 1为赛事类型  2为职位**/
    if(modaltype === 1){
      dispatch({
        type:'systemlist/addEventtype',
        payload: params,
        callback:(result)=>{
            this.setState({
              btnloading:false,
              modalVisible:false,
            },()=>{
              handleResult(result,'添加成功');
            });
          }
        })
    }
  }

  //弹框类型：1是赛事分类，2是职位添加
  renderModal=(type,obj)=>{
    switch(type){
      case 1: return <EventTypeForm {...obj}/>;
      case 2: return <AuthorRoleForm {...obj}/>;
    }
  }

  handleConfirm=(record, type)=>{
    const {dispatch} = this.props;
    const obj = ((type)=>type==='release'?{
      title:'您确定要发布当前的赛事吗？',
      content:'提示：赛事一旦发布，其下的所有比赛信息也会被同时发布上线。！',
    }:{
      title:'您确定要删除当前职位吗？',
      content:'提示：请谨慎操作！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
    })(type);

    return Modal.confirm({
      ...obj,
      width:'480px',
      onOk(){
        dispatch({
          type:'systemlist/delRole',
          payload: record.id,
          callback:(result)=>handleResult(result)
        })
      },
      onCancel(){

      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { systemlist: { eventdata, eventloading, roledata, roleloading } ,  dispatch } = this.props;
    const { modaltype, modalVisible, btnloading, roleRecord} = this.state;


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
          default: return '-'
        }
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
          <a disabled="true" onClick={() => this.handleConfirm(record,'delete')}>权限设置</a>
          <Divider type='vertical'/>
          <a onClick={() => this.handleModalVisible(true,2,record)}>修改</a>
          <Divider type='vertical'/>
          <a onClick={() => this.handleConfirm(record,'delete')}>删除</a>
        </div>;
      }
    }];

    return (
      <PageHeaderLayout title="系统参数列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Tabs tabPosition='left' onChange={this.onSwitch}>
              <TabPane tab="赛事类型" key="1" className={styles.tableTab}>
                <RoleTab  styles={styles}
                          typeUrl={'eventtypefetch'}
                          key={1}
                          btnText={'添加赛事类型'}
                          dispatch={dispatch}
                          handleVisible={()=>this.handleModalVisible(true,1)}
                          data={eventdata}
                          loading={eventloading}
                          columns={eventColumns}/>
              </TabPane>
              <TabPane tab="职位配置" key="2" className={styles.tableTab}>
                <RoleTab  styles={styles}
                          typeUrl={'rolefetch'}
                          btnText={'添加职位'}
                          key={2}
                          dispatch={dispatch}
                          handleVisible={()=>this.handleModalVisible(true,2)}
                          data={roledata}
                          loading={roleloading}
                          columns={authorizeColumns}/>
              </TabPane>
            </Tabs>
          </div>
          <Modal title={modaltype===1?'添加赛事类型':'添加职位'}
                 visible={modalVisible}
                 footer={[]}
                 onCancel={()=>this.handleModalVisible()}>

            { modalVisible && this.renderModal(modaltype,{
              handleOk: (params)=>this.handleOk(params),
              handlCancel:()=>this.handleModalVisible(),
              data:roleRecord,
              btnloading
            })}
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}


