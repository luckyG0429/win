import { routerRedux } from 'dva/router';
import { setLoginIn , setLoginOut} from '../services/login';

export default {
  namespace: 'login',

  state: {
    status: false,
    tipMessage:''
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(setLoginIn, payload);
      console.log('response');
      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload:{
          status: response.resultCode == 200?true:false,
          ...response
        }
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if(response.resultCode == 200){
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { call, put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield call(setLoginOut);
      yield put(routerRedux.push('/user/login'));
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        status: payload.status,
        tipMessage:payload.resultData
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
