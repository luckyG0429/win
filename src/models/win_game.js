
import { queryGamelist, createGame } from '../services/win_game';

export default {
  namespace: 'wingame',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: false,
  },

  effects: {
    *listfetch({ payload }, { call, put }) {
      yield put({
        type: 'changeloading',
        payload: true,
      });
      const result = yield call(queryGamelist, payload);
      yield put({
        type: 'getlistdata',
        payload: result,
      });
      yield put({
        type: 'changeloading',
        payload: false,
      });
    },
  },

  reducers: {
    changeloading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    getlistdata(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.data,
          pagination: action.payload.data,
        },
      };
    },
  },
};
