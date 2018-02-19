/**
 * 新增竞猜规则
 *
 *
 * **/

import React, { PureComponent } from 'react';
import {Form, Input, Button,} from 'antd';

const FormItem = Form.Item;
const Texrarea = Input.TextArea;

class QuizForm extends PureComponent {

  handleOk=(e)=>{
    e.preventDefault();
    const { handleOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      alert('暂时还没有添加竞猜规则的接口')
    //  handleOk(formData);
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4, offset:2 },
      wrapperCol: { span: 16 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 12, offset: 6 },
    }

    return <Form layout='horizontal'  onSubmit={this.handleOk}>
      <FormItem label='规则名' {...formItemLayout}>
        {
          getFieldDecorator('name',{
            rules:[
              { required: true, message: '请输入竞猜规则的名称' }
            ]
          })(<Input placeholder='请输入竞猜规则的名称'/>)
        }
      </FormItem>
      <FormItem label='规则描述' {...formItemLayout}>
        {
          getFieldDecorator('desc',{
            rules: [{
              require:true
            }]
          })(<Texrarea placeholder='简单描述一下竞猜规则使用方式' rows={4}/>)
        }
      </FormItem>
      <FormItem {...buttonItemLayout} style={{display:'flex',justifyContent:'center'}}>
        <Button type='primary' htmlType="submit">提交</Button>
        <Button style={{marginLeft:24}} onClick={this.handleCancel}>取消</Button>
      </FormItem>
    </Form>
  }
}

export default Form.create()(QuizForm);
