/**
 * Created by Administrator on 2017/12/11 0011.
 */
/*
 * 组件名称：win+ 赛事列表
 * 功能：列表的查询，
 * model: limitlist
 * api: api
 *
 *  */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Table, DatePicker, Modal, message, Badge, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Game.less';

const FormItem = Form.Item;
const { Option } = Select;
const RangePicker = DatePicker.RangePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  wingame: state.wingame,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {},
    modal: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'wingame/listfetch',
    //   payload: {
    //     //TODO:参数待定
    //   }
    // });
  }

  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;


    const params = {
      currentPage: pagination.currentPage,
      pageSize: pagination.wingame,
      ...formValues,
      ...filters,
    };

    // dispatch({
    //   type: 'wingame/listfetch',
    //   payload: params,
    // });
  }


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      const jsonParams = { };// TODO:参数待定;

      this.setState({
        formValues: {
          page: 1,
          size: 10,
          ...jsonParams,
        },
      });
      // dispatch({
      //   type: 'wingame/listfetch',
      //   payload: {
      //     page: 1,
      //     size: 10,
      //     ...jsonParams
      //   }
      // });
    });
  }

  handleModalVisible = (flag = false, record = {}, title = '') => {
    const { dispatch } = this.props;
    this.setState({
      modal: flag,
      record,
    });
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="赛事名称">
              {getFieldDecorator('kgName')(
                <Input placeholder="请输入" style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="赛事分类">
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
              <Button onClick={this.handleFormReset} style={{ marginRight: 16 }}>重置</Button>
              <Button type="primary" size="middle" ghost onClick={() => this.handleModalVisible(true, '')}>赛事新增</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    // const { childhomelist: { loading , data } ,  dispatch } = this.props;
    // const { getFieldDecorator } = this.props.form;
    const data = [];
    const loading = false;
    const page = {};
    const { modal } = this.state;
    const columns = [
      {
        title: '时间',
        dataIndex: '',
      },
      {
        title: '赛事类型',
        dataIndex: 'phone',
      },
      {
        title: '赛事名称',
        dataIndex: 'realName',
      },
      {
        title: '比赛',
        dataIndex: 'registerTime',
      },
      {
        title: '操作',
        dataIndex: '',
        render: (text, record) => {
          const dataUser = record;
          return (
            <div>
              <a onClick={() => this.handleModalVisible(true, dataUser, '修改')}>添加比赛</a>
            </div>
          );
        },
      },
    ];
    return (
      <PageHeaderLayout title="赛事列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>
            <div className={styles.tableListLine}>
              <Button type="primary" size="middle" onClick={() => this.handleModalVisible(true, '')}><Icon type="plus" />新增</Button>
            </div>
            <Table
              columns={columns}
              loading={loading}
              dataSource={data}
              bordered
              size="small"
              pagination={page}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="新增赛事"
          visible={modal}
          onCancel={() => this.handleModalVisible()}
          width={1200}
        >
          <p>赛事新增</p>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
