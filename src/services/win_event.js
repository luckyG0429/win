/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

//win+ 0 赛事分类枚举
export async function enumEventtype(params) {
  return request('/module/event/eventcategory');
}


//win+ 01 战队枚举

// win+  02.赛事列表
export async function queryEventlist(params) {
 // const { pageSequence, pageSize } = params;
 // const paramsStr = `pageSequence=${pageSequence}&pageSize=${pageSize}`;
 //  return request('guessing/game/recentlyGames', {
 //    method: 'POST',
 //    body: paramsStr,
 //  });
  return request('/module/event/eventlist');
}

// win+  03 新增比赛
export async function createGame(params) {
  return request('/module/game/createGameData', {
    method: ' POST',
    body: params,
  });
}

// win+  04 修改比赛

// win+  05 删除比赛

// win+  06 发布比赛

