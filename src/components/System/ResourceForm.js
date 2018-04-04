/**
 * 新增竞猜规则
 *
 *
 * **/

import React, { PureComponent } from 'react';
import {Form, Input, Button, Select} from 'antd';

const FormItem = Form.Item;
const Texrarea = Input.TextArea;
const Option = Select.Option;

class ResourceForm extends PureComponent {

  handleOk=(e)=>{
    e.preventDefault();
    const { handleOk, modalType, data } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
      const params = {
        ...values,
        available:values.available ===1?true:false
      }
      if(modalType !== 2){
        params.id = data.id;
      }
      handleOk(modalType,params);
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {data, modalType} = this.props;

    const formItemLayout = {
      labelCol: { span: 4, offset:2 },
      wrapperCol: { span: 16 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 12, offset: 6 },
    }

    if( data != undefined){
      var {
        name,
        type,
        description,
        available,
      } = data
    }else{
      var name='',
        type='',
        description='',
        available='';
    }

    return <Form layout='horizontal'  onSubmit={this.handleOk}>
      <FormItem label='名称' {...formItemLayout}>
        {
          getFieldDecorator('name',{
            rules:[
              { required: true, message: '请输入资源名称' }
            ],
            initialValue:name
          })(<Input placeholder='请输入资源名称'/>)
        }
      </FormItem>
      <FormItem label='类型' {...formItemLayout}>
        {
          getFieldDecorator('type',{
            rules:[
              { required: true, message: '请输入类型，' }
            ],
            initialValue:type
          })(<Input placeholder='请输入一个表示资源唯一的数字，如10'/>)
        }
      </FormItem>
      <FormItem label='资源描述' {...formItemLayout}>
        {
          getFieldDecorator('description',{
            rules: [{
              require:true
            }],
            initialValue:description
          })(<Texrarea placeholder='简单描述一下该资源' rows={4}/>)
        }
      </FormItem>
      <FormItem label='状态值' {...formItemLayout}>
        {
          getFieldDecorator('available',{
            rules:[
              { required: true, message: '请输入' }
            ],
            initialValue:available?1:0
          })( <Select placeholder='请给资源添加有效性'>
            <Option key='1' value={0}>未启用</Option>
            <Option key='2' value={1}>启用</Option>
          </Select>)
        }
      </FormItem>
      <FormItem {...buttonItemLayout} style={{display:'flex',justifyContent:'center'}}>
        <Button type='primary' htmlType="submit">提交</Button>
        <Button style={{marginLeft:24}} onClick={this.handleCancel}>取消</Button>
      </FormItem>
    </Form>
  }
}

export default Form.create()(ResourceForm);
