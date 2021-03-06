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
import {timestampToDatetime, gameStatus, handleResult, datetimeToTimestamp} from '../../utils/utils';

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
  constructor(props){
    super(props);
    this.state = {
        formValues: {
          pageSize:10,
          currentPage:1,
          gameId:props.eventlist.activateEvent.hasOwnProperty('id')?props.eventlist.activateEvent.id:'',
          startTime: '',
          name: ''
        },
        record:'',
        modalVisible:false,
        modaltype:'',
        btnloading:false,
        selectMenu:[]
      };
  }

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch({
      type:'gamelist/eventTypelist'
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'gamelist/fetch',
      payload: formValues
    });
  }

  /* TODO: 表格的分页处理 - 以及内部状态管理：表单数据[ formValues ] */
  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
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
      const {formValues} = this.state;
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
                handleResult(result,params.msg,()=>{
                  dispatch({
                    type: 'gamelist/fetch',
                    payload: formValues
                  })
                });
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

  /* TODO:条件查询 - 条件查询事件  - 内部状态管理：表单数据[ formValues ] */
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { formValues } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };

      const jsonPrams = {
        ...values,
        gameId: values.gameId||'',
        name: values.name?values.name.trim():'',
        startTime:values.startTime?datetimeToTimestamp(values.startTime.format('YYYY-MM-DD  HH:mm:ss').toString()):'',
      }

      console.log(jsonPrams);

      this.setState({
        formValues:{
          ...formValues,
          ...jsonPrams,
        },
      });
      dispatch({
        type: 'gamelist/fetch',
        payload: {
          ...formValues,
          ...jsonPrams
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
      dispatch({
        type:'gamelist/addGamedata',
        payload:params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            handleResult(result,'添加成功',()=>{this.sendList()});
          });
        }
      });
    } else {
      dispatch({
        type:'gamelist/updateGamedata',
        payload:params,
        callback:(result)=>{
          this.setState({
            btnloading:false,
            modalVisible:false,
          },()=>{
            handleResult(result,'修改成功',()=>{this.sendList()});
          });
        }
      });
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

    console.log(data);

    const columns = [{
      title: '赛事',
      dataIndex: 'gameName',
    },{
      title: '比赛名称',
      dataIndex: 'name',
    },{
      title: '比赛开始时间',
      dataIndex:'startTime',
      render:(text)=><span>{timestampToDatetime(text)}</span>
    },{
      title: '战队-A',
      dataIndex: 'gameTeamAName',
    },{
      title: '战队-B',
      dataIndex: 'gameTeamBName',
    },{
      title: '比赛状态',
      dataIndex: 'status',
      render:(text)=> gameStatus.filter((item)=>text===item.key).length !=0? gameStatus.filter((item)=>text===item.key)[0].name:`状态码${text}`
    },{
      title: '创建人',
      dataIndex: 'creator',
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.status){
          case 2: return <div>
            <Button  style={{color:'#FF9900',borderColor:'#FF9900'}}  size='small'  onClick={() => this.handleModalVisible(true,record,2)}>查看</Button>
          </div>;
          case 3: return <div>
            <Button  style={{color:'#FF9900',borderColor:'#FF9900'}}  size='small'  onClick={() => this.handleModalVisible(true,record,2)}>查看</Button>
            <Divider type='vertical'/>
            <Button  type="danger"  style={{color:'#fff',borderColor:'#FF6666',background:'#FF6666'}}  size='small' onClick={() => this.handleConfirm(record,'delete')}>删除</Button>
          </div>;
          case 1:return <div>
            <Button style={{color:'#6666CC',borderColor:'#6666CC'}}  size='small'  onClick={() => this.handleModalVisible(true,record,1)}>编辑</Button>
            <Divider type='vertical'/>
            <Button  style={{color:'#FF9900',borderColor:'#FF9900'}}  size='small'  onClick={() => this.handleModalVisible(true,record,2)}>查看</Button>
            <Divider type='vertical'/>
            <Button  style={{background:'#99CC00',borderColor:'#99CC00',color:'#fff'}} type="primary" size='small'  onClick={() => this.handleConfirm(record,'release')}>提交</Button>
            <Divider type='vertical'/>
            <Button  type="danger"  style={{color:'#fff',borderColor:'#FF6666',background:'#FF6666'}}  size='small' onClick={() => this.handleConfirm(record,'delete')}>删除</Button>
          </div>;
          default: return '-';
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
                    getFieldDecorator('name')(<Input  placeholder='请输入比赛名称'/>)
                  }
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('gameId',{
                      initialValue:activateEvent.id
                    })(<Select  style={{ width: '120px' }}>
                      <Option key={'disabled'} disabled={true}>请选择...</Option>
                      <Option value='' key={'listall-1'}>全部</Option>
                      {
                        eventtype.length!=0?eventtype.map((item)=><Option key={item.id} value={item.id}>{item.name}</Option>
                        ):[]
                      }
                    </Select>)
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
                   btnloading={btnloading}/>: <GameDetail isBtn={false}  handleVisible={() => this.handleModalVisible()} data={record} dispatch={dispatch}/>
          }
        </Modal>

      </PageHeaderLayout>
    );
  }
}


