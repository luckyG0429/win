/**
 * 放款订单的状态管理
 */

import { queryLoanOrder, queryUserInfoDetail } from '../services/api';

export default {
  namespace: 'userlist',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
    modal: false,
    record: {},
    userinfo: {},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUserInfoList, payload);
      yield put({
        type: 'getListdata',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *userDetailfetch({payload},{call,put}){
      const usedata= yield call(queryUserInfoDetail, payload);
      yield put({
        type: 'changeModal',
        payload: true,
      });
      yield put({
        type: 'getUserdata',
        payload: usedata,
      })
    }
  },
  reducers: {
    getListdata(state, action) {
      console.log(action.payload);
      return {
        ...state,
        data:action.payload
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeModal(state, action) {
      return {
        ...state,
        modal: action.payload,
      };
    },
    getUserdata(state, action) {
      return {
        ...state,
        userinfo: action.payload,
      };
    },
  },
};
