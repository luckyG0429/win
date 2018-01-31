/**
 * 额度管理审核
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TabList from '../../components/GameQuiz/AddQuiz';

import styles from './Servicelist.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  quizlist: state.quizlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {
      page:1,
      size:10,
      kgName:'',
      applyName:'',
      applyPhone:'',
      applyStartTime:'',
      applyEndTime:'',
      state:'',
    },
    recorduser: {},
    modalVisible:false,
    resultlist:[],
    activeKey:"0",
    userlist:[],
    modaltype:''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'quizlist/fetch',
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
      type: 'quizlist/fetch',
      payload: params
    });
  }

  /*TODO: 弹框的显示与隐藏 - 查看用户详情 - 传递数据[userId]*/
  handleModalVisible = (flag = false,record={}, type) => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible: flag,
      recorduser: record,
      modaltype:type,
      tabloading:true,
    });
    // if(type===1 && flag){
    //   dispatch({
    //     type:'quizlist/detailorder',
    //     payload:record,
    //     callback:(result)=>{
    //       console.log(result);
    //       if(result.code == 200){
    //         this.setState({
    //           resultlist:result.data.orderquizlist,
    //           tabloading:false,
    //         })
    //       }
    //     }
    //   })
    // }else if(type === 2 && record){
    //
    // }else{
    //
    // }
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
        type: 'quizlist/fetch',
        payload: {
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
    });
  }

  handleOk(type, params) {
    const { dispatch } = this.props;
    this.setState({
      btnloading: true,
    });
    if (type == 1) {
      dispatch({
        type: 'quizlist/changeorderstate',
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
                  type: 'quizlist/fetch',
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
        type: 'quizlist/senddeliveryinfo',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {
            Modal.success({
              title: '添加成功！',
              onOk() {
                dispatch({
                  type: 'quizlist/fetch',
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
    const { quizlist: { data, loading } ,  dispatch } = this.props;

    const { modalVisible, resultlist,  modaltype, recorduser} = this.state;

    const columns = [{
      title: '比赛名称',
      dataIndex: 'gameName',
    },{
      title: '竞猜规则',
      dataIndex: 'quizRules',
    },{
      title: '竞猜开始时间',
      dataIndex: 'quizTimeStart',
    },{
      title: '竞猜结束时间',
      dataIndex: 'quizTimeEnd',
    },{
      title: '战队-A队',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
          <a>{`赔率：${record.Ateamodds}}</a>
          <Divider/>
          <a>{`下注人数：${record.quizAteamJoin}}</a>
        </div>
      }
    },{
      title: '战队-B队',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
          <a>{`赔率：${record.Bteamodds}}</a>
          <Divider/>
          <a>{`下注人数：${record.quizBteamJoin}}</a>
        </div>
      }
    },{
      title: '下注总人数',
      dataIndex: 'quizTotalJoin',
    },{
      title: '下注总金币',
      dataIndex: 'quizTotalCoin',
    },{
      title: '竞猜状态',
      dataIndex: 'quizStatus',
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
          <a onClick={() => this.handleModalVisible(record)}>终止</a>
          <Divider/>
          <a onClick={() => this.handleModalVisible(record)}>删除</a>
        </div>
      }
    }];
    const footbtn1 = [<Button type="primary" key="reset" onClick={() => this.handleModalVisible()}>返回</Button>];

    return (
      <PageHeaderLayout title="竞猜列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {/*{this.renderAdvancedForm()}*/}
              <Button  onClick={() => this.handleModalVisible(true,'','1')}>新增竞猜</Button>
            </div>
            <StandardTable
              columns = { columns }
              loading={loading}
              data={ data }
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="新增"
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}
          bodyStyle={{ height:'320px',overflowY:'auto'}}
          footer={modaltype ==1?[]:footbtn1 }
          onCancel={() => this.handleModalVisible()}
        >
          <TabList data={resultlist}
                   userorder={ recorduser}
                   modaltype={modaltype}
                   gameName="中国VS韩国"
                   gameId="1"
                   handleOk={(type, params) => this.handleOk(type, params)}
                   handleCancel={() => this.handleModalVisible()}/>



        </Modal>
      </PageHeaderLayout>
    );
  }
}


