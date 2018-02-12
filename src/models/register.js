import { setRegister } from '../services/login';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(setRegister,payload);
      if(response.resultCode === 0){
        yield put({
          type: 'registerHandle',
          payload: 'ok',
        });
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
  },

  reducers: {
    registerHandle(state,  { payload }) {
      return {
        ...state,
        status: payload,
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
