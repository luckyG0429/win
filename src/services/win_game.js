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
    body:JSON.stringify(params)
  });
}

//win+  04 修改比赛
export async function updateGame(params) {
  return request('/guessing/game/alterGameData', {
    method:'POST',
    body:JSON.stringify(params)
  });
}

//win+  05 查看比赛


//win+  055 提交比赛
export async function putGame(params){
  return request('/guessing/game/postGameData?id='+params);
}

//win+ 056 移除比赛
export async function delGame(params){
  return request('/guessing/game/removeGameData?id='+params);
}

//win+  06 延迟比赛开赛时间
export async function  setGamedstarttime(params){
  const {id, startTime} = params;
  return request('/guessing/game/alterGameDataStartTime?',{
    method:'POST',
    body:`id=${id}&startTime=${startTime}`
  })
}


// win+  0.上架比赛列表
export async function queryCheckGamelist(params) {
  let { pageSize, currentPage, name,type} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=2`;
  return request(`/guessing/game/listGameData?${paramsStr}`);
}

//win+  07 上架审核 --  比赛查看
export async function  getGamedetail(params){
  return request(`/guessing/game/gamedatil?id=${params}`)
}

//win+ 08 上架审核 -- 比赛审核
export async function checkedGame(params){
  const {id,pass} = params;
  return request('/guessing/game/authorizeGameData',{
    method:'POST',
    body:`id=${id}&pass=${pass}`
  })
}

//win 10 上架审核 -- 单个竞猜上架
export async function checkedGameguess(params){
  return request(`/guessing/game/gameguessover?id=${params}`)
}

//win 11 上架审核 -- 单个竞猜驳回
export async function overGameguess(params){
  return request(`/guessing/game/gameguessover?id=${params}`)
}

//win 12 编辑比赛的比分game/alterGameDataScore
export async function sendGamescore(params){
  const {id,scoreA,scoreB} = params;
  return request('/guessing/game/alterGameDataScore',{
    method:'POST',
    body:`id=${id}&scoreA=${scoreA}&scoreB=${scoreB}`
  })
}
