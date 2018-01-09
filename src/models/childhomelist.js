
import {queryChildhomelist, addChilduser, resetpasChilduser, updateChilduser, deleteChilduser} from '../services/child_user'

export default  {
  namespace:'childhomelist',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false
  },
  effects:{
    *listfetch({payload}, { call, put}){
       yield put({
         type:'changeloading',
         payload:true
       })
      let result = yield call(queryChildhomelist, payload);
       yield put({
         type: 'getlistdata',
         payload:result
       })
      yield put({
        type:'changeloading',
        payload: false
      })
    },
    *adduser({payload, callback},{ call }){
      let result = yield call(addChilduser, payload);
      if(callback) callback(result);
    },
    *updateuser({payload, callback},{ call }){
      let result = yield call(updateChilduser, payload);
      if(callback) callback(result);
    },
    *resetpasuser({payload, callback},{ call }){
      let result = yield call(resetpasChilduser, payload);
      if(callback) callback(result);
    },
    *deleteuser({payload, callback},{ call }){
      let result = yield call(deleteChilduser, payload);
      if(callback) callback(result);
    }
  },
  reducers:{
    changeloading(state, action){
      return {
        ...state,
        loading: action.payload
      }
    },
    getlistdata(state, action){
      return {
        ...state,
        data:{
          list:action.payload.data,
          pagination:false
        }
      }
    }
  }
}
