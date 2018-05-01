/**
 * model  比赛管理
 */
import {
  queryGamelist, queryEventlist, addGame, enumTeam, putGame, delGame,
  setGamedstarttime, queryGameQuizlist, updateGame
} from '../services/win_game';
import { addQuiz, addQuizResult, delayQuizTime, stopQuiz, sendQuiz
} from '../services/win_quiz';


export default {
  namespace:'gamelist',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
    eventtype:[],
    gamequiz:[]
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
      const result = yield call(addGame,payload);
      if(callback) callback(result);
    },
    *updateGamedata({payload, callback}, {call, put}){
      const result = yield call(updateGame,payload);
      if(callback) callback(result);
    },
    *submitGamedata({payload,callback},{call}){
      const result = yield call(putGame,payload);
      if(callback) callback(result);
    },
    *deleteGamedata({payload,callback},{call}){
      const result = yield call(delGame,payload);
      if(callback) callback(result);
    },
    *delayGameStarttime({payload,callback},{call, put}){
      const result = yield call(setGamedstarttime,payload);
      if(callback) callback(result);
    },
    *addGameQuiz({payload,callback},{call, put}){
      const result = yield call(addQuiz,payload);
      if(callback) callback(result);
    },
    *sendGameQuiz({payload, callback}, {call }){
      const result = yield call(sendQuiz,payload);
      if(callback) callback(result);
    },
    *gameQuizlist({payload,callback},{call}){
      const result = yield call(queryGameQuizlist,payload);
      if(callback) callback(result);
    },
    *quizResult({payload, callback}, {call}){
      const result = yield call(addQuizResult, payload);
      if(callback) callback(result);
    },
    *quizDelaytime({payload, callback}, {call}){
      const result = yield call(delayQuizTime, payload);
      if(callback) callback(result);
    },
    *quizStop({payload, callback}, {call}){
      const result = yield call(stopQuiz, payload);
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
          pagination:action.payload.edata,
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
