/**
 * 组件：列表，
 * 组件介绍：分页数据的展示，以及查询结果的展示，由组件自己控制，
 * props: url（请求链接）,clumn展示行，params(查询参数) ,其它操作（reducer）
 * state:
 *
 */
import React , { Component } from 'react';
import { Table } from 'antd';


class List extends Component {
    state={
         pagination:{
           pageSize:10,
           current:1,
         }
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        console.log(nextProps);
    }
    componentDidMount(){
      this.fetch();
    }
    fetch(params){

    }
     render(){
        var {cloumn , data} = this.props;
        return <Table cloums = {cloumn} dataSource={data} pagation={pagination}/>

     }
}

export default List;
