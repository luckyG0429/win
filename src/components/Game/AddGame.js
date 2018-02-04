/**
 *  添加比赛
 */
import React from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


var Gamedetail =(props) =>{
  const { getFieldDecorator } = props.form

  const { modalType, form, handleOk, handleCancel, data, parentData, menu, btnloading} = props;
  //赛事分类列表
  const optionListClass = menu.length ==0 ?[]:menu.map((item)=><Option key={item} value={item.id}>{item.name}</Option>);
  const canEdit = modalType === 1;

  const optionListTeam=[];
  const eventName=parentData.eventName;

  if(modalType ===11 && data != undefined){
    var {
      gameName,
      gameTeamA,
      gameTeamB,
      gameTimeStart,
      gameTimeEnd,
    } = data
  }else{
    var gameName='',
    gameTeamA='',
    gameTeamB='',
    gameTimeStart='2018-01-01',
   gameTimeEnd='2018-01-01';
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
        gameName:values.gameName|| undefined,
        gameTeamA:values.gameTeamA|| undefined,
        gameTeamB:values.gameTeamB|| undefined,
        gameTimeStart:values.gameTimeStart|| undefined,
        gameTimeEnd:values.gameTimeEnd|| undefined,
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
    <FormItem label="比赛名称" {...formItemLayout}>
      {getFieldDecorator('gameName',{
        initialValue:gameName
      })(<Input/>)
      }
    </FormItem>
    <FormItem label="赛事名" {...formItemLayout}>
      <span>{eventName}</span>
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
        initialValue:moment(gameTimeStart)
      })(<DatePicker
        showTime
        disabledDate={disabledDate}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        style={{width:'80%'}}/>
        )}
    </FormItem>
    <FormItem label="比赛结束时间"  {...formItemLayout}>
      {getFieldDecorator('gameTimeEnd',{
        rules: [{
          required: false , message: '请输入竞猜结束时间！',
        }],
        initialValue:moment(gameTimeEnd)
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
Gamedetail = Form.create()(Gamedetail);

export default  Gamedetail



