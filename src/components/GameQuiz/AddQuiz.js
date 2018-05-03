/**
 * 比赛 -- 竞猜详情
 */
import React from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker, Divider } from 'antd';
import {timestampToDatetime, gameStatus, handleResult, datetimeToTimestamp} from '../../utils/utils';
import styles from './Quiz.less';
const FormItem = Form.Item;
const Option = Select.Option;


const  SpanList = ({ascore, name, bscore})=>{
  console.log(ascore, name, bscore);
  return <div className={styles.linediv}>
    <span className={styles.left}>{ ascore }</span>
    <span className={styles.text}>{ name }</span>
    <span className={styles.right}>{ bscore}</span>
  </div>
}

const  LineList = ({anum, bnum})=>{
  return <div className={styles.linediv}>
    <span className={styles.ateam} style={{width:anum+'%'}}> </span>
    <span className={styles.bteam} style={{width:bnum+'%'}}> </span>
  </div>
}








var Quizdetail =(props) =>{
  const { getFieldDecorator } = props.form

  const { modaltype, form, handleOk, handleCancel, data , menu, btnloading} = props;
  //竞猜规则列表
  // const optionList = menu.length == 0?[]: menu.map((item)=><Option key={item} value={item.id}>{item.name}</Option>);
  const optionList =[];
  const canEdit = modaltype === 1;

  if(data && data != undefined){
    var {
      name,
      gameName,
      gameDataName,
      gameTeamAName,
      gameTeamBName,
      endTime,
      status,
      edata,
    } = data
  }else{
    var name,
      gameName,
      gameDataName,
      gameTeamAName,
      gameTeamBName,
      endTime= '',
      status='',
      edata='';
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
        gameTeamA:values.gameTeamA|| undefined,
        gameTeamB:values.gameTeamB|| undefined,
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


  const obj = ((data) => {
    let _arrpush = [];
    for(var k in data) {
      let _temp;
      if(k === 'betBA' || k === 'betBB'){
         _temp = {
          ascore:data.betBA || 0,
          name:'赔偿比',
          bscore:data.betBB || 0,
        }
      }else if(k === 'betTA' || k === 'betTB'){
         _temp = {
          ascore: data.betTA || 0,
          name:'下注总金额',
          bscore:data.betTB || 0
        }
      }else if(k === 'betBA' || k === 'betBB'){
        _temp = {
          ascore: data.betBA || 0,
          name:'下注人数',
          bscore: data.betTA || 0,
        }
      }
      _arrpush.push(_temp);
    }

    return _arrpush;
  })(data.edata);


  const unique  = (arr) => {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
  }

  const objArr = [{
    ascore: 0,
    name:'下注总金额',
    bscore: 0
  },{
    ascore:  0,
    name:'下注人数',
    bscore: 0

  }];

  console.log(objArr);

  return <Form layout="horizontal" className={styles.modalform}>
    <FormItem
      {...formItemLayout}
      label="赛事名"
    >
      <span className="ant-form-text">{`${gameName}——${gameDataName}`}</span>
    </FormItem>
    <FormItem label="竞猜名称" {...formItemLayout}>
      {getFieldDecorator('name',{
        rules: [{
          required: true , message: '请选择竞猜规则！',
        }],
        initialValue: name
      })(<Input disabled={canEdit} style={{width:'50%'}}/>)}
    </FormItem>
    <FormItem label="竞猜结束时间"  {...formItemLayout}>
      {getFieldDecorator('quizTimeEnd',{
        rules: [{
          required: false , message: '请输入竞猜结束时间！',
        }],
        initialValue:moment(timestampToDatetime(endTime))
      })(<DatePicker
        showTime
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        disabled={canEdit}
        style={{width:'50%'}}/>)}
    </FormItem>
    <Divider>战队双方</Divider>
    <FormItem label="战队A"  {...formItemLayout} style={{display:'inline-block',width:'50%'}}>
      {getFieldDecorator('gameTeamA',{
        rules: [{
          required: true , message: '请设置赔率'
        }],
        initialValue:gameTeamAName
      })(<Input  disabled={canEdit}/>)}
    </FormItem>
    <FormItem label="战队B"  {...formItemLayout} style={{display:'inline-block',width:'50%'}}>
      {getFieldDecorator('gameTeamB',{
        rules: [{
          required: true , message: '请设置赔率'
        }],
        initialValue:gameTeamBName
      })(<Input  disabled={canEdit}/>)}
    </FormItem>
    <LineList anum={50} bnum={50}/>
    {
      status?objArr.map((item,index)=><SpanList key={index} {...obj}/>):'-'
    }

    {/*<FormItem style={{textAlign:'right'}}>*/}
     {/*<Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>handleSubmit(e)}>确定</Button>*/}
      {/*<Button onClick={()=>handleReset()} style={{marginLeft:'15px'}}>返回</Button>*/}
    {/*</FormItem>*/}
  </Form>
}
Quizdetail = Form.create()(Quizdetail);

export default  Quizdetail;



