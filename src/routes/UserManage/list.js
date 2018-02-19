/**
 * 注册用户统计列表
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs,Table  } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ModalTabs from '../../components/UserManage/Tabs';


import styles from './Servicelist.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  userlist: state.userlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
  };

  componentWillMount() {
  }

  componentDidMount() {
    const { dispatch } = this.props;
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
      type: 'userlist/fetch',
      payload: params
    });
  }




  /** 弹框的显示与隐藏  **/
  handleModalVisible = (flag = false,record={}) => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible: flag,
      record: record,
    });
    if(flag){
      dispatch({
        type:'userlist/detailorder',
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
        type: 'userlist/fetch',
        payload: {
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
    });
  }


  /*TODO: 生成条件查询表单 ,参数是：渠道枚举数据 ,额度状态枚举，额度产品枚举 */
  renderAdvancedForm( ) {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="ID" {...formItemLayout}>
              {getFieldDecorator('id')(
                <Input placeholder="请输入"  maxLength='10'/>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入"  maxLength='18' />
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            <FormItem label="注册时间" {...formItemLayout}>
              {getFieldDecorator('createTime')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{marginTop:10}}>
          <Col md={7} sm={24}>
            <FormItem label="会员等级" >
              {getFieldDecorator('level')(
                <Select placeholder="请选择" style={{width:120}}>
                  <Option key={1}>大众会员</Option>
                  <Option key={2}>白银会员</Option>
                  <Option key={3}>黄金会员</Option>
                  <Option key={4}>超级会员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
             <span style={{ float: '', marginBottom: 24 }}>
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
    const { userlist: { data, loading, eventtype } ,  dispatch } = this.props;
    console.log(data);
    const { modalVisible, modaltype, record, recordparent, btnloading, showGamelist, innerData,innerLoading} = this.state;

    const columns = [{
      title: 'ID',
      dataIndex: 'id',
    },{
      title: '账号',
      dataIndex: 'username',
    },{
      title: '呢称',
      dataIndex: 'name',
    },{
      title: '会员等级',
      dataIndex: 'level',
      render:(text)=>{
        switch(text){
          case 1:return <span style={{color:'#080',textShadow:'0 2px 2px #080'}}>大众会员</span>;
          case 2:return <span style={{color:'#ddd',textShadow:'0 2px 2px #ccc'}}>白银会员</span>;
          case 3:return <span style={{color:'#fc0',textShadow:'0 2px 2px #fc0'}}>黄金会员</span>;
          case 4:return <span style={{color:'#000',textShadow:'0 2px 2px #333'}}>超级会员</span>;
          default:return <span style={{color:'#080',textShadow:'0 2px 2px #080'}}>大众会员</span>;
        }
      }
    },{
      title: '注册时间',
      dataIndex: 'time',
    },{
       title: '拥有金币(个)',
      dataIndex: 'money',
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
            return <div>
              <a onClick={() =>this.handleModalVisible(true,record.id)}>用户详情</a>
            </div>;
      }
    }];


    return (
      <PageHeaderLayout title="App用户列表">
        <Card bordered={false}>
          <div>
            {this.renderAdvancedForm()}
          </div>
          <Table dataSource={[{id:'09088',username:'te',name:'zai',money:10,level:0,time:'2018-02-18'}]}
                 columns={columns}
                 className={styles.tableList}
                 size='middle'
                 loading={false}
                 bordered
                 onChange={this.handleStandardTableChange}/>
        </Card>
        <Modal
          title='用户详情'
          visible={ modalVisible }
          width={ 960 }
          style={{top:50}}
          footer={[<Button key='btn1' type='primary' onClick={() => this.handleModalVisible()}>返回</Button>]}
          onCancel={() => this.handleModalVisible()}
        >
          <ModalTabs userdata={record}/>
        </Modal>
      </PageHeaderLayout>
    );
  }
}


