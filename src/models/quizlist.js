/**
 * model  竞猜管理
 */
import { queryQuizlist, queryQuiztype} from '../services/win_quiz';

export default {
  namespace:'quizlist',
  state:{
    data:{
      list:[{id:'201',
          gameName:'中超1轮',
          gameTeamA:'建业',
          gameTeamB:'权健',
          gameTimeStart:'2018-03-02 19:35',
          gameTimeEnd:'-',
          quizRules: '猜大小',
          eventclass:'足球',
          gamestatus:0,
          eventName:'2018中超联赛',
          eventId:2,
        quizlist:[{
  id: 1,
  gameName: '中超1轮',
  gameId: '201',
  quizRules: '猜大小',
  Ateamodds: '0.94',
  Bteamodds: '0.65',
  quizMinCoin: '100',
  quizTimeStart: '2018-01-25 09:00',
  quizTimeEnd: '2018-02-01 09:00',
  quizTotalJoin: '100231',
  quizAteamJoin: '21922',
  quizBteamJoin: '87328',
  quizTotalCoin: '10899000',
  quizAteamCoin: '4090900',
  quizBteamCoin: '5800000',
  quizStatus: 1,
}, {
  id: 3,
  gameName: '中超1轮',
  gameId: '201',
  quizRules: '胜分差',
  Ateamodds: '0.95',
  Bteamodds: '0.95',
  quizMinCoin: '50',
  quizTimeStart: '2018-01-25 09:00',
  quizTimeEnd: '2018-02-01 09:00',
  quizTotalJoin: '0',
  quizAteamJoin: '0',
  quizBteamJoin: '0',
  quizTotalCoin: '0',
  quizAteamCoin: '0',
  quizBteamCoin: '0',
  quizStatus: 0,
}]
        }, {
          id:'202',
          quizRules: '猜大小',
          gameName:'中超1轮',
          gameTeamA:'申花',
          gameTeamB:'亚泰',
          gameTimeStart:'2018-03-02 19:35',
          gameTimeEnd:'-',
          eventclass:'足球',
          gamestatus:0,
          eventName:'2018中超联赛',
          eventId:2,
        quizlist:[]
        }],
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
