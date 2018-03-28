/**
 * 上架审核状态管理
 一**/

import {queryGamelist, setGamedstarttime,getGamedetail,checkedGame, overGame, checkedGameguess, overGameguess} from '../services/win_game';

export default {
  namespace:'gameauditlist',
  state:{
    data:{
      list:[{name:'1'}],
      pagination:{}
    },
    loading:false,
    activekey:''
  },
  effects:{
    *fetch({payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const result = yield call(queryGamelist,payload);
      yield put({
        type:'setList',
        payload:result
      });
      yield put({
        type:'changeLoading',
        payload:false
      })
    },
    *showGamedetail({payload, callback},{call, put}){
      yield put({
        type:'setActiverecord',
        payload:payload.id
      });
      const result = yield call(getGamedetail,payload);
      if(callback) callback(result);
    },
    *delayGameStarttime({payload,callback},{call, put}){
      const result = yield cal(setGamedstarttime,payload);
      if(callback) callback(result);
    },



  },
  reducers:{
    changeLoading(state, action){
      return {
        ...state,
        loading:action.payload
      }
    },
    setList(state, action){
      return {
        ...state,
        list:{
          data:action.payload.data,
          pagination:{

          }
        }
      }
    },
    setActiverecord(state,action){
      return {
        ...state,
        activerecord:action.payload
      }
    }
  }
}
