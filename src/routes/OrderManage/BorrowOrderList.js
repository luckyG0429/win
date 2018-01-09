
/*
 * 组件名称：借款订单
 * 功能：列表的查询，
 * model: order_borrow
 * api: ordermanage
 *
 *  */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BorrowOrderList.less';

const FormItem = Form.Item;
const { Option } = Select;
const RangePicker = DatePicker.RangePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  borroworder: state.borroworder,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'borroworder/fetch',
      payload: {
        pageSize: 10,
        currentPage: 1,
        searchParams: ''
      }
    });
  }

  // componentWillReceiveProps(nextProps){
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'userlist/fetch',
  //     payload: {
  //       pageSize: 10,
  //       currentPage: 1,
  //       searchParams: ''
  //     }
  //   });
  // }

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
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'borroworder/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'borroworder/fetch',
      payload: {},
    });
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
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'borroworder/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag = false,record={}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userlist/changeModal',
      payload: {
        modal:flag,
        record
      }
    })
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: this.state.addInputValue,
      },
    });
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }


  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(
                <Input placeholder="请输入" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('realName')(
                <Input placeholder="请输入" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="注册时间">
              {getFieldDecorator('registerTime')(
                <RangePicker style={{ width: '80%' }}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="注册渠道">
              {getFieldDecorator('registerChannel')(
                <Select placeholder="请选择" style={{ width: '80%'}}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="注册客户端">
              {getFieldDecorator('registerClient')(
                <Select placeholder="请选择" style={{ width: '80%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
             <span style={{ float: 'center', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>查询</Button>
                <Button  onClick={this.handleFormReset}>重置</Button>
              </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const { borroworder: { loading , data , modal} ,  dispatch } = this.props;
    console.log('data');
    console.log(data);
    const { selectedRows, addInputValue } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    const status = ['关闭', '运行中', '已上线', '异常'];
    const statusMap = ['default', 'processing', 'success', 'error'];
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'userId',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '姓名',
        dataIndex: 'realName',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '注册客服端',
        dataIndex: 'registerClient',
      },
      {
        title: '注册渠道',
        dataIndex: 'registerChannel',
      },
      {
        title: '操作',
        render: (text,record) => {
          var dataUser = record;
          return (
            <div>
              <a onClick={() => this.handleModalVisible(true,dataUser)}>订单详情</a>
            </div>
          )},
      },
    ];
    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>
            {/*<div className={styles.tableListOperator}>*/}
            {/*<Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>*/}
            {/*新建*/}
            {/*</Button>*/}
            {/*{*/}
            {/*selectedRows.length > 0 && (*/}
            {/*<span>*/}
            {/*<Button>批量操作</Button>*/}
            {/*<Dropdown overlay={menu}>*/}
            {/*<Button>*/}
            {/*更多操作 <Icon type="down" />*/}
            {/*</Button>*/}
            {/*</Dropdown>*/}
            {/*</span>*/}
            {/*)*/}
            {/*}*/}
            {/*</div>*/}
            <StandardTable
              columns = { columns }
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="新建规则"
          visible={modal}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={addInputValue} />
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
