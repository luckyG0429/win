/**
 *  添加赛事
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;


class EventDetail extends PureComponent {

  handleReset = ()=>{
    this.props.form.resetFields();
    this.props.handleCancel();
  }

  DateChangeNumber(str){
    let dataT = new Date(str);
    return Date.parse(dataT);
  }

  handleSubmit = (e) => {
    e.preventDefault();
   // const { fileList } = this.state;
    const { modalType, handleOk } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };

      var jsonParams = {
        type:values.type|| undefined,
        name:values.name|| undefined,
        startTime:this.DateChangeNumber(values.startTime.format('YYYY-MM-DD  HH:mm:ss').toString())|| undefined,
        endTime:this.DateChangeNumber(values.endTime.format('YYYY-MM-DD  HH:mm:ss').toString())|| undefined,
        // startTime:values.startTime.format('YYYY-MM-DD  HH:mm:ss').toString(),
        // endTime:values.endTime.format('YYYY-MM-DD  HH:mm:ss').toString(),
      };

      if(modalType === '1'){
        jsonParams.id = data.id;
      }

      // const formData = new FormData();
      // fileList.forEach((file) => {
      //   formData.append('icon', file);
      // });
      // for(var x in jsonParams){
      //   formData.append([x],jsonParams[x])
      // }
      handleOk(modalType,jsonParams);
    });
  };

   disabledDate = (current)=>{
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  disabledDateTime = ()=>{
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
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
      eventTimeStart,
      eventTimeEnd,
      eventclass,
    } = data
  }else{
    var eventName='',
      eventclass='',
      eventTimeStart='2018-01-01',
      eventTimeEnd='2018-01-01';
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

  return  (<Form layout="horizontal"  style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem label="赛事类型" {...formItemLayout}>
      {getFieldDecorator('type',{
        rules: [{
          required: true , message: '请选择赛事分类！',
        }],
        initialValue:eventclass
      })(<Select>
        { optionListClass }
      </Select>)}
    </FormItem>
    <FormItem label="赛事名称" {...formItemLayout}>
      {getFieldDecorator('name',{
        rules: [{
          required: true , message: '请输入赛事名称！',
        }],
        initialValue:eventName
      })(<Input/>)}
    </FormItem>
    {/*<FormItem label='图标' {...formItemLayout}>*/}
      {/*<Upload {...iconprops}>*/}
        {/*<Button>*/}
          {/*<Icon type="upload" /> 上传图标*/}
        {/*</Button>*/}
      {/*</Upload>*/}
    {/*</FormItem>*/}
    <FormItem label="比赛开始时间"  {...formItemLayout}>
      {getFieldDecorator('startTime',{
        rules: [{
          required: true , message: '请输入比赛开始时间！',
        }],
        initialValue:moment(eventTimeStart)
      })(<DatePicker
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        style={{width:'80%'}}/>
      )}
    </FormItem>
    <FormItem label="比赛结束时间"  {...formItemLayout}>
      {getFieldDecorator('endTime',{
        rules: [{
          required: false , message: '请输入比赛结束时间！',
        }],
        initialValue:moment(eventTimeEnd)
      })(<DatePicker
        showTime
        disabledDate={this.disabledDate}
       // disabledTime={disabledDateTime}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        style={{width:'80%'}}/>
      )}
    </FormItem>
    {/*<FormItem label="赛事描述" {...formItemLayout}>*/}
      {/*{getFieldDecorator('description',{*/}
        {/*rules: [{*/}
          {/*required: true , message: '赛事简介！',*/}
        {/*}],*/}
        {/*initialValue:eventName*/}
      {/*})(<TextArea  rows={4}/>)}*/}
    {/*</FormItem>*/}
    <FormItem style={{textAlign:'center'}}>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={this.handleSubmit}>确定</Button>
      <Button onClick={this.handleReset} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>)
  }
}
EventDetail = Form.create()(EventDetail);

export default  EventDetail



