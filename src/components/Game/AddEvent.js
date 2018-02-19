/**
 *  添加赛事
 */
import React from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


var Eventdetail =(props) =>{
  const { getFieldDecorator } = props.form

  const { modalType, form, handleOk, handleCancel, data , menu, btnloading} = props;
  //赛事分类列表
  const optionListClass = true ?[]:menu.map((item)=><Option key={item} value={item.id}>{item.name}</Option>);
  const canEdit = modalType === 1;

  const optionListTeam=[];

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

  const disabledDate = (current)=>{
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const disabledDateTime = ()=>{
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  var handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = {
        eventName:values.eventName|| undefined,
        eventclass:values.eventclass|| undefined,
        eventTimeStart:values.eventTimeStart|| undefined,
        eventTimeEnd:values.eventTimeEnd|| undefined,
      };
      if(modalType === 'change'){
        jsonParams.id = data.id;
      }
      var json = {
        userInfo: JSON.stringify(jsonParams)
      };
      handleOk(modalType,json);
    });
  };

  var handleReset = ()=>{
    form.resetFields();
    handleCancel();
  }
  return  (<Form layout="horizontal"  style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem label="赛事分类" {...formItemLayout}>
      {getFieldDecorator('eventclass',{
        rules: [{
          required: true , message: '请选择赛事分类！',
        }],
        initialValue:eventclass
      })(<Select>
        { optionListClass }
      </Select>)}
    </FormItem>
    <FormItem label="赛事名称" {...formItemLayout}>
      {getFieldDecorator('eventName',{
        rules: [{
          required: true , message: '请选择赛事名称！',
        }],
        initialValue:eventName
      })(<Input/>)}
    </FormItem>
    <FormItem label="比赛开始时间"  {...formItemLayout}>
      {getFieldDecorator('eventTimeStart',{
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
      {getFieldDecorator('eventTimeEnd',{
        rules: [{
          required: false , message: '请输入比赛结束时间！',
        }],
        initialValue:moment(eventTimeEnd)
      })(<DatePicker
        showTime
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        style={{width:'80%'}}/>
      )}
    </FormItem>
    <FormItem style={{textAlign:'center'}}>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>确定</Button>
      <Button onClick={()=>handleReset()} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>)
}
Eventdetail = Form.create()(Eventdetail);

export default  Eventdetail



