/** 资讯列表 -
 * **/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input,Select,Button,Modal,message,Card} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddTeam from '../../components/Team/AddTeam';

import styles from './info.less';

const FormItem = Form.Item;

@connect(state => ({
  infolist: state.infolist,
}))

@Form.create()

export default class InfoList extends PureComponent{
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
      type:'infolist/typefetch'
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
      type:'infolist/addTeam',
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
      type:'infolist/fetch',
      payload:params
    })
  }

  render(){
    //1.你的全局状态的引入
    const {infolist:{data, loading, eventType}} = this.props;
    const { getFieldDecorator } = this.props.form;

    //2.组件的状态变量的引入
    const {modalVisible, _record,modaltype, btnloading} = this.state;
    const modaltitle =modaltype ===0?'添加战队':(modaltype ===1?'修改战队':'战队查看');

    const columns=[{
      title:'赛事名',
      dataIndex:'name'
    },{
      title:'发文时间',
      dataIndex:'time'
    },{
      title:'图文缩图',
      dataIndex:'type',
      render:(text)=><span>{
        eventType.filter(item=>item.type===text).length!=0? eventType.filter(item=>{
          return item.type===text
        })[0].name:text
      }</span>
    },{
      title:'操作',
      dataIndex:'',
      render:(text)=>(<div>
        <Button  style={{color:'#FF9900',borderColor:'#FF9900'}}  size='small'  onClick={() => this.handleModalVisible(true,record,2)}>查看</Button>
        <Divider type='vertical'/>
        <Button  type="danger"  style={{color:'#fff',borderColor:'#FF6666',background:'#FF6666'}}  size='small' onClick={() => this.handleConfirm(record,'delete')}>删除</Button>
       </div>)
    }];

    //3.渲染
    return (<PageHeaderLayout title="资讯列表">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                <FormItem  style={{float:'left',display:'inline'}}>
                  <Button type='primary'  ghost onClick={() => this.handleModalVisible(true,'',0)}>新增资讯</Button>
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
            modalVisible&&<AddTeam modalType={modaltype}
                                   data={_record}
                                   menu={eventType}
                                   btnloading={btnloading}
                                   handleCancel={()=>this.handleModalVisible()}
                                   handleOk={(type,params)=>this.handlFormOk(type,params)}/>
          }
        </Modal>
      </PageHeaderLayout>
    )


  }


}
