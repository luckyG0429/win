/**
 * 额度管理审核
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs,Table  } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddEvent from '../../components/Game/AddEvent';
import AddGame from '../../components/Game/AddGame';

import styles from './Servicelist.less';
import List from "../../components/PageList";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  eventlist: state.eventlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    showGamelist:false,//日程列表的显示与否
    formValues: {},//搜索参数
    recordparent:'',// 父级数据
    record:'',//当前被操作的数据
    modalVisible:false,//模态框的显示与否
    modaltype:'',//模态框的操作类型
    modalclass:'',//模态框的分类
    btnloading:false,//模态框的发送表单按钮
    innerData:[],
    innerLoading:false,
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

  /* TODO: 表格的分页处理 - 以及内部状态管理：表单数据[ formValues ] */
  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      page: pagination.current,
      size: pagination.pageSize,
    };
    this.setState({
      formValues:{
        ...params
      }
    });
    dispatch({
      type: 'eventlist/fetch',
      payload: params
    });
  }



  handleConfirm=(record, type)=>{
      const obj = ((type)=>type==='release'?{
        title:'您确定要发布当前的赛事吗？',
        content:'提示：赛事一旦发布，其下的所有比赛信息也会被同时发布上线。！',
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


  handleInnerCardlist = (flag=false,record={})=>{
    console.log('handleInnerCardlist');
    console.log(record)
    const { dispatch } = this.props;
    this.setState({
      showGamelist:flag,
      recordparent:record,
      innerLoading:flag,
    })
    if(flag){
      dispatch({
        type: 'eventlist/gamefetch',
        payload:record.id,
        callback:(result)=>{
          this.setState({
            innerData:result.data,
            innerLoading:false,
          })
        }
      });
    }
  }

  /*TODO: 弹框的显示与隐藏 - 日程列表 - 传递数据 -*/
  /**
   * 0 父新增 1父修改
   * 10 子新增  11子修改
   * **/
  handleModalVisible = (flag = false,record={}, type) => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible: flag,
      record: record,
      modaltype:type,
    });
    if(type===1 && flag){
      dispatch({
        type:'eventlist/detailorder',
        payload:record,
        callback:(result)=>{
          console.log(result);
          if(result.code == 200){
            this.setState({
              resultlist:result.data.ordergamelist,
              tabloading:false,
            })
          }
        }
      })
    }else if(type === 2 && record){

    }else{

    }
  }

  /* TODO:条件查询 - 清空查询条件  - 内部状态管理：初始化表单数据[ formValues ] */
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {
        page:1,
        size:10,
        kgName:'',
        applyName:'',
        applyPhone:'',
        applyStartTime:'',
        applyEndTime:'',
        state:'',
      }
    });
  }

  /* TODO:条件查询 - 条件查询事件  - 内部状态管理：表单数据[ formValues ] */
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = {
        kgName:values.kgName||"",
        applyName:values.applyName||"",
        applyPhone:values.applyPhone||"",
        state:values.state||'',
        applyStartTime: '',
        applyEndTime:''
    };
      if(values.createTime && values.createTime.length != 0 ){
        jsonParams.applyStartTime = values.createTime[0].format('YYYY-MM-DD').toString();
        jsonParams.applyEndTime = values.createTime[1].format('YYYY-MM-DD').toString()
      }
      this.setState({
        formValues:{
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
      dispatch({
        type: 'eventlist/fetch',
        payload: {
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
    });
  }

  handleOk(type, params) {
    //type: 0 新增 ；1 修改
    const { dispatch } = this.props;
    this.setState({
      btnloading: true,
    });
    if (type == 1) {
      dispatch({
        type: 'eventlist/changeorderstate',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {
            this.setState({
              btnloading: false,
              modalVisible:false,
            });
            Modal.success({
              title: '受理成功！',
              onOk() {
                dispatch({
                  type: 'eventlist/fetch',
                  payload: {
                    page:1,
                    size:10,
                    kgName:'',
                    applyName:'',
                    applyPhone:'',
                    applyStartTime:'',
                    applyEndTime:'',
                    state:'',
                  },
                });
              },
            });
          }else{
            this.setState({
              btnloading: false,
              modalVisible:false,
            });
          }

        },
      });
    } else if(type == 2) {
      dispatch({
        type: 'eventlist/senddeliveryinfo',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {
            Modal.success({
              title: '添加成功！',
              onOk() {
                dispatch({
                  type: 'eventlist/fetch',
                  payload: {
                    page:1,
                    size:10,
                    kgName:'',
                    applyName:'',
                    applyPhone:'',
                    applyStartTime:'',
                    applyEndTime:'',
                    state:'',
                  },
                });
              },
            });
          }
          this.setState({
            btnloading: false,
            modalVisible:false,
          });
        },
      });
    } else {
      dispatch({
        type: 'childuser/changechild',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {

          }
          this.setState({
            btnloading: false,
            modalVisible:false,
          });
        },
      });
    }
  }

  /*TODO: 生成条件查询表单 ,参数是：渠道枚举数据 ,额度状态枚举，额度产品枚举 */
  renderAdvancedForm( ) {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="幼儿园名称">
              {getFieldDecorator('kgName')(
                <Input placeholder="请输入"  maxLength={18} style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>

          <Col md={7} sm={24}>
            <FormItem label="申请人姓名">
              {getFieldDecorator('applyName')(
                <Input placeholder="请输入"  maxLength={18} style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            <FormItem label="提交时间">
              {getFieldDecorator('createTime')(
                <RangePicker style={{ width: '100%' }}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="申请人手机">
              {getFieldDecorator('applyPhone',{
                rules:[
                  { pattern:/^1[3|4|5|7|8]\d{9}$/,
                    len:11,
                    message:'请输入有效的手机号'}
                ],
                validateTrigger:'onBlur'
              })(
                <Input placeholder="请输入" maxLength={11} style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="审核状态">
              {getFieldDecorator('state')(
                <Select placeholder="请选择" style={{ width: '80%' }}>
                  <Option key={1}>未受理</Option>
                  <Option key={2}>已受理</Option>
                  <Option key={3}>已完成</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
             <span style={{ float: 'left', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>查询</Button>
                <Button  onClick={this.handleFormReset}>重置</Button>
              </span>
          </Col>
        </Row>

      </Form>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { eventlist: { data, loading, eventtype } ,  dispatch } = this.props;
    console.log(data);
    const { modalVisible, modaltype, record, recordparent, btnloading, showGamelist, innerData,innerLoading} = this.state;

    const columns = [{
      title: '开赛时间',
      dataIndex: 'eventTimeStart',
    },{
      title: '赛事',
      dataIndex: 'eventName',
    },{
      title: '赛事类别',
      dataIndex: 'eventclass',
    },{
      title: '结束时间',
      dataIndex: 'eventTimeEnd',
    },{
       title: '比赛日程',
      dataIndex: '',
      render:(text,record)=><a onClick={()=>this.handleInnerCardlist(true,record)}>日程列表</a>
    },{
      title: '赛事状态',
      dataIndex: 'eventstatus',
      render:(text)=>text===0?'未发布':'已发布'
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.gamestatus){
          case 1:return '-';
          default:
            return <div>
              <a onClick={() => this.handleConfirm(record,'release')}>发布</a>
              <Divider type='vertical'/>
              <a onClick={() => this.handleModalVisible(true,record,1)}>修改</a>
              <Divider type='vertical'/>
              <a onClick={() => this.handleConfirm(record,'delete')}>删除</a>
            </div>;
        }
      }
    }];

    const innerColumns = [{
      title: '比赛开始时间',
      dataIndex: 'gameTimeStart',
    },{
      title: '赛事名',
      dataIndex: 'eventName',
    },{
      title: '比赛战队-A',
      dataIndex: 'gameTeamA',
    },{
      title: '比赛战队-B',
      dataIndex: 'gameTeamB',
    }, {
      title: '比赛结束时间',
      dataIndex: 'gameTimeEnd',
    },{
      title: '赛事状态',
      dataIndex: 'gamestatus',
      render:(text)=>text===0?'未发布':'已发布'
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.gamestatus){
          case 0:return <div>
            <a onClick={() => this.handleModalVisible(true,record,11)}>修改</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleConfirm(record,'deletechild')}>删除</a>
          </div>;
          default: return '-'
        }
      }
    }];


    return (
      <PageHeaderLayout title="比赛列表">
        <Card bordered={false}>
          {
            (!showGamelist)?(<div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <Button  onClick={() => this.handleModalVisible(true,'',0)}>新增赛事</Button>
              </div>
              <StandardTable
                columns = { columns }
                loading={loading}
                data={ data }
                onChange={this.handleStandardTableChange}
              />
            </div>):<div>
              <div className={styles.innerTablelist}>
                <Button type='primary' ghost onClick={()=>this.handleInnerCardlist()}>返回赛事</Button>
                <Button type='primary' onClick={() => this.handleModalVisible(true,'',10)}>添加比赛</Button>
              </div>

              <Table dataSource={innerData}
                     pagination={false}
                     loading={innerLoading}
                     size='small'
                     columns={innerColumns}/>
            </div>
          }
        </Card>
        <Modal
          title={(modaltype<10)?(modaltype===0?'新增赛事':'赛事修改'):(modaltype===10?'新增比赛':'比赛修改')}
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}

          footer={[]}
          onCancel={() => this.handleModalVisible()}
        >
          {

            modaltype ===10 || modaltype ===11 ? (<AddGame modalType={modaltype}
                                handleOk={() => this.handleOk(type,params)}
                                handleCancel={() => this.handleModalVisible()}
                                data={record}
                                parentData={recordparent}
                                menu={eventtype}
                                btnloading={btnloading}/>) : (<AddEvent modalType={modaltype}
                                                                    handleOk={() => this.handleOk(type,params)}
                                                                    handleCancel={() => this.handleModalVisible()}
                                                                    data={record}
                                                                    menu={eventtype}
                                                                    btnloading={btnloading}/>)

          }
        </Modal>
      </PageHeaderLayout>
    );
  }
}


