/**
 * 比赛详情的竞猜列表
 * 功能：没有分页功能，但是可以动态添加一条新的数据
 * **/


import React,{ Component }from 'react';
import {Input, DatePicker, Select, Table, Popconfirm, Button, Modal} from 'antd';
import moment from 'moment';
import {datetimeToTimestamp, quizStatus,handleResult, timestampToDatetime, CountDown} from '../../utils/utils';

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
      editable && editable!=undefined?<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  defaultValue={moment('2018/01/01 00:00:00')}  value={moment(value)} onChange={onChangeTime}/>:value
    }
  </div>)}

function handleQuizStatus (value,{ endTime }) {
  console.log('status',endTime);

  if(value !== 3)  return quizStatus.filter((item)=>value==item.key).length!=0?quizStatus.filter((item)=>value==item.key)[0].name:'-';
  return CountDown(endTime)
  var d = setInterval(()=>this.CountDown(value), 1000);
  clearInterval(d);

}


const EditableCell = ({num,editable, record,value, onChange})=>{
  const me = this;
  switch(num) {
    case 'name': return <InputCell editable={editable} value={value}  onChange={onChange}/>;
    case 'endTime': return <TimeCell  editable={editable} value={value}  onChange={onChange}/>;
    case 'status': return <SpanCell record={record}  editable={editable} value={value}/>;
    default: return <span>{value === 0 ? '未出结果' : value === 1? 'A队赢' :value === 2? 'B队赢':'-'}</span>
  }
}

// const data=[];

class EditQuizTable extends Component {
  constructor(props){
    super(props);
   console.log(props.list)
    this.columns = [{
      title:"竞猜名称",
      dataIndex:'name',
      width:80,
      render:(text,record)=>this.renderColumns(text,record,'name'),
    },{
      title:'竞猜结束时间',
      dataIndex:'endTime',
      width:120,
      render:(text,record)=>this.renderColumns(text,record,'endTime'),
    },{
      title:'状态',
      dataIndex:'status',
      width:100,
      render:(text,record)=>this.renderColumns(text,record,'status'),
    },{
      title:'竞猜结果',
      dataIndex:'isWinner',
      width:80,
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
                  <a style={{paddingRight: 15}} onClick={() => this.onSave(record.key)}>保存</a>
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
      data: props.data,
      modalVisible: false,
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
    const _dataLong = Date.now();
    if(!record.hasOwnProperty('status')) {
      return <span style={{textAlign: 'justify'}}>
        <a style={{paddingRight: 15}} onClick={() => this.onSave(record)}>提交</a>
        <a style={{paddingRight: 15}} onClick={() => this.onDelete(record.key)}>删除</a>
      </span>;
    }
    if(record.status == 1) {
      return <span style={{textAlign: 'justify'}}>
               <a style={{paddingRight: 15}} onClick={() => this.onSubmit(record)}>提交</a>
        <a style={{paddingRight: 15}} onClick={() => this.onDelete(record.key)}>删除</a>
      </span>;
    }
    if(record.status !=3) return '-';
    if(_dataLong >record.endTime) {
      return <a style={{paddingRight: 15}} onClick={() => this.onGuessresult(record.key)}>录入比赛结果</a>;
    }else if(_dataLong <= record.endTime) {
      return <span style={{textAlign: 'justify'}}>
        <a style={{paddingRight: 15}} onClick={() => this.delayStop(record.key)}>延期封盘</a>
        <a style={{paddingRight: 15}} onClick={() => this.inimitableStop(record.key)}>立即封盘</a>
      </span>;
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




  //新增单个竞猜的删除操作
  onDelete = (key) => {
    const dataSource = [...this.state.data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  //新增单个竞猜的保存操作
  onSave(key) {
    const {dispatch, record, handlelist} = this.props;
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
      const {endTime,name}= target;
      // console.log('保存');
      dispatch({
        type:'gamelist/addGameQuiz',
        payload:{
          gameDataId:record.id,
          name,
          endTime:datetimeToTimestamp(endTime)
        },
        callback:(result)=>{
          handleResult(result,"添加成功",handlelist);
        }
      })
    }
  }

  //新增单个竞猜的提交操作
  onSubmit =(obj) => {
    const {dispatch, handlelist} = this.props;
    alert("yao ti jiao")
    dispatch({
      type:'gamelist/sendGameQuiz',
      payload:obj.id,
      callback:(result)=>{
        handleResult(result,"提交申请成功",handlelist);
      }
    })

  }

  //单个竞猜的立即封盘操作
  inimitableStop = (key) =>{}

  //单个竞猜的延期封盘操作
  delayStop = (key)=>{
    Modal.confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  //单个竞猜的结果录入
  onGuessresult = ()=>{
    alert('result is no work')
    console.log(1);
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
    this.setState({
      data:nextProps.data
    })
  }


  render(){
    return <div>
      <Table dataSource={this.state.data}
             rowKey = {record=>record.id}
             scroll={{ x: false, y: 150 }}
             bordered columns={this.columns} size='small' pagination={false}/>
      <Button onClick={this.handleAdd} type='primary' size='small' ghost style={{marginTop:10,float:'right',marginBottom:'5px'}}>添加竞猜</Button>
    </div>
  }
}

export default EditQuizTable


