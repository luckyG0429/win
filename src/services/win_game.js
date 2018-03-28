/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

//win+ 0 所有赛事枚举
export async function queryEventlist(params) {
  let paramsStr = `page=1&pageSize=100&name=&type=`;
  return request(`/guessing/game/recentlyGames?${paramsStr}`);
}


//win+ 01 战队枚举
export async function enumTeam(params){
  return request('/guessing/team/list?page=1&pageSize=1000&type=')
}

// win+  02.比赛列表
export async function queryGamelist(params) {
  let { pageSize, currentPage, name,type} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=`;
  return request(`/guessing/game/listGameData?${paramsStr}`);
}

// win+  03 新增比赛
export async function addGame(params) {
  console.log(params);
  const {gameData,gameGuesses} = params
  return request('/guessing/game/createGameData', {
    method:'POST',
    body: `gameData=${gameData}&gameGuesses=${gameGuesses}`
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
