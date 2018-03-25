/**
 * 新增赛事类型
 * 需要参数：
 name (string):名称
 type (byte):类型
 icon (file):图标
 available (boolean 可选):是否有效
 * **/

import React, { PureComponent } from 'react'
import {Form, Input, Select, Upload, Icon, Button } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;



class EventTypeForm extends PureComponent{
  state = {
    fileList:[]
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  componentWillReceiveProps(){

  }

  handleOk=(e)=>{

    e.preventDefault();
    const { fileList } = this.state;
    const { handleOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('icon', file);
      });
      for(var x in values){
        formData.append([x],values[x])
      }
      handleOk(formData);
    });
  }

  handleCancel = ()=>{
    const { handlCancel } = this.props;
    this.props.form.resetFields();
    handlCancel();
  }

  render(){

    const {getFieldDecorator} = this.props.form;
    const iconprops = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState({
          fileList: [file],
        });
        return false;
      },
      fileList: this.state.fileList,
    };

    const formItemLayout = {
      labelCol: { span: 4, offset:2 },
      wrapperCol: { span: 16 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 12, offset: 6 },
    }

    return <Form layout='horizontal'  onSubmit={this.handleOk}>
       <FormItem label='名称' {...formItemLayout}>
         {
           getFieldDecorator('name',{
             rules:[
               { required: true, message: '请输入赛事分类的名字' }
             ]
           })(
             <Input placeholder='请输入赛事分类的名字'/>
           )
         }
       </FormItem>
      <FormItem label='类型' {...formItemLayout}>
        {
          getFieldDecorator('type',{
            rules:[
              { required: false, message: '请输入' }
            ]
          })(
            <Input placeholder='赛事类型值为正整数且唯一，如：10'/>
          )
        }
      </FormItem>
      <FormItem label='图标' {...formItemLayout}>
        <Upload {...iconprops}>
          <Button>
            <Icon type="upload" /> 上传图标
          </Button>
        </Upload>
      </FormItem>
      <FormItem label='状态' {...formItemLayout}>
        {
          getFieldDecorator('available',{
            rules:[
              { required: true, message: '请输入' }
            ]
          })(
            <Select placeholder='请选择赛事类型的状态'>
              <Option key='1' value={0}>未启用</Option>
              <Option key='2' value={1}>启用</Option>
            </Select>
          )
        }
      </FormItem>
      <FormItem {...buttonItemLayout} style={{display:'flex',justifyContent:'center'}}>
        <Button type='primary' htmlType="submit">提交</Button>
        <Button style={{marginLeft:24}} onClick={this.handleCancel}>取消</Button>
      </FormItem>
    </Form>
  }
}

export default Form.create()(EventTypeForm)
