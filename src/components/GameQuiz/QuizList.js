/** 一个自给自足的table
 * 分页，搜索，
 * **/
import React,{ PureComponent } from 'react';
import {Table, Select, Divider} from 'antd';

const Option = Select.Option;

export default class QuizList extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      formValues:{
        page:1,
        pageSize:5,
        id:props.data.id,
        //金币的类型
      },

      loading:false,
      list:[],
      pagination:{}
    }
  }

  setListFetch=(params)=>{
    const {dispatch} = this.props;
    const {formValues} = this.state;
    if(!params){
      params=formValues
    }
    this.setState({
      loading:true,
    })
    //分页请求流水
    // dispatch({
    //   type:s,
    //   payload:params
    //   callback:(result)=>{}
    // })
  }

  handlePagination =(pagination)=>{
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
    this.setListFetch(params);
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render(){
    const { data } = this.props;
    const {list, loading, pagination} = this.state;
    const columns=[{
      title:'id',
      dataIndex:'id'
    },{
      title:'用户id',
      dataIndex:''
    },{
      title:'手机号',
      dataIndex:''
    },{
      title:'下注金额',
      dataIndex:''
    },{
      title:'下注方',
      dataIndex:''
    },{
      title:'下注时间',
      dataIndex:''
    },{
      title:'是否换注',
      dataIndex:''
    },{
      title:'输赢',
      dataIndex:''
    },{
      title:'退还金额',
      dataIndex:''
    },{
      title:'状态',
      dataIndex:''
    }]

    return <div>
      <div>
        <ul>
          <li>
            <span>1</span>
            <span>2</span>
          </li>
          <li>
            <Select onChange={this.handleChange}>
              <Option key={1}>金币</Option>
              <Option key={1}>体验币</Option>
            </Select>
          </li>
        </ul>
      </div>
      <Divider/>
      <Table dataSource={list}
             columns={columns}
             pagination={pagination}
             rowKey ={(record)=>record.id}
             size='small'
             onChange={this.handlePagination}
             loading={loading} />
    </div>

  }
}
