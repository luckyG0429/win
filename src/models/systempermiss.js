
import {createPermission, alertPermission, queryPermissionslist, deletePermission,
 queryResourceslist, queryAuthorizeRole } from '../services/win_system';

export default {
  namespace:'systempermiss',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
    roleList:[],
    resourceList:[],
  },
  effects:{
    *roleListfetch({},{call,put}){
      const result = yield call(queryAuthorizeRole,{pageSize:'50', currentPage:'1'});
      if(result.resultCode !== 0) return false;
      yield put({
        type:'setRole',
        payload:result.data
      })
    },
    *resourceListfetch({},{call,put}){
      const result = yield call(queryResourceslist,{pageSize:'50', currentPage:'1'});
      if(result.resultCode !== 0) return false;
      yield put({
        type:'setResourceslist',
        payload:result.data
      })
    },
    *fetch({payload},{call,put}){
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(queryPermissionslist,payload);
      if(result.resultCode !== 0) return false;
      yield put({
        type: 'setListdata',
        payload: result
      });
      yield  put({
        type:'changeLoading',
        payload: false
      })
    },
    *addResourceParams({payload,callback},{call}){
      const result =yield call(createPermission,payload);
      if(callback) callback(result);
    },
    *alertResourceParams({payload,callback},{call}){
      const result =yield call(alertPermission,payload);
      if(callback) callback(result);
    },
    *deleteResourceParams({payload,callback},{call}){
      const result =yield call(deletePermission,payload);
      if(callback) callback(result);
    },
  },
  reducers:{
    changeLoading(state, action){
      return {
        ...state,
        loading:action.payload
      }
    },
    setListdata(state, action){
      return {
        ...state,
        data:{
          list:action.payload.data,
          pagination: action.payload.edata
        }
      }
    },
    setRole(state, action){
      return {
        ...state,
        roleList:action.payload
      }
    },
    setResourceslist(state, action){
      return {
        ...state,
        resourceList:action.payload
      }
    }
  }
}
