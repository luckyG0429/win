/**
 * model  比赛管理
 */
import { enumEventtype, queryEventlist} from '../services/win_event';
import { queryGamelist, queryBorrowOrderDetail} from '../services/win_game';

export default {
  namespace:'eventlist',
  state:{
    data:{
      list:[
        {
          id:3,
          eventName:'东亚四强赛',
          eventclass:'2',
          eventclassStr:'足球',
          eventTimeStart:'2018-02-01 09:00',
          eventTimeEnd:'2018-02-05 09:00',
          eventstatus:1,
          eventstatusStr:'已发布',
        },{
        id:5,
        eventName:'2018中超联赛',
        eventclass:'2',
        eventclassStr:'足球',
        eventTimeStart:'2018-02-01 09:00',
        eventTimeEnd:'2018-02-05 09:00',
        eventstatus:0,
        eventstatusStr:'未发布',
        }
        ],
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
