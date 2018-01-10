
import request from '../utils/request';

// win+ 赛事相关 -1.创建竞猜
export async function createGuessging(params) {
  const { type, gameDataId } = params;
  const paramsStr = `type=${type}&gameDataId=${gameDataId}`;
  return request('guess/create', {
    method: ' POST',
    body: paramsStr,
  });
}

// win+ 赛事相关 -2.获取竞猜类型列表
export async function queryGuessgingtype() {
  return request('guess/listAllGuessTypes');
}

// win+ 赛事相关 - 3.赛事竞猜列表
export async function queryGameguessging(params) {
  return request('game/createGameData', {
    method: ' POST',
    body: params,
  });
}
