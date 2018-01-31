/**
 *  添加比赛
 */
import React from 'react';
import { Form, Input, Select, Button, DatePicker, Divider } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


var Quizdetail =(props) =>{
  const { getFieldDecorator } = props.form

  const { modalType, form, handleOk, handleCancel, data , menu, btnloading} = props;
  //赛事分类列表
  const optionList = menu.length ==0 ?[]:menu.map((item)=><Option key={item} value={item.id}>{item.name}</Option>);
  const canEdit = modalType === 'change';

  if(data && data != undefined){
    var {
      gameName,
      gameTeamA,
      gameTeamB,
      gameTimeStart,
      gameTimeEnd,
      eventclass
    } = data
  }else{
    var gameName='',
    gameTeamA='',
    gameTeamB='',
    gameTimeStart='',
   gameTimeEnd='',
   eventclass='';
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
        gameName:values.gameName|| undefined,
        gameTeamA:values.gameTeamA|| undefined,
        gameTeamB:values.gameTeamB|| undefined,
        gameTimeStart:values.gameTimeStart|| undefined,
        gameTimeEnd:values.gameTimeEnd|| undefined,
        eventclass:values.eventclass|| undefined,
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
  return <Form layout="vertical" style={{width:'80%',marginLeft:'10%',marginTop:'20px'}}>
    <FormItem label="比赛名称" {...formItemLayout}>
      {getFieldDecorator('gameName',{
        initialValue:gameName
      })(<Input disabled={true}/>)}
    </FormItem>
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
    <FormItem label="战队-A队" {...formItemLayout}>
      {getFieldDecorator('gameTeamA',{
        rules: [{
          required: true , message: '请选择战队！',
        }],
        initialValue:gameTeamA
      })(<Select>
        { optionListTeam }
      </Select>)}
    </FormItem>
    <FormItem label="战队-B队"  {...formItemLayout}>
      {getFieldDecorator('gameTeamB',{
        rules: [{
          required: true , message: '请设置赔率'
        }],
        initialValue:gameTeamB
      })(<Select>
        { optionListTeam }
      </Select>)}
    </FormItem>
    <FormItem label="比赛开始时间"  {...formItemLayout}>
      {getFieldDecorator('gameTimeStart',{
        rules: [{
          required: true , message: '请输入竞猜开始时间！',
        }],
        initialValue:gameTimeStart
      })(<DatePicker
        showTime
        disabledDate={disabledDate}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
      />)}
    </FormItem>
    <FormItem label="比赛结束时间"  {...formItemLayout}>
      {getFieldDecorator('gameTimeEnd',{
        rules: [{
          required: false , message: '请输入竞猜结束时间！',
        }],
        initialValue:gameTimeEnd
      })(<DatePicker
        showTime
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
      />)}
    </FormItem>
    <FormItem>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>确定</Button>
      <Button onClick={()=>handleReset()} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>
}
Quizdetail = Form.create()(Quizdetail);

export default  Quizdetail;



