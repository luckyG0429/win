/**
 *  添加比赛
 */
import React from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker, Divider } from 'antd';
import EditQuizTable from '../GameQuiz/QuizTable';
import styles from './Game.less';

const FormItem = Form.Item;
const Option = Select.Option;


var Gamedetail =(props) =>{
  const { getFieldDecorator } = props.form

  const { modalType, form, handleOk, handleCancel, data, parentData, menu, btnloading} = props;
  console.log(data);
  //赛事列表
  const optionListClass = menu.length ==0 ?[]:menu.map((item)=><Option key={item} value={item.id}>{item.name}</Option>);
  const canEdit = modalType === 1;

  const optionListTeam=[];
  //const eventName=parentData.eventName;

  if(modalType ===1 && data != undefined){
    var {
      eventName,
      gameName,
      gameTeamA,
      gameTeamB,
      gameTimeStart
    } = data
  }else{
    var gameName='',
      eventName='',
    gameTeamA='',
    gameTeamB='',
    gameTimeStart='2018-01-01'
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
  return  (<Form layout="horizontal"  className={styles.modalform} style={{width:'80%',marginLeft:'10%',marginTop:'5px'}}>
    <FormItem label="比赛名称" {...formItemLayout}>
      {getFieldDecorator('gameName',{
        initialValue:gameName
      })(<Input/>)
      }
    </FormItem>
    <FormItem label="赛事名" {...formItemLayout} >
      {getFieldDecorator('eventName',{
        rules: [{
          required: true , message: '请输入赛事名！',
        }],
        initialValue:eventName
      })(<Select>
        { optionListTeam }
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
          required: true , message: '请选择战队'
        }],
        initialValue:gameTeamB
      })(<Select>
        { optionListTeam }
      </Select>)}
    </FormItem>
    <FormItem label="比赛开始时间"  {...formItemLayout}>
      {getFieldDecorator('gameTimeStart',{
        rules: [{
          required: true , message: '请输入比赛开始时间！',
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
    <Divider/>
    <EditQuizTable data={[]}/>
    <Divider style={{clear:'both'}}/>
    <FormItem style={{justifyContent:'center'}}>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>新增</Button>
      <Button onClick={()=>handleReset()} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>)
}
Gamedetail = Form.create()(Gamedetail);

export default  Gamedetail



