/**
 * 用户列表的状态管理
 */

import { queryUserInfoList, queryUserInfoDetail } from '../services/api';

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
        payload: {
          list:JSON.parse(response.resultData),
          pagination: JSON.parse(response.page),
        },
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *userDetailfetch({payload},{call,put}){
      const userdata= yield call(queryUserInfoDetail, payload);
      yield put({
        type: 'getUserdata',
        payload: JSON.parse(userdata.resultData),
      })
      yield put({
        type: 'changeModal',
        payload: true,
      });
    }
  },
  reducers: {
    getListdata(state, action) {
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
    changeRecord(state, action) {
      return {
        ...state,
        record: action.payload,
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
