import request from '../utils/request'

//win+ 用户管理 - 列表
export async function queryUserlist(params){
  return request('index/watchUserInfo')
}

//win+ 用户管理 - 用户详情
export async function queryUserinfo(params){
  return request('index/watchUserInfo')
}
