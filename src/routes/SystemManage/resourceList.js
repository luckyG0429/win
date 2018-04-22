/**战队列表：
 * 主要的功能：分类查找，全部列表，添加战队，战队查看
 * **/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input,Select,Button,Modal,Divider,Card} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ResourceForm from '../../components/System/ResourceForm';

import styles from './system.less';
import {handleResult} from "../../utils/utils";

const FormItem = Form.Item;

@connect(state => ({
  systemresource: state.systemresource,
}))

@Form.create()

export default class ResourceList extends PureComponent{
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
      console.log(0);
      dispatch({
        type:'systemresource/addResourceParams',
        payload:params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            handleResult(result,params.msg, this.setFetch);
          });

        }
      })
    }else{
      dispatch({
        type:'systemresource/alertResourceParams',
        payload:params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            handleResult(result,params.msg, this.setFetch);
          });
        }
      })
    }
  }

  showMsg =(record)=>{
      const {dispatch} = this.props;
      const obj = {
        title:'您确定要删除当前资源吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
      }

      const params = {
        url: 'systemresource/deleteResourceParams',
        msg: '已删除成功！'
      }

      return Modal.confirm({
        ...obj,
        width:'480px',
        onOk:()=>{
          dispatch({
            type: params.url,
            payload: record.id,
            callback:(result)=>{
              handleResult(result,params.msg, this.setFetch);
            }
          })
        },
        onCancel(){

        }
      })
   }

  setFetch=(params)=>{
    const {dispatch} = this.props;
    const { formValues } = this.state;
    if(!params){
      params = formValues;
    }
    dispatch({
      type:'systemresource/fetch',
      payload:params
    })
  }

  render(){
    //1.你的全局状态的引入
    const {systemresource:{data, loading}} = this.props;
    const { getFieldDecorator } = this.props.form;

    //2.组件的状态变量的引入
    const {modalVisible, _record,modaltype, btnloading} = this.state;
    const modaltitle =modaltype ===0?'添加资源':(modaltype ===1?'修改资源':'资源查看');

    const columns=[{
      title:'资源名称',
      dataIndex:'name'
    },{
      title:'唯一值',
      dataIndex:'type',
    },{
      title:'资源说明',
      dataIndex: 'description'
    },{
      title: '状态',
      dataIndex: 'available',
      render:text=><span>{text?'有效':'无效'}</span>
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        return <span>
          <Button  style={{background:'#99CC00',borderColor:'#99CC00',color:'#fff'}} type="primary" size='small' onClick={()=>this.handleModalVisible(true, record, 1)}>修改</Button>
          <Divider type='vertical'/>
          <Button  type="danger"  style={{color:'#fff',borderColor:'#FF6666',background:'#FF6666'}}  size='small' onClick={()=>this.showMsg(record)}>删除</Button>
        </span>
      }
    }];

    //3.渲染
    return (<PageHeaderLayout title="资源列表">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                <FormItem  style={{float:'left',display:'inline'}}>
                  <Button type='primary'  ghost onClick={() => this.handleModalVisible(true,'',0)}>添加资源</Button>
                </FormItem>
                <FormItem  style={{float:'right',display:'inline'}}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('name')(<Input placeholder='请输入资源名称'/>)
                  }
                </FormItem>
              </Form>
            </div>
            <StandardTable
              columns = { columns }
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
            modalVisible&&<ResourceForm modalType={modaltype}
                                   data={_record}
                                   btnloading={btnloading}
                                   handleCancel={()=>this.handleModalVisible()}
                                   handleOk={(type,params)=>this.handlFormOk(type,params)}/>
          }
        </Modal>
      </PageHeaderLayout>
    )


  }


}
