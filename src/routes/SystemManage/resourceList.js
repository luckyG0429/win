/**战队列表：
 * 主要的功能：分类查找，全部列表，添加战队，战队查看
 * **/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input,Select,Button,Modal,message,Card} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ResourceForm from '../../components/System/ResourceForm';

import styles from './system.less';

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

  componentWillMount(){
    //请求一个赛事分类类型的枚举数据
    const {dispatch} = this.props;
    dispatch({
      type:'systemresource/typefetch'
    })
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
    dispatch({
      type:'systemresource/addResourceParams',
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
    const modaltitle =modaltype ===0?'添加战队':(modaltype ===1?'修改战队':'战队查看');

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
                    getFieldDecorator('name')(<Input placeholder='请输入战队名称'/>)
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
