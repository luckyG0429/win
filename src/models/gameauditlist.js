/**
 * 上架审核状态管理
 一**/

import {queryCheckGamelist, setGamedstarttime,getGamedetail,sendGamescore, checkedGame, checkedGameguess, overGameguess} from '../services/win_game';

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
      const result = yield call(queryCheckGamelist,payload);
      yield put({
        type:'setListdata',
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
    *sendGameScore({payload,callback},{call}){
      const result = yield call(sendGamescore,payload);
      if(callback) callback(result);
    },
    *sendGamePass({payload,callback},{call}) {
      const result = yield call(checkedGame, payload);
      if (callback) callback(result);
    }


  },
  reducers:{
    changeLoading(state, action){
      return {
        ...state,
        loading:action.payload
      }
    },
    setListdata(state, action){
      return {
        ...state,
        data:{
          list:action.payload.data,
          pagination:action.payload.eData,
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
