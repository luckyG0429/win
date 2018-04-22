import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Modal, Alert } from 'antd';
import styles from './Login.less';
import {handleResult} from "../../utils/utils";

const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === true) {
      this.props.dispatch(routerRedux.push('/'));
    }
  }

  componentWillUnmount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'login/accountSubmit',
            payload: values,
            callback:(result)=>{
              if(result.resultCode !== 0 ){
                Modal.error({
                  title: '登陆失败',
                  content: "请检查您的用户名/密码是否正确",
                })
              }
            }
          });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
        closeText="X"
      />
    );
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
                  rules: [{
                    required: true, message: '请输入账户名！',
                  }],
                })(
                  <Input
                    size="large"
                    type="text"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="用户名"
                  />
                )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入密码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="密码"
                  />
                )}
          </FormItem>
          <FormItem className={styles.additional}>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
