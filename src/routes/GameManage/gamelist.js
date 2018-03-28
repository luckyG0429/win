/**
 * 比赛管理
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddGame from '../../components/Game/AddGame';
import GameDetail from '../../components/Game/GameDetail';
import {timestampToDatetime} from '../../utils/utils';

import styles from './game.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  eventlist:state.eventlist,
  gamelist: state.gamelist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {
      pageSize:10,
      currentPage:1,
    },
    record:'',
    modalVisible:false,
    modaltype:'',
    btnloading:false,
    selectMenu:[]
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'gamelist/fetch',
      payload: formValues
    });
    dispatch({
      type:'gamelist/eventTypelist'
    })
  }

  /* TODO: 表格的分页处理 - 以及内部状态管理：表单数据[ formValues ] */
  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      page: pagination.current,
      size: pagination.pageSize,
    };
    this.setState({
      formValues:{
        ...params
      }
    });
    dispatch({
      type: 'gamelist/fetch',
      payload: params
    });
  }


  handleConfirm = (record, type)=>{
      const {dispatch} = this.props;
      const obj = ((type)=>type==='release'?{
        title:'您确定要提交当前的比赛吗？',
        content:'提示：比赛一旦提交，其下的所有竞猜也会被审核。',
        }:{
        title:'您确定要删除当前的比赛吗？',
        content:'提示：比赛一旦删除，其下的所有竞猜将也会被删除掉！请谨慎操作',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
      })(type);

      const params = {
        url:type==='release'?'submitGamedata':'deleteGamedata',
        msg:type==='release'?'已提交成功！正在被审核，请耐心等待...':'已删除成功！',
      }

      return Modal.confirm({
        ...obj,
        width:'480px',
        onOk:()=>{
          dispatch({
            type:'gamelist/'+params.url,
            payload:record.id,
            callback:(result)=>{
              if(result.resultCode ==0){
                this.handleResult(result,params.msg);
              }
            }
          })
        },
        onCancel(){

        }
      })
  }

  /*TODO: 弹框的显示与隐藏 - 查看用户详情 - 传递数据[userId]*/
  handleModalVisible = (flag = false,record={}, type) => {
    const { dispatch } = this.props;

    this.setState({
      modalVisible: flag,
      record: record,
      modaltype:type,
    });
    if(type===1 && flag){
      dispatch({
        type:'gamelist/detailorder',
        payload:record,
        callback:(result)=>{
          console.log(result);
          if(result.code == 200){
            this.setState({
              resultlist:result.data.ordergamelist,
              tabloading:false,
            })
          }
        }
      })
    }else if(type === 2 && record){

    }else{

    }
  }

  /* TODO:条件查询 - 清空查询条件  - 内部状态管理：初始化表单数据[ formValues ] */
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {
        page:1,
        size:10,
        kgName:'',
        applyName:'',
        applyPhone:'',
        applyStartTime:'',
        applyEndTime:'',
        state:'',
      }
    });
  }

  /* TODO:条件查询 - 条件查询事件  - 内部状态管理：表单数据[ formValues ] */
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      var jsonParams = {
        kgName:values.kgName||"",
        applyName:values.applyName||"",
        applyPhone:values.applyPhone||"",
        state:values.state||'',
        applyStartTime: '',
        applyEndTime:''
    };
      if(values.createTime && values.createTime.length != 0 ){
        jsonParams.applyStartTime = values.createTime[0].format('YYYY-MM-DD').toString();
        jsonParams.applyEndTime = values.createTime[1].format('YYYY-MM-DD').toString()
      }
      this.setState({
        formValues:{
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
      dispatch({
        type: 'gamelist/fetch',
        payload: {
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
    });
  }

  handleOk(type, params) {
    //type: 0 新增 ；1 修改
    const { dispatch } = this.props;
    this.setState({
      btnloading: true,
    });
    if (type !== 1) {
      console.log('xinzheng');
      console.log(params);
      dispatch({
        type:'gamelist/addGamedata',
        payload:params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            this.handleResult(result);
          });
        }
      });

    } else {

    }
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

  sendList(){
      const { dispatch } = this.props;
      const {formValues} = this.state;
      dispatch({
        type:'gamelist/fetch',
        payload:formValues
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { gamelist: { data, loading, eventtype } , eventlist:{ activateEvent }, dispatch } = this.props;
    const { modalVisible, modaltype, record, btnloading, selectMenu} = this.state;

    const columns = [{
      title: '赛事',
      dataIndex: 'eventName',
    },{
      title: '比赛名称',
      dataIndex: 'name',
    },{
      title: '比赛开始时间',
      dataIndex:'startTime',
      render:(text)=><span>{timestampToDatetime(text)}</span>
    },{
      title: '战队-A',
      dataIndex: 'gameTeamA',
    },{
      title: '战队-B',
      dataIndex: 'gameTeamB',
    },{
      title: '比赛状态',
      dataIndex: 'gamestatus',
      render:(text)=>text===0?'未发布':'已发布'
    },{
      title: '创建人',
      dataIndex: 'person',
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.gamestatus){
          default:return <div>
            <a onClick={() => this.handleConfirm(record,'release')}>提交</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleModalVisible(true,record,1)}>编辑</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleModalVisible(true,record,2)}>查看</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleConfirm(record,'delete')}>删除</a>
          </div>;
          // default: return  <a onClick={() => this.handleModalVisible(true,record,1)}>查看</a>
        }

      }
    }];


    return (
      <PageHeaderLayout title="比赛列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                <FormItem  style={{float:'left',display:'inline'}}>
                  <Button type='primary'  ghost onClick={() => this.handleModalVisible(true,'',0)}>新增比赛</Button>
                </FormItem>
                <FormItem  style={{float:'right',display:'inline'}}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('startTime')(<DatePicker placeholder='请选择比赛开始时间'/>)
                  }
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10,width:'120px'}}>
                  {
                    getFieldDecorator('gameName')(<Select  style={{ width: '120px' }}>
                      {
                        selectMenu.length?selectMenu.map((item)=>{
                          <Option value={item.id}>{item.name}</Option>
                        }):[]
                      }
                    </Select>)
                  }
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('name',{
                      initialValue:activateEvent.name
                    })(<Input placeholder='请输入赛事名称'/>)
                  }
                </FormItem>
              </Form>
            </div>
            <StandardTable
              columns = { columns }
              loading={loading}
              data={ data }
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title={modaltype===0?'新增比赛':'比赛编辑'}
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}

          footer={[]}
          onCancel={() => this.handleModalVisible()}
        >
          {
            modaltype!=2?<AddGame modalType={modaltype}
                   handleOk={(type,params) => this.handleOk(type,params)}
                   handleCancel={() => this.handleModalVisible()}
                   data={record}
                   dispatch =  {dispatch}
                   activeObj={activateEvent}
                   menu={eventtype}
                   btnloading={btnloading}/>: <GameDetail isBtn={false} data={record} dispatch={dispatch}/>
          }
        </Modal>

      </PageHeaderLayout>
    );
  }
}


