/**
 * 上架审核列表
 * **/
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GameDetail from '../../components/Game/GameDetail';
import {datetimeToTimestamp, gameStatus, timestampToDatetime} from '../../utils/utils';

import styles from './game.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  gameauditlist: state.gameauditlist,
}))
@Form.create()
export default class AuditList extends PureComponent {
  state = {
    formValues: {
      pageSize:10,
      currentPage:1,
    },
    record:'',
    modalVisible:false,
    modaltype:'',
    btnloading:false,
  };

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'gameauditlist/eventListfetch'
    })
  }

  componentDidMount() {
    this.sendList()
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
    this.sendList(params);
  }


  sendList= (params) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    if(!params) params=formValues;
    dispatch({
      type: 'gameauditlist/fetch',
      payload: params
    })
  }



  /*弹框的显示与隐藏 - 查看用户详情 - 传递数据[userId]*/
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


  /* 条件查询 - 条件查询事件  - 内部状态管理：表单数据[ formValues ] */
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      const jsonParams = {
        gameId: values.gameId||'',
        name: values.name?values.name.trim():'',
        startTime:values.startTime?datetimeToTimestamp(values.startTime.format('YYYY-MM-DD  HH:mm:ss').toString()):'',
      }
      this.setState({
        formValues:{
          currentPage: 1,
          pageSize: 10,
          ...jsonParams
        },
      });


      this.sendList({
        currentPage: 1,
        pageSize: 10,
        ...jsonParams
      });
    });
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { gameauditlist: { data, loading, eventList } ,  dispatch } = this.props;
    const { modalVisible, modaltype, record, btnloading, selectMenu} = this.state;

    const columns = [{
      title: '赛事',
      dataIndex: 'gameName',
    },{
      title: '比赛名称',
      dataIndex: 'name',
    },{
      title: '比赛开始时间',
      dataIndex: 'startTime',
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
      render:(text,record)=><Button  style={{color:'#FF9900',borderColor:'#FF9900'}}  size='small' onClick={() => this.handleModalVisible(true,record,1)}>查看</Button>
    }];

    return (
      <PageHeaderLayout title="比赛列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
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
                      initialValue:''
                    })(<Select  style={{ width: '120px' }}>
                      <Option key={'disabled'} disabled={true}>请选择...</Option>
                      <Option value='' key={'listall-1'}>全部</Option>
                      {
                        eventList.length!=0?eventList.map((item)=><Option key={item.id} value={item.id}>{item.name}</Option>
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
              rowKey={(record)=>record.id}
              data={ data }
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title='查看'
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}

          footer={[]}
          onCancel={() => this.handleModalVisible()}
        >
          <GameDetail data={record} dispatch={dispatch} isBtn={true}/>
        </Modal>

      </PageHeaderLayout>
    );
  }
}

