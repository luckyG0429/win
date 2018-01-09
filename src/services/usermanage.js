/**
 * 用户管理菜单目录 -  所有请求接口
 */
import request from '../utils/request';

//用户管理 - 用户信息管理列表
export async function queryUserInfoList(params){
  var { pageSize, currentPage, searchParams} = params;
  var paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${searchParams}`;
  return request('/modules/manage/user/list.htm',{
    method:'POST',
    body:paramsStr
  })
}

//用户管理 - 单个用户详细信息
export async function queryUserInfoDetail(params){
  return request('/modules/manage/user/detail.htm',{
    method:'POST',
    body:params
  })
}
