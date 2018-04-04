/**
 * 添加权限管理
 *props： 职位枚举列表，资源枚举列表
 *state：
 *
 * **/

import React, { PureComponent } from 'react';
import {Form, Input, Button, Select} from 'antd';

const FormItem = Form.Item;
const Texrarea = Input.TextArea;
const Option = Select.Option;

class PermissForm extends PureComponent {

  state = {
    listOperate: [{
      value: 'read',
      name: '查看'
    },{
      value: 'alert',
      name: '编辑'
    },{
      value: 'create',
      name: '新增'
    },{
      value: 'delete',
      name: '删除'
    }]
  }

  handleOk=(e)=>{
    e.preventDefault();
    const { handleOk, modalType, data } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
      const params = {
        roleId: values.roleId,
        resourceId: values.resourceId,
        permission: values.permission.join(','),
        available: values.available ===1?true:false
      }
      if(modalType !== 2){
        params.id = data.id;
      }
      handleOk(modalType,params);
    });
  }

  handleChange(){}

  render(){
    const { getFieldDecorator } = this.props.form;
    const {data, modalType, roleList, resourceList} = this.props;
    const rolelistOption = roleList.length != 0?roleList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>):[]
    const resourcelistOption = resourceList.length != 0?resourceList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>):[]

    const { listOperate } = this.state;
    const operatelistOption = listOperate.map((item,index)=><Option key={index} value={item.value}>{item.name}</Option>)


    const formItemLayout = {
      labelCol: { span: 4, offset:2 },
      wrapperCol: { span: 16 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 12, offset: 6 },
    }

    if( data != undefined){
      var {
        roleId,
        resourceId,
        permission,
        available,
      } = data
    }else{
      var roleId='',
        resourceId='',
        permission='',
        available='';
    }

    return <Form layout='horizontal'  onSubmit={this.handleOk}>
      <FormItem label='职位' {...formItemLayout}>
        {
          getFieldDecorator('roleId',{
            rules:[
              { required: true, message: '请输入选择职位' }
            ],
            initialValue:roleId
          })( <Select placeholder='请输入选择职位'>
            { rolelistOption }
          </Select>)
        }
      </FormItem>
      <FormItem label='对应资源' {...formItemLayout}>
        {
          getFieldDecorator('resourceId',{
            rules:[
              { required: true, message: '请选择资源' }
            ],
            initialValue:resourceId
          })( <Select placeholder='请选择资源'>
            { resourcelistOption }
          </Select>)
        }
      </FormItem>
      <FormItem label='操作' {...formItemLayout}>
        {
          getFieldDecorator('permission',{
            rules: [{
              require:true
            }],
            initialValue:permission
          })(
            <Select
              mode="tags"
              placeholder="Please select"
              onChange={this.handleChange}
            >
              {operatelistOption}
          </Select>)
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

export default Form.create()(PermissForm);
