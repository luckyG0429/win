/**
 * 上架审核列表
 * **/
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GameDetail from '../../components/Game/GameDetail';
import {timestampToDatetime} from '../../utils/utils';

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
    selectMenu:[]
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'gameauditlist/fetch',
      payload: formValues
    });
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
    if (type == 1) {

    } else {

    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { gameauditlist: { data, loading, eventtype } ,  dispatch } = this.props;
    const { modalVisible, modaltype, record, btnloading, selectMenu} = this.state;

    const columns = [{
      title: '赛事',
      dataIndex: 'eventname',
    },{
      title: '比赛名称',
      dataIndex: 'name',
    },{
      title: '比赛开始时间',
      dataIndex: 'startTime',
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
      render:(text,record)=> <a onClick={() => this.handleModalVisible(true,record,1)}>查看</a>
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
                    getFieldDecorator('name')(<Select  style={{ width: '120px' }}>
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
                    getFieldDecorator('name')(<Input placeholder='请输入赛事名称'/>)
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

