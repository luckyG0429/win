/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

//win+ 0 所有赛事枚举
export async function queryEventlist(params) {
  let paramsStr = `page=1&pageSize=100`;
  return request(`/guessing/web/game/recentlyGames?${paramsStr}`);
}


//win+ 01 战队枚举
export async function enumTeam(params){
  return request('/guessing/web/team/list?page=1&pageSize=1000&type='+params)
}

// win+  02.比赛列表
export async function queryGamelist(params) {
  let { pageSize, currentPage, startTime, gameId, name} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}`;
  if(!!gameId)  paramsStr += `&gameId=${gameId}`;
  if(!!startTime) paramsStr += `&startTime=${startTime}`;
  if(!!name) paramsStr += `&name=${name}`;
  return request(`/guessing/web/game/listGameData?${paramsStr}`);
}

// win+  03 新增比赛
export async function addGame(params) {
  return request('/guessing/web/game/createGameData', {
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  });
}

//win+  04 修改比赛
export async function updateGame(params) {
  const {gameData} = params;
  return request('/guessing/web/game/alterGameData', {
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(gameData)
  });
}

//win+  05 查看比赛



//win+ 055 查看比赛的竞猜列表
export async function queryGameQuizlist(params) {
  let paramsStr = `page=${1}&pageSize=${10}&gameDataId=${params}`;
  return request(`/guessing/web/guess/list?${paramsStr}`);
}



//win+  055 提交比赛
export async function putGame(params){
  return request('/guessing/web/game/postGameData',{
    method:'POST',
    body: `id=${params}`
  });
}

//win+ 056 移除比赛
export async function delGame(params){
  return request('/guessing/web/game/removeGameData',{
    method:'POST',
    body: `id=${params}`
  });
}

//win+  06 延迟比赛开赛时间
export async function  setGamedstarttime(params){
  const {id, startTime} = params;
  return request('/guessing/web/game/alterGameDataStartTime?',{
    method:'POST',
    body:`id=${id}&startTime=${startTime}`
  })
}


// win+  0.上架比赛列表
export async function queryCheckGamelist(params) {
  let { pageSize, currentPage, name, gameId, startTime} = params;
 // let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=2&name=${name}&gameId=${gameId}&startTime=${startTime}`;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=2`;

  return request(`/guessing/web/game/listGameData?${paramsStr}`);
}

//win+  07 上架审核 --  比赛查看
export async function  getGamedetail(params){
  return request(`/guessing/web/game/gamedatil?id=${params}`)
}

//win+ 08 上架审核 -- 比赛审核
export async function checkedGame(params){
  const {id,pass} = params;
  return request('/guessing/web/game/authorizeGameData',{
    method:'POST',
    body:`id=${id}&pass=${pass}`
  })
}

//win 10 上架审核 -- 单个竞猜上架
export async function checkedGameguess(params){
  return request('/guessing/web/game/gameguessover',{
    method: 'POST',
    body:`id=${params}`
  });
}

//win 11 上架审核 -- 单个竞猜驳回
export async function overGameguess(params){
  return request(`/guessing/web/game/gameguessover`,{
    method: 'POST',
    body:`id=${params}`
  });

}

//win 12 编辑比赛的比分game/alterGameDataScore
export async function sendGamescore(params){
  const {id,scoreA,scoreB} = params;
  return request('/guessing/web/game/alterGameDataScore',{
    method:'POST',
    body:`id=${id}&scoreA=${scoreA}&scoreB=${scoreB}`
  })
}
