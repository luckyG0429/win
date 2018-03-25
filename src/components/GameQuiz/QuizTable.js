/**
 * 组件名称：可编辑的表格
 *
 * **/

import React,{ Component }from 'react';
import {Input, DatePicker, Select, Table, Popconfirm, Button} from 'antd';
import moment from 'moment';

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



const EditableCell = ({num,editable, value, onChange})=>{
  switch(num) {
    case 'name': return <InputCell editable={editable} value={value}  onChange={onChange}/>;
    case 'type': return <SelectCell  editable={editable} value={value}  onChange={onChange}/>;
    case 'endTime': return <TimeCell  editable={editable} value={value}  onChange={onChange}/>;
  }
}

const data=[];

class EditQuizTable extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.columns = [{
      title:"竞猜名称",
      dataIndex:'name',
      render:(text,record)=>this.renderColumns(text,record,'name'),
    },{
      title:'竞猜类型',
      dataIndex:'type',
      render:(text,record)=>this.renderColumns(text,record,'type'),
    },{
      title:'竞猜结束时间',
      dataIndex:'endTime',
      render:(text,record)=>this.renderColumns(text,record,'endTime'),
    },{
      title:'操作',
      dataIndex:'',
      width:120,
      render:(text,record)=>{
        const {editable} = record;
        return (<div>
          {
            editable? <span style={{textAlign:'justify'}}>
                  <a style={{paddingRight:20}} onClick={() => this.save(record.key)}>确认</a>
                  <Popconfirm title="您确定要删除吗?" onConfirm={() => this.onDelete(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>:<Popconfirm title="您确定要删除吗?" onConfirm={() => this.onDelete(record.key)}>
                 <a>删除</a>
            </Popconfirm>
          }
        </div>)
      }
    }];

    this.state = {
      count: 701,
      data
    };
    this.cacheData = data.map(item => ({ ...item }));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        num={column}
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
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
      name: `Edward ${count}`,
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

  render(){
    return <div>
      <Table dataSource={this.state.data} columns={this.columns} size='small' pagination={false}/>
      <Button onClick={this.handleAdd} type='primary' size='small' ghost style={{marginTop:10,float:'right',marginBottom:'5px'}}>添加竞猜</Button>
    </div>
  }
}

  export default EditQuizTable
