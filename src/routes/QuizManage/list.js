/**
 * 额度管理审核
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs, Table } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddQuiz from '../../components/GameQuiz/AddQuiz';
import QuizList from '../../components/GameQuiz/QuizList'
import { quizStatus } from '../../utils/utils'

import styles from './quiz.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;

@connect(state => ({
  quizlist: state.quizlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
      formValues: {
        pageSize:10,
        currentPage:1,
      }, //搜索参数

    selectMenu:[{
      id:0,
      name:'全部'
    },{
      id:1,
      name:'竞猜中'
    },{
      id:2,
      name:'结果核算中'
    },{
      id:3,
      name:'系统结算中'
    },{
      id:4,
      name:'系统结算完毕'
    }],

    modalVisible: false,
    record: {},

    showdiv:false,
    modaltype:'',
    btnloading:false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'quizlist/fetch',
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
      type: 'quizlist/fetch',
      payload: params
    });
  }


  /*TODO: 弹框的显示与隐藏 - 查看用户详情 - 传递数据[userId]*/
  handleModalVisible = (flag = false,record={}, type) => {
    /** type 0为新增  1为修改**/
    const { dispatch } = this.props;
    this.setState({
      modalVisible: flag,
      record: record,
      modaltype:type,
    });
    if(type===1 && flag){
      dispatch({
        type:'quizlist/detailorder',
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
    }else if(type === 0){


    }else{

    }
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
        type: 'quizlist/fetch',
        payload: {
          page: 1,
          size: 10,
          ...jsonParams
        },
      });
    });
  }

  handleOk(type, params) {
    const { dispatch } = this.props;
    this.setState({
      btnloading: true,
    });
    if (type == 1) {
      dispatch({
        type: 'quizlist/changeorderstate',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {
            this.setState({
              btnloading: false,
              modalVisible:false,
            });
            Modal.success({
              title: '受理成功！',
              onOk() {
                dispatch({
                  type: 'quizlist/fetch',
                  payload: {
                    page:1,
                    size:10,
                    kgName:'',
                    applyName:'',
                    applyPhone:'',
                    applyStartTime:'',
                    applyEndTime:'',
                    state:'',
                  },
                });
              },
            });
          }else{
            this.setState({
              btnloading: false,
              modalVisible:false,
            });
          }

        },
      });
    } else if(type == 2) {
      dispatch({
        type: 'quizlist/senddeliveryinfo',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {
            Modal.success({
              title: '添加成功！',
              onOk() {
                dispatch({
                  type: 'quizlist/fetch',
                  payload: {
                    page:1,
                    size:10,
                    kgName:'',
                    applyName:'',
                    applyPhone:'',
                    applyStartTime:'',
                    applyEndTime:'',
                    state:'',
                  },
                });
              },
            });
          }
          this.setState({
            btnloading: false,
            modalVisible:false,
          });
        },
      });
    } else {
      dispatch({
        type: 'childuser/changechild',
        payload: params,
        callback: (result) => {
          if (result.code === 200) {

          }
          this.setState({
            btnloading: false,
            modalVisible:false,
          });
        },
      });
    }
  }


  /*TODO: 生成条件查询表单 ,参数是：渠道枚举数据 ,额度状态枚举，额度产品枚举 */
  renderAdvancedForm( ) {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="比赛名">
              {getFieldDecorator('gameName')(
                <Input placeholder="请输入"  maxLength='34' style={{ width: '80%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="赛事类别">
              {getFieldDecorator('eventClass')(
                <Select placeholder="请选择" style={{ width: '80%' }}>
                  <Option key={1} value={1}>足球</Option>
                  <Option key={2} value={0}>篮球</Option>
                  <Option key={3} value=''>LOL</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="赛事状态">
              {getFieldDecorator('state')(
                <Select placeholder="请选择" style={{ width: '80%' }}>
                  <Option key={1} value={1}>已发布</Option>
                  <Option key={2} value={0}>未发布</Option>
                  <Option key={3} value=''>全部</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </Col>
          </Row>
      </Form>
    );
  }

  timestampToTime=(timestamp) =>{
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate()<10? ('0'+date.getDate()+ ' '):(date.getDate()+ ' ');
    let h = date.getHours()<10? ('0'+date.getHours()+ ':'): (date.getHours()+ ':');
    let m = date.getMinutes()<10? ('0'+date.getMinutes()+ ':'): (date.getMinutes()+ ':');
    let s = date.getSeconds()<10?('0'+date.getMinutes()): date.getMinutes();
    return Y+M+D+h+m+s;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { quizlist: { data, loading } ,  dispatch } = this.props;

    const { modalVisible, record,  modaltype, btnloading, selectMenu, innerData, showdiv} = this.state;

    const columns = [{
      title: '赛事名',
      dataIndex: 'gameName',
    },{
      title: '比赛名称',
      dataIndex: 'gameDataName'
    },{
      title: '竞猜名',
      dataIndex: 'name'
    },{
      title: '竞猜结束时间',
      dataIndex: 'endTime',
      render:(text)=><p>{this.timestampToTime(text)}</p>
    },{
      title: '战队双方A-B',
      dataIndex: 'gameTeamAName',
      render:(text,record)=><span>{text}<b style={{color:'#FF9900'}}> VS </b>{record.gameTeamBName}</span>
    },{
      title: '总下注金额(金币体验币)',
      dataIndex: 'edata',
      render:(text,record)=><span>{text.betTBalance||0}<b>/</b>{text.betTMoney||0}</span>
    },{
      title: '竞猜状态',
      dataIndex: 'status',
      render:(text)=>quizStatus.filter((item)=>text===item.key).length?quizStatus.filter((item)=>text===item.key)[0].name:`状态码${text}`
    },{
      title: '操作',
      dataIndex: '',
      width: 160,
      render:(text,record)=>{
        switch(record.gamestatus){
          default:return <div>
            <Button  style={{color:'#FF9900',borderColor:'#FF9900'}}  size='small'  onClick={() => this.handleModalVisible(true,record,1)}>查看</Button>
            <Divider type='vertical'/>
            <a style={{color:'#6666CC'}} onClick={() => this.handleModalVisible(true,record,4)}>下注流水</a>
          </div>;
       //   default: return '-'
        }

      }
    }];

    return (
      <PageHeaderLayout title="竞猜列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleSearch}>
                <FormItem  style={{float:'right',display:'inline'}}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10,width:'140px'}}>
                  {
                    getFieldDecorator('status')(<Select  style={{ width: '140px' }} placeholder='竞猜状态选择'>
                      {
                        selectMenu.length != 0?selectMenu.map((item)=><Option key={item.id} value={item.id}>{item.name}</Option>):[]
                      }
                    </Select>)
                  }
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('gameName')(<Input placeholder='请输入比赛名称'/>)
                  }
                </FormItem>
                <FormItem style={{float:'right',display:'inline', marginRight:10}}>
                  {
                    getFieldDecorator('name')(<Input placeholder='请输入赛事名称'/>)
                  }
                </FormItem>
              </Form>
            <Table style={{marginTop:'24px'}}
              columns={ columns }
              loading={ loading }
                   bordered
              dataSource={data.list}
            />
          </div>
        </Card>
        <Modal
          title={modaltype ===1?'查看':'下注流水'}
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}
          footer={[]}
          onCancel={() => this.handleModalVisible()}
        >
          {
            modaltype === 1 ? <AddQuiz data={record}
                                      modaltype={modaltype}
                                      btnloading={btnloading}
                                      handleOk={(type, params) => this.handleOk(type, params)}
                                      handleCancel={() => this.handleModalVisible()}/> : <QuizList data={record}/>

          }


        </Modal>
      </PageHeaderLayout>
    );
  }
}


