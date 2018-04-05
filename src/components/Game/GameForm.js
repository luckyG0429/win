/**
 *  添加比赛
 */
import React, {PureComponent} from 'react';
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker, Divider } from 'antd';
import styles from './Game.less';
import { datetimeToTimestamp ,timestampToDatetime, handleResult} from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Gamedetail extends PureComponent{

  state = {
    listTeam:[],
    gameGuesses:[],
    timeEdit:true,
    startTime:timestampToDatetime(this.props.data.startTime)
  }
  disabledDate = (current)=>{
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  handleEvent=(key)=>{
    const { dispatch } = this.props;
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

  setTimeEdit=()=>{
    this.setState({
      timeEdit:!this.state.timeEdit
    })
  }

  handleStartTime=()=>{
    //发送请求
    const {dispatch, data} = this.props;
    const {startTime} = this.state;
    dispatch({
      type:'gamelist/delayGameStarttime',
      payload:{
        id:data.id,
        startTime:datetimeToTimestamp(startTime)
      },
      callback:(result)=>{
        handleResult(result,'修改成功',this.setTimeEdit,this.setTimeEdit)
      }
    })
  }



   onChange=(date, dateString)=>{
    // console.log(date, dateString);
     this.setState({
       startTime:dateString
     })
  }

  render(){
    const { getFieldDecorator } = this.props.form

    const { modalType, form,  data, activeObj, menu, btnloading} = this.props;
    const canEdit = modalType ===1;
    const {timeEdit} = this.state;

    if(modalType ===1 && data != undefined){
      var {
        name,
        gameName,
        gameTeamAName,
        gameTeamBName,
        startTime
      } = data
    }else{
      var name='',
        gameName='',
        gameTeamAName='',
        gameTeamBName='',
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
      <FormItem label="比赛名称" {...formItemLayout}>
        {getFieldDecorator('name',{
          initialValue:name
        })(<Input disabled={canEdit}/>)}
      </FormItem>
      <FormItem label="赛事名" {...formItemLayout} >
        {getFieldDecorator('gameId', {
          rules: [{
            required: true, message: '请输入赛事名！',
          }],
          initialValue: gameName,
        })(<Input disabled={canEdit}/>)}
      </FormItem>
      <FormItem label="战队-A队" {...formItemLayout}>
        {getFieldDecorator('gameTeamAId',{
          rules: [{
            required: true , message: '请选择战队！',
          }],
          initialValue:gameTeamAName
        })(<Input disabled={canEdit}/>)}
      </FormItem>
      <FormItem label="战队-B队"  {...formItemLayout}>
        {getFieldDecorator('gameTeamBId',{
          rules: [{
            required: true , message: '请选择战队'
          }],
          initialValue:gameTeamBName
        })(<Input disabled={canEdit}/>)}
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
          disabled = {timeEdit}
          onChange={this.onChange}
          style={{width:'80%'}}/>
        )}
        <span>
          {
            timeEdit?<Button size='small' disabled={data.status !== 3} type='primary' onClick={this.setTimeEdit} >推迟开赛时间</Button>:
              <Button size='small' type='primary' onClick={this.handleStartTime}>确定并提交</Button>
          }
        </span>
      </FormItem>

    </Form>)
  }
}



