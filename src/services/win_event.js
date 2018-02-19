/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

//win+ 0 赛事分类枚举
export async function enumEventtype() {
  return request('/guessing/game/listAllGameTypes');
}


//win+ 01 战队枚举

// win+  02.赛事列表
export async function queryEventlist(params) {
 const { pageSequence, pageSize, name, type } = params;
 const paramsStr = `pageSequence=${pageSequence}&pageSize=${pageSize}&type=${type}&name=${name}`;
 return request(`/guessing/game/recentlyGames?${paramsStr}`);
}

// win+  03 新增比赛
export async function createGame(params) {
  const { name, icon, description, type, startTime, endTime } = params;
  const paramsStr = `name=${name}`;
  return request('/guessing/game/createGame', {
    method: ' POST',
    body: params,
  });
}

// win+  04 修改比赛

// win+  05 删除比赛

// win+  06 发布比赛

