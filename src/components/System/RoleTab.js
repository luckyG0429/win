/** 职位的配置
 *  列表+分页
 *  新增
 *  修改
 * **/

import React, {PureComponent, Purecomponent} from 'react';
import { Table, Button, Icon } from 'antd'

export default class RoleTab extends PureComponent {
  state={
    formValues:{
      currentPage:1,
      pageSize:10
    }
  }

  componentDidMount() {
     this.sendFetch();
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.shouldUp !== this.props.shouldUp){
  //     this.sendFetch();
  //   }
  // }

  sendFetch(params){
    const {dispatch,typeUrl} = this.props;
    const {formValues} = this.state;
    if(!params){
      params = formValues;
    }
    dispatch({
      type: 'systemlist/'+typeUrl,
      payload: params
    })
  }

  handleStandardTableChange = (pagination) => {
    const { formValues } = this.state;
    const params = {
      ...formValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.setState({
      formValues: {
        ...params,
      },
    });
    this.sendFetch(params);
  }



  render () {
    const {data:{list, pagination} ,loading, columns, styles, handleVisible, btnText, keynum} = this.props;
    console.log(loading);
    return (<div>
      <Button type='primary' ghost icon="plus" onClick={()=>handleVisible(true,keynum)}>{btnText}</Button>
      <p className={styles.tips}><Icon type="smile-o" /> 您好，以下是当前已配置好的职位列表</p>
      <Table dataSource={list} columns={columns} size="small"
             pagination={pagination}
             loading={loading}
             bordered
             rowKey={record=>record.id}
             onChange={this.handleStandardTableChange}/>
    </div>)
  }
}

