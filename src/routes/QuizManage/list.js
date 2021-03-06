/**
 * 额度管理审核
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Modal, Divider, Tabs, Table } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import QuizDetail from '../../components/GameQuiz/AddQuiz';
import QuizList from '../../components/GameQuiz/QuizList'
import {handleResult, quizStatus, timestampToDatetime,} from '../../utils/utils'

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

    selectMenu:quizStatus,

    modalVisible: false,
    record: {},

    showdiv:false,
    modaltype:'',
    btnloading:false,
  };

  componentDidMount() {
    this.sendList();
  }

  sendList = (params) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    if(!params) params = formValues
    dispatch({
      type: 'quizlist/fetch',
      payload: params
    });
  }



  /*TODO: 弹框的显示与隐藏 - 查看用户详情 - 传递数据[userId]*/
  handleModalVisible = (flag = false,record={}, type) => {
    /** type 0为新增  1为修改**/
    this.setState({
      modalVisible: flag,
      record: record,
      modaltype:type,
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
        ...values
      };
      this.setState({
        formValues:{
          page: 1,
          size: 10,
          ...jsonParams
        },
      });

      this.sendList({
        pageSize:10,
        currentPage:1,
        ...jsonParams
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
      type: 'quizlist/fetch',
      payload: params
    });
  }


  onApply = (id, params) => {
    const {dispatch} = this.props;
    const msg = params?"竞猜已审核通过":"竞猜已被驳回"
    dispatch({
      type:'quizlist/applyQuiz',
      payload:{
        id:id,
        pass:params
      },
      callback:(result)=>{
        handleResult(result,msg,this.sendList);
      }
    })
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
      render:(text)=><span>{timestampToDatetime(text)}</span>
    },{
      title: '战队双方A-B',
      dataIndex: 'gameTeamAName',
      render:(text,record)=><span>{text}<b style={{color:'#FF9900'}}> VS </b>{record.gameTeamBName}</span>
    },{
      title: '总下注金额(金币体验币)',
      dataIndex: 'edata',
      // render:(text,record)=>{
      //   let {betTBalance,betTMoney} = text;
      //   return <span>{betTBalance||0}<b>/</b>{betTMoney||0}</span>
      // }
    },{
      title: '竞猜状态',
      dataIndex: 'status',
      render:(text)=>quizStatus.filter((item)=>text===item.key).length?quizStatus.filter((item)=>text===item.key)[0].name:`状态码${text}`
    },{
      title: '操作',
      dataIndex: '',
      width: 160,
      render:(text,record)=>{
        switch(record.status){
          case 2: return  <span style={{textAlign: 'justify'}}>
           <a style={{paddingRight: 15}} onClick={() => this.onApply(record.id,true)}>上架</a>
           <a style={{paddingRight: 15}} onClick={() => this.onApply(record.id,false)}>驳回</a>
          </span>;
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
                        selectMenu.length != 0?selectMenu.map((item)=><Option key={item.key} value={item.key}>{item.name}</Option>):[]
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
            <StandardTable style={{marginTop:'24px'}}
                           columns={ columns }
                           loading={ loading }
                           rowKey = {record => record.id}
                           data = {data}

            />
          </div>
        </Card>
        <Modal
          title={modaltype ===1?'查看':'下注流水'}
          visible={ modalVisible }
          width={ 800 }
          style={{top:50}}
          footer={[<Button onClick={() => this.handleModalVisible()}>返回</Button>]}
          onCancel={() => this.handleModalVisible()}
        >
          {
            modaltype === 1 ? <QuizDetail data={record}
                                      modaltype={modaltype}
                                      btnloading={btnloading}
                                      handleCancel={() => this.handleModalVisible()}/> : <QuizList data={record}/>

          }


        </Modal>
      </PageHeaderLayout>
    );
  }
}


