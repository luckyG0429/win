/**
 * 赛事管理-列表
 * 功能：新增，修改，发布
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs,Table  } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddEvent from '../../components/Game/AddEvent';

import styles from './game.less';

const FormItem = Form.Item;

@connect(state => ({
  eventlist: state.eventlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {

    formValues: {
      pageSize:10,
      currentPage:1,
      name:'',
      type:'',
    }, //搜索参数

    modalVisible:false,//模态框的显示与否
    modaltype:'',//模态框的操作类型
    modalclass:'',//模态框的分类
    btnloading:false,//模态框的发送表单按钮
    _record:{} //临时变量数据
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'eventlist/typefetch',
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'eventlist/fetch',
      payload: formValues
    });
  }


  hangleChangeRouter=(record)=>{
    console.log(record);
    const { dispatch } = this.props;
    dispatch({
      type:'eventlist/changeRouter',
      payload:record
    })
  }

  /* TODO: 表格的分页处理 - 以及内部状态管理：表单数据[ formValues ] */
  handleStandardTableChange = (pagination) => {
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
    dispatch({
      type: 'eventlist/fetch',
      payload: params
    });
  }


  handleConfirm=(record, type)=>{
      const obj = ((type)=>type==='release'?{
        title:'您确定要发布当前赛事吗？',
        content:'提示：赛事一旦发布，不能被删除，只能进行修改操作！',
        }:(type==='delete'?{
        title:'您确定要删除当前赛事吗？',
        content:'提示：赛事一旦删除，其下的所有比赛将也会被删除掉！',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
      }:{
        title:'您确定要删除当前比赛吗？',
        content:'提示：比赛一旦删除，其下的所有竞猜设置将也会被删除掉！',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
      }))(type);

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


  /** 弹框的显示与隐藏    [0新增 1修改] **/
  handleModalVisible = (flag = false,record={}, type) => {
    this.setState({
      modalVisible: flag,
      _record: record,
      modaltype:type,
    });
  }

  /**条件查询 - 条件查询事件  - 内部状态管理：表单数据[ formValues ] **/
  handleSearch = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };

      this.setState(function(prevState,props){
        return {formValues: {
            ...values,
            ...prevState.formValues
          }}
      })

      this.sendList({
        pageSize: 10,
        currentPage: 1,
        type:'',
        ...values,
      })
    })
  }

  handleOk=(type, params)=>{
    //type: 0 新增 ；1 修改
    const {dispatch} = this.props;
    this.setState({
      btnloading: true,
    });
    if (type == 1) {
      //修改

    } else if (type == 0) {
      //新增
      dispatch({
        type: 'eventlist/addgame',
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


  sendList=(params)=>{
    const {dispatch} = this.props;
    if(!params){
      params = this.state.formValues;
    }
    dispatch({
      type:'eventlist/fetch',
      payload:params
    })
  }


  timestampToTime=(timestamp) =>{
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate()<10? ('0'+date.getDate()+ ' '):(date.getDate()+ ' ');
    let h = date.getHours()<10? ('0'+date.getHours()+ ':'): (date.getHours()+ ':');
    let m = date.getMinutes()<10? ('0'+date.getMinutes()+ ':'): (date.getMinutes()+ ':');
    let s = date.getSeconds()<10?('0'+date.getMinutes()): date.getMinutes();
    return Y+M+D+h+m+s;
  }


  render() {
    const { eventlist: { data, loading, eventtype } ,  dispatch, form:{ getFieldDecorator} } = this.props;
    const { modalVisible, modaltype, _record, btnloading }  = this.state;

    const columns = [{
      title: '开赛时间',
      dataIndex: 'startTime',
      render:(text)=><p>{this.timestampToTime(text)}</p>
    },{
      title: '赛事',
      dataIndex: 'name',
    },{
      title: '赛事类别',
      dataIndex: 'strType',
    },{
      title: '结束时间',
      dataIndex: 'endTime',
      render:(text)=><p>{this.timestampToTime(text)}</p>
    },{
       title: '比赛日程',
      dataIndex: '',
      render:(text,record)=><a onClick={()=>this.hangleChangeRouter(record)}>日程列表</a>
    },{
      title: '赛事状态',
      dataIndex: 'available',
      render:(text)=>text?'已发布':'未发布'
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.available){
          case true:return  <a onClick={() => this.handleModalVisible(true,record,1)}>-</a>;
          default:
            return <div>
              {/*<a onClick={() => this.handleConfirm(record,'release')}>发布</a>*/}
              {/*<Divider type='vertical'/>*/}
              {/*<a onClick={() => this.handleModalVisible(true,record,1)}>修改</a>*/}
            </div>;
        }
      }
    }];

    return (
      <PageHeaderLayout title="赛事列表">
        <Card bordered={false}>
           <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                  <FormItem  style={{float:'left',display:'inline'}}>
                    <Button type='primary'  ghost onClick={() => this.handleModalVisible(true,'',0)}>新增赛事</Button>
                  </FormItem>
                  <FormItem  style={{float:'right',display:'inline'}}>
                    <Button type="primary" htmlType="submit">搜索</Button>
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
                rowKey ={ (record)=>record.id}
                onChange={this.handleStandardTableChange}
              />
            </div>
        </Card>
        <Modal
          title={modaltype===0?'新增赛事':'修改赛事'}
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}
          footer={[]}
          onCancel={() => this.handleModalVisible()}
        >
          {modalVisible?<AddEvent modalType={modaltype}
                                  data={_record}
                                  menu={eventtype}
                                  btnloading={btnloading}
                                  handleCancel={() => this.handleModalVisible()}
                                  handleOk={(type,params)=>this.handleOk(type,params)}/>:''}
        </Modal>
      </PageHeaderLayout>
    );
  }
}


