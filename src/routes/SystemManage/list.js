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

import styles from './Servicelist.less';

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
      page:1,
      size:10,
      kgName:'',
      applyName:'',
      applyPhone:'',
      applyStartTime:'',
      applyEndTime:'',
      state:'',
    },
    modalVisible: false,
    record: {},
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

  handleConfirm=(record, type)=>{
    const obj = ((type)=>type==='stop'?{
      title:'您确定要提前结束当前的比赛竞猜吗？',
      content:'提示：一旦结束，将无法在重新开始！',
    }:{
      title:'您确定要删除当前的竞猜吗？',
      content:'提示：一旦删除，将无法恢复数据！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
    })(type);

    console.log(obj);
    return Modal.confirm({
      ...obj,
      width:'480px',
      onOk(){

      },
      onCancel(){

      }
    })
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

  renderInnertable(data){
    const {quizlist, gamestatus} = data;
    const columns = [{
      title: '竞猜开始时间',
      dataIndex: 'quizTimeStart',
    },{
      title: '竞猜规则',
      dataIndex: 'quizRules',
    },{
      title: '竞猜结束时间',
      dataIndex: 'quizTimeEnd',
    },{
      title: '战队-A队',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
          <a>{`赔率：${record.Ateamodds}`}</a>
          <hr/>
          <a>{`下注人数：${record.quizAteamJoin}`}</a>
        </div>
      }
    },{
      title: '战队-B队',
      dataIndex: '',
      render:(text,record)=>{
        return <div>
          <a>{`赔率：${record.Bteamodds}`}</a>
          <hr/>
          <a>{`下注人数：${record.quizBteamJoin}`}</a>
        </div>
      }
    },{
      title: '下注总人数',
      dataIndex: 'quizTotalJoin',
    },{
      title: '下注总金币',
      dataIndex: 'quizTotalCoin',
    },{
      title: '竞猜状态',
      dataIndex: 'quizStatus',
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(gamestatus){
          case 0: return <div>
            <a onClick={() => this.handleConfirm(record,'delete')}>删除</a>
            <Divider type='vertical'/>
            <a onClick={() => this.handleModalVisible(true,record,1)}>修改</a>
          </div>;
          case 1:return <a onClick={() => this.handleConfirm(record,'stop')}>结束</a>;
          default: return '-'
        }
      }
    }];
    return <Table dataSource={quizlist}
                  style={{background:'#fff'}}
                  bordered
                  columns={columns}
                  size="small"
                  pagination={false}
    />
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { quizlist: { data, loading } ,  dispatch } = this.props;

    const { modalVisible, record,  modaltype, btnloading} = this.state;

    const columns = [{
      // title: '比赛名称',
      // dataIndex: 'gameName',
      title: '比赛开始时间',
      dataIndex: 'gameTimeStart',
    },{
      title: '赛事名',
      dataIndex: 'eventName',
    },{
      title: '比赛战队-A',
      dataIndex: 'gameTeamA',
    },{
      title: '比赛战队-B',
      dataIndex: 'gameTeamB',
    },{
      title: '比赛结束时间',
      dataIndex: 'gameTimeEnd',
    },{
      title: '赛事类型',
      dataIndex: 'eventclass',
    },{
      title: '赛事状态',
      dataIndex: 'gamestatus',
      render:(text)=>text===0?'未发布':'已发布'
    },{
      title: '操作',
      dataIndex: '',
      render:(text,record)=>{
        switch(record.gamestatus){
          case 0:return <div>
            <a onClick={() => this.handleModalVisible(true,record,0)}>添加竞猜</a>
          </div>;
          default: return '-'
        }

      }
    }];


    const footbtn1 = [<Button type="primary" key="reset" onClick={() => this.handleModalVisible()}>返回</Button>];
    console.log(data);
    return (
      <PageHeaderLayout title="竞猜列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>


            <Table style={{marginTop:'24px'}}
              columns={ columns }
              loading={ loading }
              expandedRowRender={record=>this.renderInnertable(record)}
              dataSource={data.list}
            />



          </div>
        </Card>
        <Modal
          title={modaltype ===1?'修改':'新增'}
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}
          footer={[]}
          onCancel={() => this.handleModalVisible()}
        >
          <AddQuiz data={record}
                   modaltype={modaltype}
                   gameName="中国VS韩国"
                   gameId="1"
                   btnloading={btnloading}
                   handleOk={(type, params) => this.handleOk(type, params)}
                   handleCancel={() => this.handleModalVisible()}/>



        </Modal>
      </PageHeaderLayout>
    );
  }
}


