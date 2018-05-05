/**
 * 管理端用户列表：
 * 主要的功能：分类查找，全部列表，用户授权
 * **/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input,Select,Button,Modal,Divider,Card} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UserRolelist from '../../components/System/userTable';

import styles from './system.less';
import {handleResult, timestampToDatetime} from "../../utils/utils";

const FormItem = Form.Item;

@connect(state => ({
  systemuser: state.systemuser,
}))

@Form.create()

export default class SysUserList extends PureComponent{
  state = {
    formValues:{
      pageSize:10,
      currentPage:1,
      type:''
    },

    modalVisible:false,
    _record:{},
    modaltype:0,

    btnloading:false,

  }

  componentDidMount(){
    //请求目前已有的全部战队列表
    this.setFetch();
  }

  handleModalVisible=(flag=false,record={},type=0)=>{
    this.setState({
      modalVisible:flag,
      _record:record,
      modaltype: type
    })
  }

  handleStandardTableChange=(pagination,)=>{
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.setState({
      formValues: {
        ...params,
      },
    });
    this.setFetch(params);
  }

  handlFormOk = (type,params)=>{
    const {dispatch} = this.props;
    this.setState({
      btnloading:true,
    });
    if(type === 0){
      dispatch({
        type:'systemuser/addResourceParams',
        payload:params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            this.handleResult(result);
          });

        }
      })
    }else{
      if(type===2){
       dispatch({
        type:'systemuser/addUserRole',
        payload:params,
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
  }


  handleResult = (result)=>{
    if(result.resultCode === 0){
      Modal.success({
        title: '结果反馈',
        content: '操作成功',
        onOk:()=>{this.setFetch()}
      });
    }else{
      Modal.error({
        title: '结果反馈',
        content: result.resultmsg,
      })
    }
  }


  setFetch = (params) => {
    const {dispatch} = this.props;
    const { formValues } = this.state;
    if(!params){
      params = formValues;
    }
    dispatch({
      type:'systemuser/fetch',
      payload:params
    })
  }

  render(){
    //1.你的全局状态的引入
    const {systemuser:{data, loading},dispatch} = this.props;
    const { getFieldDecorator } = this.props.form;

    //2.组件的状态变量的引入
    const {modalVisible, _record,modaltype, btnloading} = this.state;
    const modaltitle =modaltype ===0?'新增用户':(modaltype ===1?'已授权职位-查看':'未授权职位列表');

    const columns=[{
      title:'账户',
      dataIndex:'username',
      width:180
    },{
      title:'昵称',
      dataIndex:'nickname',
    },{
      title:'联系方式',
      dataIndex: 'phoneNumber',
    },{
      title: '登录时间',
      dataIndex: 'loginTime',
      render:(val)=><span>{timestampToDatetime(val)}</span>
    },{
      title: '操作',
      dataIndex: '',
      width:220,
      render:(text,record)=>{
        return <span>
          <Button  style={{background:'#99CC00',borderColor:'#99CC00',color:'#fff'}} type="primary" size='small' onClick={()=>this.handleModalVisible(true, record.username, 1)}>查看已有职位</Button>
          <Divider type='vertical'/>
          <Button  type="danger"  style={{color:'#fff',borderColor:'#FF6666',background:'#FF6666'}}  size='small' onClick={()=>this.handleModalVisible(true, record.username, 2)}>未授权职位</Button>
        </span>
      }
    }];

    //3.渲染
    return (<PageHeaderLayout title="用户职位配置">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                <FormItem  style={{float:'left',display:'inline'}}>
                  <Button type='primary'  ghost onClick={() => this.handleModalVisible(true,'',0)}>新增用户</Button>
                </FormItem>
                <FormItem  style={{float:'right',display:'inline'}}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('name')(<Input placeholder='请输入账户名/昵称'/>)
                  }
                </FormItem>
              </Form>
            </div>
            <StandardTable
              columns = { columns }
              loading={loading}
              data={ data }
              rowKey ={ (record)=>record.identityId}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal visible={modalVisible}
               title={modaltitle}
               width={modaltype ==0?'480px':'640px'}
               onCancel={() => this.handleModalVisible()}
               footer={modaltype===1?[<Button type='primary' onClick={() => this.handleModalVisible()}>返回</Button>]:[]} >
          {
            modalVisible&&modaltype ===0?<p>暂无</p>:<UserRolelist modalType={modaltype}
                                                                 record={_record}
                                                                 dispatch={dispatch}
                                                                 btnloading={btnloading}
                                                                 handleCancel={()=>this.handleModalVisible()}
                                                                 handleOk={(type,params)=>this.handlFormOk(type,params)}/>
          }
        </Modal>
      </PageHeaderLayout>
    )


  }


}
