/**
 * model  竞猜管理
 */
import { queryQuizlist, queryQuiztype} from '../services/win_quiz';

export default {
  namespace:'quizlist',
  state:{
    data:{
      list:[],
      pagination:false
    },
    loading:false,
    modal:false,
    modalrecord:{},
    modallist:[],
  },
  effects:{
    *fetch({payload},{call, put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(queryQuizlist,payload);
      yield put({
        type: 'setListdata',
        payload: result
      });
      yield  put({
        type:'changeLoading',
        payload: false
      })
    },

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
          pagination:false
        }
      }
    },
    changeModal(state,action) {
      return {
        ...state,
        modal:action.payload
      }
    },
    setModalRecord(state, action){
      return {
        ...state,
        modalrecord:action.payload
      }
    },
    setModalList(state, action){
      return {
        ...state,
        modallist:action.payload
      }
    },
  }
}
