/**
 * Created by Administrator on 2017/12/11 0011.
 */
/*
 * 组件名称：用户信息列表
 * 功能：列表的查询，
 * model: limitlist
 * api: api
 *
 *  */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserInfoList.less';

const FormItem = Form.Item;
const { Option } = Select;
const RangePicker = DatePicker.RangePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


const UserModal = Form.create({
  mapPropsToFields(props) {
    console.log('UserModal');
    console.log(props);

    return {
      username: Form.createFormField({
        value: 'liyang',
      }),
      sex: Form.createFormField({
        value: 'liyang',
      }),
      age: Form.createFormField({
        value: 'liyang',
      }),
      idNo: Form.createFormField({
        value: 'liyang',
      }),
      bankCardNo: Form.createFormField({
        value: 'liyang',
      }),
      idAddr: Form.createFormField({
        value: 'liyang',
      }),
    };
  },
})((props) => {
  console.log(props);
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <Divider >用户基本信息</Divider>
      <Row style={{marginTop:20}} gutter={16}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='用户名'>
            {getFieldDecorator('username',{})(<Input/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='性别'>
            {getFieldDecorator('sex',{})(<Input style={{width:'100%'}}/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='身份证号'>
            {getFieldDecorator('age',{})(<Input/>)}
          </FormItem>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='年龄'>
            {getFieldDecorator('age',{})(<Input/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='银行卡号'>
            {getFieldDecorator('bankCardNo',{})(<Input/>)}
          </FormItem>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <FormItem label='所属银行'>
            {getFieldDecorator('idAddr',{})(<Input/>)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});

@connect(state => ({
  childhomelist: state.childhomelist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    selectedRows: [],
    formValues: {},
    modal: false,
    title:'',
    recorddata:{}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'childhomelist/listfetch',
      payload: {
        kgName: '',
        state: ''
      }
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      size: pagination.size,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'childhomelist/listfetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

  }


  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = { kgName:values.kgName||'', state:values.state||''};

      this.setState({
        formValues:{
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
      dispatch({
        type: 'childhomelist/listfetch',
        payload: {
          page: 1,
          size: 10,
          ...jsonParams
        }
      });
    });
  }

  handleModalVisible = (flag = false,record={}, title='') => {
    const { dispatch } = this.props;
    this.setState({
      modal:flag,
      recorddata: record
    })
    if(flag&&record){
      switch (title){
        case '新增':

        case '修改':
          dispatch({
            type: 'childhomelist/updateuser',
            payload:record.id,
            callback:(result)=>{
              if(result.code === 200){
                this.state({
                  fromstate:result.data
                })
              }
            }
          })
        case '删除':

        case '密码重置':
          dispatch({
            type: 'childhomelist/updateuser',
            payload:record.userId,
            callback:(result)=>result.code === 200?Modal.success({title:result.msg }): Modal.error({title:result.msg })
          });break
      }
      dispatch({
        type: 'childhomelist/userDetailfetch',
        payload:record.userId
      })
    }
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="幼儿园名称">
              {getFieldDecorator('kgName')(
                <Input placeholder="请输入" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="账号状态">
              {getFieldDecorator('state')(
                <Select placeholder="请选择" style={{ width: '80%' }}>
                  <Option value="0">全部</Option>
                  <Option value="1">可用</Option>
                  <Option value="2">禁用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
             <span style={{ float: 'center', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>查询</Button>
                <Button  onClick={this.handleFormReset} style={{ marginRight: 16 }}>重置</Button>
                <Button  onClick={this.handleFormReset} type="primary" ghost>新增账号</Button>
              </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const { childhomelist: { loading , data } ,  dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedRows, addInputValue, modal, title } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: '幼儿园名称',
        dataIndex: '',
      },
      {
        title: '账号',
        dataIndex: 'phone',
      },
      {
        title: '密码',
        dataIndex: 'realName',
      },
      {
        title: '账号状态',
        dataIndex: 'registerTime',
        width: 120,
      },
      {
        title: '操作',
        dataIndex: '',
        width: 300,
        render: (text,record) => {
          var dataUser = record;
          return (
            <div>
              <a onClick={() => this.handleModalVisible(true,dataUser,'修改')}>修改</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleModalVisible(true,dataUser,'删除')}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleModalVisible(true,dataUser,'密码重置')}>密码重置</a>
            </div>
          )},
      },
    ];


    return (
      <PageHeaderLayout title="幼儿园用户">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>
            <StandardTable
              columns = { columns }
              selectedRows={ selectedRows }
              loading={ loading }
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title={title}
          visible={modal}
          onCancel={() => this.handleModalVisible()}
          width={1200}
        >
          <UserModal/>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
