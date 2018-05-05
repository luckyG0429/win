
import {createAuthorizeRole, queryAuthorizeRole, alertAuthorRole, deleteAuthorRole} from '../services/win_system';

export default {
  namespace:'systemrole',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
  },
  effects:{
    *fetch({payload},{call, put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const result = yield call(queryAuthorizeRole,payload);
      if(result.resultCode !==0) return false;
      yield put({
        type:'setListdata',
        payload: result,
      })
      yield put({
        type:'changeLoading',
        payload: false
      })
    },
    *delRole({payload, callback},{call}){
      const result = yield call(deleteAuthorRole,payload);
      if(callback) callback(result);
    },
    *addRole({payload, callback}, {call}){
      const result = yield call(createAuthorizeRole,payload);
      if(callback) callback(result);
    },
    *updataRole({payload, callback}, {call}){
      const result = yield call(alertAuthorRole,payload);
      if(callback) callback(result);
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
    }
  }
}
