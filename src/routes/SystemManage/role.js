/**战队列表：
 * 主要的功能：分类查找，全部列表，添加战队，战队查看
 * **/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input,Divider,Button,Modal,message,Card} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddRole from '../../components/System/AuthorRoleForm';

import styles from './system.less';
import {handleResult} from "../../utils/utils";

const FormItem = Form.Item;

@connect(state => ({
  systemrole: state.systemrole,
}))

@Form.create()

export default class RoleList extends PureComponent{
  state = {
    formValues:{
      pageSize:10,
      currentPage:1,
      type:''
    },

    modalVisible:false,
    modaltype:0,

    btnloading:false,

  }

  componentDidMount(){
    //请求目前已有的全部职位列表
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
    // dispatch({
    //   type: 'limitlist/fetch',
    //   payload: params,
    // });
  }

  handlFormOk = (type,params)=>{
    const {dispatch} = this.props;
    this.setState({
      btnloading:true,
    })
    /** type 1为赛事类型  2为职位**/
    if(changeType !== 2){
      dispatch({
        type:'systemlist/updataRole',
        payload: params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            handleResult(result,'修改成功');
          });
        }
      })
    }else{
      dispatch({
        type:'systemlist/addRole',
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

  handleConfirm=(record, type)=>{
    const {dispatch} = this.props;
    const {roleShould} = this.state;
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
      onOk:()=>{
        dispatch({
          type:'systemrole/delRole',
          payload: record.id,
          callback:(result)=>{
            this.setState({
              roleShould: !roleShould
            },()=>{
              handleResult(result,'删除成功');
            });
          }
        })
      },
      onCancel(){

      }
    })
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

  setFetch(params){
    const {dispatch} = this.props;
    const { formValues } = this.state;
    if(!params){
      params = formValues;
    }
    dispatch({
      type:'systemrole/fetch',
      payload:params
    })
  }

  render(){
    //1.你的全局状态的引入
    const {systemrole:{ data, loading }, dispatch} = this.props;
    const { getFieldDecorator } = this.props.form;

    //2.组件的状态变量的引入
    const {modalVisible, _record,modaltype, btnloading} = this.state;
    const modaltitle =modaltype ===0?'添加战队':(modaltype ===1?'修改战队':'战队查看');

    const authorizeColumns = [{
      title: '类型',
      dataIndex: 'type',
    },{
      title: '名称',
      dataIndex: 'name',
    },{
      title: '描述',
      dataIndex: 'description',
    },{
      title: '状态',
      dataIndex: 'available',
      render:text=><span>{text?'启用中':'未启用'}</span>
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
          <a disabled="true" onClick={() => this.handleConfirm(record,'delete')}>权限设置</a>
          <Divider type='vertical'/>
          <a onClick={() => this.handleModalVisible(true,21,record)}>修改</a>
          <Divider type='vertical'/>
          <a onClick={() => this.handleConfirm(record,'delete')}>移除</a>
        </div>;
      }
    }];


    //3.渲染
    return (<PageHeaderLayout title="职位列表">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                <FormItem  style={{float:'left',display:'inline'}}>
                  <Button type='primary'  ghost onClick={() => this.handleModalVisible(true,'',0)}>添加职位</Button>
                </FormItem>
                <FormItem  style={{float:'right',display:'inline'}}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('name')(<Input placeholder='请输入职位'/>)
                  }
                </FormItem>
              </Form>
            </div>
            <StandardTable
              columns = { authorizeColumns }
              loading={loading}
              data={ data }
              rowKey ={ (record)=>record.id}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal visible={modalVisible}
               title={modaltitle}
               onCancel={() => this.handleModalVisible()}
               footer={modaltype===2?[<Button type='primary' onClick={() => this.handleModalVisible()}>返回</Button>]:[]} >
          {
            modalVisible&& <AddRole modaltype={modaltype}
                                    handleOk={(params,changeType)=>this.handlFormOk(params,changeType)}
                                    handleCancle={()=>this.handleModalVisible()}
                                    data={_record}
                                    btnloading={btnloading} />
          }
        </Modal>
      </PageHeaderLayout>
    )


  }


}
