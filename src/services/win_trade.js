/**
 * win+ 交易流水
 * **/
import request from '../utils/request'

//win+ 用户管理 - 列表
export async function queryTradelist(params){
  return request('index/watchUserInfo')
}

//win+ 用户管理 - 用户详情
export async function queryUserinfo(params){
  return request('index/watchUserInfo')
}

//win+ 01 交易列表

