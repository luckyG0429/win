/**
 * model  比赛管理
 */
import { enumEventtype, queryEventlist, addEvent} from '../services/win_event';
import { queryGamelist, queryBorrowOrderDetail} from '../services/win_game';
import { routerRedux } from 'dva/router';

export default {
  namespace:'eventlist',
  state:{
    data:{
      list:[],
      pagination:false
    },
    loading:false,
    eventtype:[],
    activateEvent:{}

  },
  effects:{
    *typefetch({},{call,put}){
      const result = yield call(enumEventtype);
      yield put({
        type:'setEventtype',
        payload:result
      })
    },
    *fetch({payload},{call, put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(queryEventlist,payload);
      if(result.resultCode !== 0) return false;
      yield put({
        type: 'setListdata',
        payload: result
      });
      yield  put({
        type:'changeLoading',
        payload: false
      })
    },
    *gamefetch({payload, callback},{call, put}){
      const result = yield call(queryGamelist,payload);
      if(callback) callback(result);
    },
    *addgame({payload, callback}, {call, put}){
      const result = yield call(addEvent,payload);
      if(callback) callback(result);
    },
    *changeRouter({payload},{put}){
      yield put({
        type:'setActivateEvent',
        payload:payload
      });
      yield put(routerRedux.push('/gamelist'));
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
          pagination: action.payload.edata
        }
      }
    },
    setEventtype(state,action) {
      return {
        ...state,
        eventtype:action.payload.data
      }
    },
    setActivateEvent(state, action){
      console.log(action.payload);
      return {
        ...state,
        activateEvent:action.payload
      }
    }
  }
}
