/**
 * 比赛详情和竞猜详情，
 * props：比赛id
 *
 * 竞猜列表形式的
 *
 * **/

import React, { PureComponent } from 'react';
import {Tabs, Table,Form, Input, Button,Modal,Divider } from 'antd';
import QuziTable from './GameDetailA';
import GameForm from './GameForm'
import { datetimeToTimestamp ,gameStatus} from '../../utils/utils';

const TabPane = Tabs.TabPane;
const FormItem= Form.Item;

@Form.create()
export default class GameDetail extends PureComponent {

  state = {
    canEdit:true
  }

  handleEdit=(flag)=>{

    if(this.state.canEdit ||flag){
      this.setState({
        canEdit:flag||!this.state.canEdit
      })
    }else{
      if(flag){

      }
      this.handleOk();
    }
    this.setState({
      canEdit:!this.state.canEdit
    })
  }

  handleOk =()=>{
    const {form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      console.log(values);
      this.sendData(values);
    });
  }

  sendData(params){
    const {dispatch} = this.props;
    dispatch({
      type:"gameauditlist/sendGameScore",
      payload:params,
      callback:(result)=>{
        this.handleResult(result);
      }
    })
  }

  handleResult = (result,msg='操作成功')=>{
    if(result.resultCode === 0){
      Modal.success({
        title: '结果反馈',
        content: msg,
        onOk:()=>{this.sendList()}
      });
    }else{
      Modal.error({
        title: '结果反馈',
        content: result.resultmsg,
      })
    }
  }

  handleCheckedGame=(pass)=>{
    const {dispatch, data} = this.props;
    dispatch({
      type:"gameauditlist/sendGamePass",
      payload:{
        id:data.id,
        pass
      },
      callback:(result)=>{
        this.handleResult(result);
      }
    })
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { data, isBtn, dispatch } = this.props;
    const { canEdit } =this.state;
    return <div>
      <Tabs style={{height:'320px'}}>
        <TabPane tab="比赛详情" key="1">
          <GameForm  dispatch={dispatch} data={data} modalType={1} />
        </TabPane>
        <TabPane tab="比赛竞猜列表" key="2">
          <QuziTable dispatch={dispatch}  record={data} data={[{name:'1',status:0},{name:'1',status:1}]}/>
        </TabPane>
      </Tabs>



      <Divider/>
      <div style={{display:'block',textAlign:'center'}}>
        <p style={{display:'block',textAlign:'center'}}>当前的比赛状态：
          {
          gameStatus.filter((item)=>data.status===item.key).length!=0?gameStatus.filter((item)=>data.status===item.key)[0].name:'-'
          }</p>

        <Form layout='inline' >
          <FormItem label='' style={{width:'10px'}}>
            {
              getFieldDecorator('id',{
                initialValue:data.id,
              })(<Input style={{visibility:'hidden'}}/>)
            }
          </FormItem>
          <FormItem label='A队比分'>
            {
              getFieldDecorator('scoreA',{
                rules: [{
                  required: true , message: '请输入！',
                }],
                initialValue:data.gameTeamAScore,
              })(<Input disabled={canEdit} style={{width:'80px'}}/>)
            }
          </FormItem>
          <FormItem label='B队比分'>
            {
              getFieldDecorator('scoreB',{
                rules: [{
                  required: true , message: '请输入！',
                }],
                initialValue:data.gameTeamBScore,
              })(<Input disabled={canEdit} style={{width:'80px'}}/>)
            }
          </FormItem>
          <FormItem>
            <Button type='primary' onClick={()=>this.handleEdit()} size='small'>
              {
                canEdit?'编辑比分':'提交'
              }</Button>
             { canEdit?'':<Button style={{marginLeft:'8px'}} size='small' onClick={()=>this.handleEdit(true)}>取消</Button>}
          </FormItem>
          {
            isBtn?<span>
               <Divider/>
          <FormItem>
            <Button type='primary' onClick={()=>this.handleCheckedGame(true)}>集体上架</Button>
            <Button style={{marginLeft:'24px'}} onClick={()=>this.handleCheckedGame(false)}>全部驳回</Button>
          </FormItem>
            </span>:''
          }
        </Form>
      </div>
    </div>
  }
}




