
import {Querylist, addInfo, deleteInfo} from '../services/win_info';
import {routerRedux} from "dva/router";

export default {
  namespace:'infolist',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
    gamelist:[]
  },
  effects:{
    *fetch({payload},{call,put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(Querylist,payload);
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
    *addInformation({payload,callback},{call}){
      const result = yield call(addInfo,payload)
      if(callback) callback(result);
    },
    *deleteInformation({payload,callback},{call}){
      const result = yield call(deleteInfo,payload)
      if(callback) callback(result);
    },
    *changeRouter({payload},{put}){
      yield put({
        type:'setActivateEvent',
        payload:payload
      });
      yield put(routerRedux.push('/info/edit'));
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
    setActivateEvent(state, action){
      return {
        ...state,
        eventType:action.payload
      }
    },
  }
}
