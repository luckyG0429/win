/**
 *  添加比赛
 */
import React, {PureComponent} from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker, Divider } from 'antd';
import EditQuizTable from '../GameQuiz/QuizTable';
import styles from './Game.less';
import { datetimeToTimestamp ,timestampToDatetime} from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Gamedetail extends PureComponent{

  state = {
    listTeam:[],
    gameGuesses:[],
    eventStartstr: '-',
    eventEndstr:'-'
  }

  componentWillMount () {
    this.handleEvent()
  }
  disabledDate = (current)=>{
  // Can not select days before today and today
   return current && current < moment().endOf('day');
   }


  handleSubmit = (e) => {
  e.preventDefault();
  const {form,handleOk,modalType,data} = this.props;
  const {gameGuesses} = this.state;

  form.validateFields((err, fieldsValue) => {
    if (err) return;
    const values = {
      ...fieldsValue
    };

    var jsonParams = {
      name:values.name||'',
      gameId:values.gameId|| undefined,
      gameTeamAId:values.gameTeamAId|| undefined,
      gameTeamBId:values.gameTeamBId|| undefined,
      startTime:datetimeToTimestamp(values.startTime.format('YYYY-MM-DD  HH:mm:ss').toString())|| undefined,
    };


    if(modalType === 1){
      jsonParams.id = data.id;
    }
    console.log(jsonParams);

    var json = {
      gameData: {...jsonParams},
      gameGuesses
    };

    console.log(json);

    handleOk(modalType,json);
  });
}

  handleReset = ()=>{
  this.props.form.resetFields();
  this.props.handleCancel();
  }


  handleEvent=(key)=>{
    const { dispatch, menu } = this.props;

    if(!key){
       return false;
    }
    let _startStr = timestampToDatetime(menu.filter(item=>item.id===key)[0].startTime);
    let _endStr =timestampToDatetime(menu.filter(item=>item.id===key)[0].endTime);
    this.setState({
      eventStartstr: _startStr,
      eventEndstr: _endStr,
    })

    dispatch({
      type:'gamelist/teamfetch',
      payload:key,
      callback:(result)=>{
        if(result.resultCode ===0){
          this.setState({listTeam: result.data})
        }
      }
    })
  }

  setGussingArray(obj){
    console.log('setGussingArray');
    console.log(obj);
    let newGuess = obj.map((item)=>{
      let endtimeStr = datetimeToTimestamp(item.endTime)
      return {
        ...item,
        endTime: endtimeStr
      }
    });
    this.setState({
        gameGuesses:newGuess
    })
  }


  render(){
  const { getFieldDecorator } = this.props.form

  const { modalType, form, handleOk, handleCancel, data, activeObj, menu, btnloading} = this.props;
  const {listTeam, eventStartstr, eventEndstr} = this.state;
  //赛事列表
  const optionListEvent = menu.length ==0 ?[]:menu.map((item)=><Option key={item.id} value={item.id}>{item.name}</Option>);
  const canEdit = modalType === 1;
  const gameNameValue = modalType === 0?activeObj.name:'';

  const optionListTeam = listTeam.length ==0 ?[]:listTeam.map((item)=><Option key={item.id} value={item.id}>{item.name}</Option>);

    //const eventName=parentData.eventName;

  if(modalType ===1 && data != undefined){
    var {
      name,
      gameId,
      gameTeamAId,
      gameTeamBId,
      startTime
    } = data
  }else{
    var name='',
      gameId='',
      gameTeamAId='',
      gameTeamBId='',
      startTime='2018-01-01'
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


  return  (<Form layout="horizontal"  className={styles.modalform} style={{width:'80%',marginLeft:'10%',marginTop:'5px'}}>

    <FormItem label="赛事名" {...formItemLayout} >
      {getFieldDecorator('gameId', {
        rules: [{
          required: true, message: '请输入赛事名！',
        }],
        initialValue: gameId,
      })(<Select onChange={this.handleEvent}>
        { optionListEvent }
      </Select>)}
    </FormItem>
    <FormItem label="赛事开始时间" {...formItemLayout} >
      <span>{eventStartstr}</span>
    </FormItem>
    <FormItem label="赛事开始时间" {...formItemLayout} >
      <span>{eventEndstr}</span>
    </FormItem>
    <FormItem label="比赛名称" {...formItemLayout}>
      {getFieldDecorator('name',{
        initialValue:name
      })(<Input/>)
      }
    </FormItem>
    <FormItem label="战队-A队" {...formItemLayout}>
      {getFieldDecorator('gameTeamAId',{
        rules: [{
          required: true , message: '请选择战队！',
        }],
        initialValue:gameTeamAId
      })(<Select>
        { optionListTeam }
      </Select>)}
    </FormItem>
    <FormItem label="战队-B队"  {...formItemLayout}>
      {getFieldDecorator('gameTeamBId',{
        rules: [{
          required: true , message: '请选择战队'
        }],
        initialValue:gameTeamBId
      })(<Select>
        { optionListTeam }
      </Select>)}
    </FormItem>
    <FormItem label="比赛开始时间"  {...formItemLayout}>
      {getFieldDecorator('startTime',{
        rules: [{
          required: true , message: '请输入比赛开始时间！',
        }],
        initialValue:moment(timestampToDatetime(startTime))
      })(<DatePicker
        showTime
        disabledDate={this.disabledDate}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="Select Time"
        style={{width:'80%'}}/>
        )}
    </FormItem>
    <Divider/>
    <EditQuizTable data={[]} handleSave={(obj)=>this.setGussingArray(obj)}/>
    <Divider style={{clear:'both'}}/>
    <FormItem style={{justifyContent:'center'}}>
      <Button type="primary"  loading={ btnloading } style={{ marginRight: 16 }} onClick={(e)=>this.handleSubmit(e)}>确定</Button>
      <Button onClick={()=>this.handleReset()} style={{marginLeft:'15px'}}>取消</Button>
    </FormItem>
  </Form>)
 }
}



