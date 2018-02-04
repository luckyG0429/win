
import request from '../utils/request'

// win+ 赛事相关 -1.创建战队
export async function createGuessging(params) {
  return request('game/createGameData', {
    method: ' POST',
    body: params,
  });
}

//win+ 01 战队列表

//win+ 02 上传战队信息


