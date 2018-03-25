/**
 *  添加战队
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, Upload,Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


class TeamDetail extends PureComponent {
  state = {
    fileList:[]
  }

  handleReset = ()=>{
    this.props.form.resetFields();
    this.props.handleCancel();
  }

  handleSubmit = (e) => {
    e.preventDefault();
   const { fileList } = this.state;
    const { modalType, handleOk } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };

      var jsonParams = {
        type:values.type|| undefined,
        name:values.name|| undefined,
      };

      if(modalType === '1'){
        jsonParams.id = data.id;
      }

      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('icon', file);
      });
      for(var x in jsonParams){
        formData.append([x],jsonParams[x])
      }
      handleOk(modalType,formData);
    });
  }

  render(){

  const { getFieldDecorator } = this.props.form

  const { modalType, data , menu, btnloading} = this.props;
  //赛事分类列表
  const optionListClass = menu.length == 0?[]:menu.map((item)=><Option key={item.id} value={item.type}>{item.name}</Option>);

  if(modalType ===1 && data != undefined){
    var {
      eventName,
      eventclass,
    } = data
  }else{
    var eventName='',
      eventclass='';
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

    const iconprops = {
      action: '/',
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

  return  (<Form layout="horizontal"  style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem label="所属类型" {...formItemLayout}>
      {getFieldDecorator('type',{
        rules: [{
          required: true , message: '请选择分类！',
        }],
        initialValue:eventclass
      })(<Select>
        { optionListClass }
      </Select>)}
    </FormItem>
    <FormItem label="战队名称" {...formItemLayout}>
      {getFieldDecorator('name',{
        rules: [{
          required: true , message: '请输入战队名称！',
        }],
        initialValue:eventName
      })(<Input/>)}
    </FormItem>
    <FormItem label='图标' {...formItemLayout}>
      <Upload {...iconprops}>
        <Button>
          <Icon type="upload" /> 上传图标
        </Button>
      </Upload>
    </FormItem>
    <FormItem style={{textAlign:'center'}}>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={this.handleSubmit}>确定</Button>
      <Button onClick={this.handleReset} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>)
  }
}
TeamDetail = Form.create()(TeamDetail);

export default  TeamDetail



