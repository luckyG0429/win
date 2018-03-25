/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

//win+ 0 所有赛事枚举


//win+ 01 战队枚举
export async function enumTeam(params){
  return request('/guessing/team/allocatePlayers')
}

// win+  02.比赛列表
export async function queryGamelist(params) {
 // const { pageSequence, pageSize } = params;
 // const paramsStr = `pageSequence=${pageSequence}&pageSize=${pageSize}`;
 //  return request('guessing/game/recentlyGames', {
 //    method: 'POST',
 //    body: paramsStr,
 //  });
 // return request('/guessing/game/createGame');
}

// win+  03 新增比赛
export async function createGame(params) {
  return request('/guessing/game/createGameData', {
    method: 'POST',
    body: params,
  });
}

//win+  04 编辑比赛


//win+  05 查看比赛




//win+  06 延迟比赛开赛时间
export async function  setGamedstarttime(params){
  return request(`/guessing/game/gamedatil?id=${params}`)
}




//win+  07 上架审核 --  比赛查看
export async function  getGamedetail(params){
  return request(`/guessing/game/gamedatil?id=${params}`)
}

//win+ 08 上架审核 -- 集体上架
export async function checkedGame(params){
  return request(`/guessing/game/gamepass?id=${params}`)
}

//win+ 09 上架审核 -- 集体驳回
export async function overGame(params){
  return request(`/guessing/game/gameover?id=${params}`)
}

//win 10 上架审核 -- 单个竞猜上架
export async function checkedGameguess(params){
  return request(`/guessing/game/gameguessover?id=${params}`)
}

//win 11 上架审核 -- 单个竞猜驳回
export async function overGameguess(params){
  return request(`/guessing/game/gameguessover?id=${params}`)
}
