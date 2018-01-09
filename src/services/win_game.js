/**
 * win+ 赛事相关
 * **/
import request from '../utils/request'

//win+ 赛事相关 - 赛事类型列表
export async function queryGametypelist(){
  return request('index/watchUserInfo')
}

//win+ 用户管理 - 创建赛事类型type
export async function createGametype(params){
  return request('index/watchUserInfo')
}

//win+ 赛事相关 - 赛事列表
export async function queryGamelist(params){
  return request('index/watchUserInfo')
}

//win+ 赛事相关 - 创建赛事
export async function  createGame(){
  return request('index/watchUserInfo')
}

//win+ 赛事相关 -- 比赛列表
export async function  createGameData(){
  return request('index/watchUserInfo');
}
