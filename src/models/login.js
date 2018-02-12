import { routerRedux } from 'dva/router';
import { setLoginIn , setLoginOut} from '../services/login';

const userdata = {
  id:localStorage.getItem("id"),
  name:localStorage.getItem("name"),
  nickname:localStorage.getItem("nickname"),
  username:localStorage.getItem("username"),
};

export default {
  namespace: 'login',

  state: {
    status: false,
    tipMessage:'',
    userdata:{...userdata},
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(setLoginIn, payload);
      yield put({
        type: 'changeLoginStatus',
        payload:{
          status: response.resultCode == 0?true:false,
          resultmsg:response.resultmsg||'',
          ...response,
        }
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      })
    },
    *logout(_, { call, put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield call(setLoginOut);
      yield put({
        type: 'deleteLoginStatus',
      });
      yield put(routerRedux.push('/user/login'));
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      for(let x in payload.data){
        localStorage.setItem(x, payload.data[x]);
      }
      return {
        ...state,
        status: payload.status,
        tipMessage:payload.resultmsg,
        userdata:payload.data
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    deleteLoginStatus(state, { payload }) {
      for(let x in userdata){
        localStorage.removeItem(x);
      }
      return {
        ...state,
        userdata:{}
      };
    },
  },
};
