/**
 * model  系统参数列表
 * 这里包含的有：竞猜规则的列表，添加竞猜规则，添加赛事分类，赛事分类列表
 */
import { queryEventtypelist, addEventtype, queryQuiztypelist} from '../services/win_system';

export default {
  namespace:'systemlist',
  state:{
    data:{
      list:[],
      pagination:false
    },
    loading:false,
    eventtype:[],
  },
  effects:{
    //赛事类型列表
    *eventtypefetch({callback},{call,put}){
      const result = yield call(queryEventtypelist);
      if(callback) callback(result);
    },
    *addEventtype({payload,callback},{call, put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(addEventtype,payload);
      if(callback) callback(result);
    },
    *quizfetch({payload, callback},{call, put}){
      const result = yield call(queryQuiztypelist,payload);
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
