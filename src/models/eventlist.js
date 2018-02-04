/**
 * model  比赛管理
 */
import { enumEventtype, queryEventlist} from '../services/win_event';
import { queryGamelist, queryBorrowOrderDetail} from '../services/win_game';

export default {
  namespace:'eventlist',
  state:{
    data:{
      list:[],
      pagination:false
    },
    loading:false,
    eventtype:[],
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
      console.log(result);
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
      console.log(action.payload);
      return {
        ...state,
        data:{
          list:action.payload.data,
          pagination:false
        }
      }
    },
    setEventtype(state,action) {
      return {
        ...state,
        eventtype:action.payload
      }
    },
  }
}
