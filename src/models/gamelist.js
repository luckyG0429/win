/**
 * model  比赛管理
 */
import { queryGamelist, queryBorrowOrderDetail} from '../services/win_game';

export default {
  namespace:'gamelist',
  state:{
    data:{
      list:[{
        id:'201',
        gameName:'20180201上午场',
        gameTeamA:'恒大足球',
        gameTeamB:'和田君队',
        gameTimeStart:'2018-02-01 09:00',
        gameTimeEnd:'2018-02-01 12:00',
        eventclass:'足球',
        gamestatus:0,
        eventName:'中国VS韩国',
        eventId:2
      }, {
        id:'202',
        gameName:'20180201上午场',
        gameTeamA:'恒大足球',
        gameTeamB:'和田君队',
        gameTimeStart:'2018-02-01 15:00',
        gameTimeEnd:'2018-02-01 18:00',
        eventclass:'足球',
        gamestatus:1,
        eventName:'中国VS韩国',
        eventId:2
      }],
      pagination:false
    },
    loading:false,
    eventtype:[],
  },
  effects:{
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
    *modalrecordfetch({payload},{call,put}){
      yield put({
        type:'changeModal',
        payload:true,
      })
      const resultmodalrecord = yield  call(queryBorrowOrderDetail,payload);
      yield  put({
        type: 'setModalRecord',
        payload: resultmodalrecord
      })
    },
    *modallistfetch({payload},{call,put}){
      const resultmodallist = yield  call(queryBorrowOrderDetail,payload);
      yield  put({
        type: 'setModalList',
        payload: resultmodallist
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
  }
}
