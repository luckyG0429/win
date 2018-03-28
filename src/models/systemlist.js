/**
 * model  系统参数列表
 * 这里包含的有：竞猜规则的列表，添加竞猜规则，添加赛事分类，赛事分类列表
 */
import { queryEventtypelist, addEventtype, queryQuiztypelist} from '../services/win_system';

export default {
  namespace:'systemlist',
  state:{
    eventdata:{
      list:[],
      pagination:{}
    },
    eventloading:false,
    eventtype:[],
    roledata:{
      list:[],
      pagination:{}
    },
    roleLoading:false,
  },
  effects:{
    //赛事类型列表
    *eventtypefetch({payload,callback},{call,put}){
      yield put({
        type:'changeEventLoading',
        payload:true
      });
      const result = yield call(queryEventtypelist,payload);
      if(result.resultCode !==0) return false;
      yield put({
        type:'setEventListdata',
        payload:result,
      })
      yield put({
        type:'changeEventLoading',
        payload:false
      })
    },
    *addEventtype({payload,callback},{call, put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(addEventtype,payload);
      if(callback) callback(result);
    },
    // *rolefetch({payload, callback},{call, put}){
    //   const result = yield call(queryQuiztypelist,payload);
    //   if(callback) callback(result);
    // }
  },
  reducers:{
    changeEventLoading(state, action){
      return {
        ...state,
        eventloading:action.payload
      }
    },
    setEventListdata(state, action){
      return {
        ...state,
        eventdata:{
          list:action.payload.data,
          pagination:action.payload.eData, pagination:false
        }
      }
    },
    changeRoleLoading(state, action){
      return {
        ...state,
        eventloading:action.payload
      }
    },
    setRoleListdata(state, action){
      return {
        ...state,
        roledata:{
          list:action.payload.data,
          pagination:action.payload.eData,
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
