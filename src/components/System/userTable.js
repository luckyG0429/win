/**
 * 一个账户拥有/未拥有的职位
 * 拥有 -- 仅供查看
 * 未拥有 - 可以为用户添加职位
 *
 * 要求该组件需要有的功能下 ：关闭模态框，控制点击按钮， 提交时间，模态框的状态
 *
 * **/

import React,{ PureComponent} from 'react'
import { Table, Card, Button } from 'antd';

// rowSelection object indicates the need for row selection
class UserRolelist extends PureComponent {
  state={
    data:[],
    loading:false,
    roleIds:[],
  }

  componentDidMount(){
    const {record} = this.props;
    this.sendList(record)
  }

  sendList=(params)=>{
    const {dispatch , modalType} = this.props;
    let urltype = modalType === 1?"alertUserRole":"alertUserNoRole"
    this.setState({
      loading:true
    })
    dispatch({
      type:'systemuser/'+urltype,
      payload:params,
      callback:(result)=>{
        if(result.resultCode === 0){
          this.setState({
            data: result.data,
            loading: false
          })
        }else{
          this.setState({
            loading: false
          })
        }

      }
    })
  }

  handleSend=()=>{
    const {handleOk, record} = this.props;
    const { roleIds } = this.state;
    handleOk(2,{
      username: record,
      roleIds: JSON.stringify(roleIds)
    });
  }

  render(){
    const {dispatch , modalType, btnloading} = this.props;
    const {loading, data, roleIds} = this.state;
    const columns = [{
      title: '名称',
      dataIndex: 'name',
    },{
      title: '描述',
      dataIndex: 'description',
    },{
      title: '状态',
      dataIndex: 'available',
      render:text=><span>{text?'正常':'停用'}</span>
    }];

    const rowSelection =modalType===2?{
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        this.setState({
          roleIds:selectedRowKeys
        })
      },
    }:undefined;


    return <div>
      <Table columns={columns}
             dataSource={data}
             bordered
             loading={loading}
             rowSelection={rowSelection}
             rowKey={record=>record.id}
             pagination={false}
             size='small'/>

      {
        modalType === 2?<div style={{'textAlign':'right',marginTop:'20px'}}>
          <Button type='primary' onClick={()=>{return false}} disabled={!roleIds.length}
                  loading={btnloading} style={{marginRight:'20px'}}
                  onClick={()=>this.handleSend()}>授权给用户</Button>
          <Button  onClick={()=>{return false}} loading={btnloading}>返回</Button>
        </div>:''
      }

     </div>
  }

};

export default UserRolelist
