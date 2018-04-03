/**
 * 比赛详情的竞猜列表
 * 功能：没有分页功能，但是可以动态添加一条新的数据
 * **/


import React,{ Component }from 'react';
import {Input, DatePicker, Select, Table, Popconfirm, Button} from 'antd';
import moment from 'moment';
import {datetimeToTimestamp, quizStatus,handleResult, timestampToDatetime, CountDown} from '../../utils/utils';

const Option = Select.Option;

const SelectCell= ({editable, value, onChange, optionlist=[]})=>(<div>
  {
    editable? <Select>
      {
        optionlist.length != 0?
          optionlist.map((item)=><Option key={item.type} valye={item.type}>item.name</Option>):[]
      }
    </Select>:value
  }
</div>);

const InputCell = ({editable, value, onChange})=>(<div>
  {
    editable?<Input value={value}  onChange={e => onChange(e.target.value)}/>:value
  }
</div>);


const SpanCell = ({record, value})=>(<div>
  <span>
    {
      handleQuizStatus(value, record)
    }
  </span>
</div>);


const TimeCell = ({editable, value, onChange})=>{
  const onChangeTime = (value, dateString)=>{
    console.log('Formatted Selected Time: ', dateString);
    onChange(dateString);
  }
  return (<div>
    {
      editable && editable!=undefined?<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  value={moment(value)} onChange={onChangeTime}/>:value
    }
  </div>)}

function handleQuizStatus (value,{ endTime }) {
  console.log('status',endTime);

  if(value !== 3)  return quizStatus.filter((item)=>value==item.key).length!=0?quizStatus.filter((item)=>value==item.key)[0].name:'-';
   console.log(CountDown(endTime));
  return CountDown(endTime)
  var d = setInterval(()=>this.CountDown(value), 1000);
  clearInterval(d);

}


const EditableCell = ({num,editable, record,value, onChange})=>{
  const me = this;
  switch(num) {
    case 'name': return <InputCell editable={editable} value={value}  onChange={onChange}/>;
    case 'type': return <SelectCell  editable={editable} value={value}  onChange={onChange}/>;
    case 'endTime': return <TimeCell  editable={editable} value={value}  onChange={onChange}/>;
    case 'status': return <SpanCell record={record}  editable={editable} value={value}/>;
    default: return <span>{value === 0 ? '未出结果' : value === 1? 'A队赢' : 'B队赢'}</span>
  }
}

// const data=[];

class EditQuizTable extends Component {
  constructor(props){
    super(props);

    this.columns = [{
      title:"竞猜名称",
      dataIndex:'name',
      render:(text,record)=>this.renderColumns(text,record,'name'),
    },{
      title:'竞猜结束时间',
      dataIndex:'endTime',
      render:(text,record)=>this.renderColumns(text,record,'endTime'),
    },{
      title:'状态',
      dataIndex:'status',
      render:(text,record)=>this.renderColumns(text,record,'status'),
    },{
      title:'竞猜结果',
      dataIndex:'isWinner',
      render:(text,record)=>this.renderColumns(text,record,'isWinner'),
    },{
      title:'操作',
      dataIndex:'',
      width:160,
      render:(text,record)=>{
        const {editable} = record;


        return (<div>
          {
            editable ? <span style={{textAlign: 'justify'}}>
                  <a style={{paddingRight: 15}} onClick={() => this.save(record.key)}>保存</a>
                  <Popconfirm title="您确定要删除吗?" onConfirm={() => this.onDelete(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
            </span> : <span>
              {
                this.handleStatus(record)
              }
              </span>
          }
        </div>)
      }
    }];

    this.state = {
      count: 2018,
      data: props.data
    };
    this.cacheData = props.data.map(item => ({ ...item }));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        num={column}
        editable={record.editable}
        value={this.handleText(column,text)}
        record = {record}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleText(type,value){
    switch(type){
      case 'endTime': return timestampToDatetime(value);
      default: return value;
    }
  }


  handleStatus(record){
    switch(record.status){
      case 1: return <span style={{textAlign: 'justify'}}>
        <a style={{paddingRight: 15}} onClick={() => this.save(record.key)}>延期封盘</a>
        <a style={{paddingRight: 15}} onClick={() => this.save(record.key)}>立即封盘</a>
      </span>;
      case 2: return '-';
      case 3: return <span style={{textAlign: 'justify'}}>
        <a style={{paddingRight: 15}} onClick={() => this.save(record.key)}>延期封盘</a>
        <a style={{paddingRight: 15}} onClick={() => this.save(record.key)}>立即封盘</a>
          <a style={{paddingRight: 15}} onClick={() => this.save(record.key)}>录入比赛结果</a>
      </span>;
      case 4: return '-';
      case 5: return '-';
      case 6: return '-';
      case 7: return '-';
      default: return  <span style={{textAlign: 'justify'}}>
        <a style={{paddingRight: 15}} onClick={() => this.onSubmit(record)}>提交</a>
        <Popconfirm title="您确定要删除吗?" onConfirm={() => this.onDelete(record.key)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    }
  }




  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      key: count,
      name: `新增竞猜 ${count}`,
      editable:true,
      type: 32,
      endTime: '2018-03-18 00:00:00',
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  }

  onDelete = (key) => {
    const dataSource = [...this.state.data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  onSubmit =(obj) => {
    console.log('submit');
    console.log(obj);
    const {endTime,name}=obj;
    // console.log('');
    const {dispatch, record} = this.props;
    dispatch({
      type:'gamelist/addGameQuiz',
      payload:{
        gameDataId:record.id,
        name,
        endTime:datetimeToTimestamp(endTime)
      },
      callback:(result)=>{
        handleResult(result);
      }
    })

  }




  render(){
    return <div>
      <Table dataSource={this.state.data}
             rowKey = {record=>record.id}
             bordered columns={this.columns} size='small' pagination={false}/>
      <Button onClick={this.handleAdd} type='primary' size='small' ghost style={{marginTop:10,float:'right',marginBottom:'5px'}}>添加竞猜</Button>
    </div>
  }
}

export default EditQuizTable


