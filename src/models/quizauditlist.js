/**
 * model  竞猜结果审核状态管理
 */
import { queryAuditList ,auditQuiz } from '../services/win_quiz';

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
        payload: true
      })
      const result = yield call(queryAuditList, payload);
      yield put({
        type:'setList',
        payload: result
      })
      yield put({
        type:'changeLoading',
        payload: false
      })
    },
    *auditQuizResult({payload, callback},{ call }){
      const result = yield call(auditQuiz, payload);
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
          pagination:action.payload.data,
        }
      }
    }
  }
}
