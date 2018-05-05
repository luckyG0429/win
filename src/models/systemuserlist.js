
import {queryUserlist, userAuthorizedRoles, userUnAuthorizedRoles, setAauthorizeRoles } from '../services/win_system';

export default {
  namespace:'systemuser',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
    eventType:[],
  },
  effects:{
    *fetch({payload},{call,put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(queryUserlist,payload);
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
    *addUserRole({payload,callback},{call}){
      const result =yield call(setAauthorizeRoles,payload);
      if(callback) callback(result);
    },
    *alertUserRole({payload,callback},{call}){
      const result =yield call(userAuthorizedRoles,payload);
      if(callback) callback(result);
    },
    *alertUserNoRole({payload,callback},{call}){
      const result =yield call(userUnAuthorizedRoles,payload);
      if(callback) callback(result);
    },
    *typefetch({},{call,put}){
      const result = yield call(enumEventtype);
      yield put({
        type:'setEventtype',
        payload:result.data
      })
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
    setEventtype(state, action){
      return {
        ...state,
        eventType:action.payload
      }
    }
  }
}
