import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';

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
    console.log(this.interval)
    clearInterval(this.interval);
  }

  onChangeImg = () => {
    const imgSrc = this.refs.imgCode;
    const times = (new Date()).getTime();
    imgSrc.setAttribute('src', `/system/user/imgCode/generate.htm?timestamp=${times}`);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'login/accountSubmit',
            payload: values,
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
             {
                login.status === false &&
                login.submitting === false &&
                this.renderMessage(login.tipMessage)
             }
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
           <FormItem>
           <Row gutter={8}>
           <Col span={16}>
           {getFieldDecorator('imgcode', {
           rules: [{
           required: true, message: '请输入验证码！',
           }],
           })(
           <Input
           size="large"
           type="text"
           prefix={<Icon type="mail" className={styles.prefixIcon} />}
           placeholder="验证码"
           />
           )}
           </Col>
           <Col span={8}>
           <img onClick={this.onChangeImg}
           className={styles.getCaptcha}
           ref={'imgCode'}
           src="/system/user/imgCode/generate.htm"
           alt="图片验证码"
           />
           </Col>
           </Row>
           </FormItem>
          <FormItem className={styles.additional}>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
          <FormItem>
            <a href='/user/register'>注册</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
