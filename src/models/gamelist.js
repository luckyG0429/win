/**
 * model  比赛管理
 */
import { queryGamelist,queryEventlist, addGame, enumTeam} from '../services/win_game';

export default {
  namespace:'gamelist',
  state:{
    data:{
      list:[],
      pagination:false
    },
    loading:false,
    eventtype:[],
  },
  effects:{
    *eventTypelist({payload},{call,put}){
      const result = yield call(queryEventlist);
      if(result.resultCode !==0) return false;
      yield put({
        type:'setEventtype',
        payload:result
      })
    },
    *teamfetch({payload,callback},{call}){
      const result = yield call(enumTeam,payload);
      if(callback) callback(result);
    },
    *fetch({payload},{call, put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(queryGamelist,payload);
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
    *addGamedata({payload, callback},{ call, put}){
      console.log('add');
      console.log(payload);
      const result = yield call(addGame,payload);
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
    setEventtype(state, action){
      return {
        ...state,
        eventtype:action.payload.data
      }
    }
  }
}
