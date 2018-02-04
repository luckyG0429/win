/**
 * 比赛 -- 添加竞猜
 */
import React from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker, Divider } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


var Quizdetail =(props) =>{
  const { getFieldDecorator } = props.form

  const { modalType, form, handleOk, handleCancel, data , gameName, gameId, menu, btnloading} = props;
  //竞猜规则列表
 // const optionList = menu.length ==0 ?[]:menu.map((item)=><Option key={item} value={item.id}>{item.name}</Option>);
  const optionList =[];
  const canEdit = modalType === 'change';

  if(data && data != undefined){
    var {
      quizRules,
      Ateamodds,
      Bteamodds,
      quizMinCoin,
      quizTimeStart,
      quizTimeEnd
    } = data
  }else{
    var  quizRules='',
      Ateamodds='',
      Bteamodds='',
      quizMinCoin='',
      quizTimeStart='',
      quizTimeEnd='';
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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
        quizRules:values.quizRules|| undefined,
        Ateamodds:values.Ateamodds|| undefined,
        Bteamodds:values.Bteamodds|| undefined,
        quizMinCoin:values.quizMinCoin|| undefined,
        quizTimeStart:values.quizTimeStart|| undefined,
        quizTimeEnd:values.quizTimeEnd|| undefined,
        gameName,
        gameId
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
  return <Form layout="horizontal" style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem
      {...formItemLayout}
      label="赛事名"
    >
      <span className="ant-form-text">China</span>
    </FormItem>
    <FormItem label="竞猜规则" {...formItemLayout}>
      {getFieldDecorator('quizRules',{
        rules: [{
          required: true , message: '请选择竞猜规则！',
        }],
        initialValue:quizRules
      })(<Select>
        { optionList }
      </Select>)}
    </FormItem>
    <Divider>赔率设置</Divider>
    <FormItem label="赔率-A队"  {...formItemLayout}>
      {getFieldDecorator('Ateamodds',{
        rules: [{
          required: true , message: '请设置赔率'
        }],
        initialValue:Ateamodds
      })(<Input />)}
    </FormItem>
    <FormItem label="赔率-B队"  {...formItemLayout}>
      {getFieldDecorator('Bteamodds',{
        rules: [{
          required: true , message: '请设置赔率'
        }],
        initialValue:Bteamodds
      })(<Input />)}
    </FormItem>
    <Divider/>
    <FormItem label="最低投注金币数"  {...formItemLayout}>
      {getFieldDecorator('quizMinCoin',{
        rules: [{
          required: true , message: '请输入最低投注金币数！',
        }],
        initialValue:quizMinCoin
      })(<Input />)}
    </FormItem>
    <FormItem label="竞猜开始时间"  {...formItemLayout}>
      {getFieldDecorator('quizTimeStart',{
        rules: [{
          required: true , message: '请输入竞猜开始时间！',
        }],
        initialValue:moment(quizTimeStart)
      })(<DatePicker
          showTime
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
        />)}
    </FormItem>
    <FormItem label="竞猜结束时间"  {...formItemLayout}>
      {getFieldDecorator('quizTimeEnd',{
        rules: [{
          required: false , message: '请输入竞猜结束时间！',
        }],
        initialValue:moment(quizTimeEnd)
      })(<DatePicker
        showTime
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
      />)}
    </FormItem>
    <FormItem style={{textAlign:'center'}}>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>确定</Button>
      <Button onClick={()=>handleReset()} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>
}
Quizdetail = Form.create()(Quizdetail);

export default  Quizdetail;



