
import {createTeam} from '../services/win_team';
import { enumEventtype }from '../services/win_event';

export default {
  namespace:'teamlist',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
    eventType:[],
  },
  effects:{
    *addTeam({payload,callback},{call}){
      const result =yield call(createTeam,payload);
      if(callback) callback(result);
    },
    *typefetch({},{call,put}){
      const result = yield call(enumEventtype);
      yield put({
        type:'setEventtype',
        payload:result.data
      })
    }
  },
  reducers:{
    setEventtype(state, action){
      return {
        ...state,
        eventType:action.payload
      }
    }
  }
}
