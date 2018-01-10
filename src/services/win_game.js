/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

// win+ 赛事相关 - 1.赛事类型列表
export async function queryGametypelist() {
  return request('game/listAllGameTypes');
}

// win+ 用户管理 - 1.2 创建赛事类型type
export async function createGametype(params) {
  return request('game/createGameType', {
    method: ' POST',
    body: params,
  });
}

// win+ 赛事相关 - 2.赛事列表
export async function queryGamelist(params) {
  const { pageSequence, pageSize } = params;
  const paramsStr = `pageSequence=${pageSequence}&pageSize=${pageSize}`;
  return request('guessing/game/recentlyGames', {
    method: 'POST',
    body: paramsStr,
  });
}

// win+ 赛事相关 - 2.2 创建赛事
export async function createGame(params) {
  return request('game/createGameData', {
    method: ' POST',
    body: params,
  });
}

