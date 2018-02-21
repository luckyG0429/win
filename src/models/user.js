import { routerRedux } from 'dva/router';
import { query as queryUsers, queryCurrent } from '../services/user';




export default {
  namespace: 'user',
  state: {
    list: [],
    loading: false,
    currentUser:{},
  },
  effects: {
    *fetchCurrent({payload}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCurrent,payload);
      if(response.resultCode === 0){
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }else{
        yield put(routerRedux.push('/user/login'));
      }

      yield put({
        type: 'changeLoading',
        payload: false,
      });

    },
    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   console.log('当前用户response');
    //   console.log(JSON.parse(response.resultData))
    //   if (response.resultCode !==  0) {
    //     yield put(routerRedux.push('/user/login'));
    //   }
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: JSON.parse(response.resultData),
    //   });
    // },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data,
      };
    },
  },
};
