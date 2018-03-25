/**
 * model  竞猜结果审核状态管理
 */
import { queryAuditList ,sendReject, sendAccout} from '../services/win_quiz';

export default {
  namespace:'quizauditlist',
  state:{
    loading:false,
    data:{
      list:[],
      pagination:{}
    },
  },
  effects:{
    *fetch({payload},{call, put}){
      yield put({
        type:'changeLoading',
        payload:true
      })
      const result = yield call(queryAuditList, payload);
      yield put({
        type:'setList',
        payload:result
      })
      yield put({
        type:'changeLoading',
        payload:true
      })
    },
    *checkReject({payload, callback},{ call }){
      const result = yield call(sendReject, payload);
      if(callback) callback(result);
    },
    *checkAccout({payload, callback},{ call }){
      const result = yield call(sendAccout, payload);
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
    setList(state, action){
      return {
        ...state,
        data:{
          list:action.payload.data,
          pagination:{

          }
        }
      }
    }
  }
}
