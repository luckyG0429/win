
import request from '../utils/request'

// win+ 赛事相关 -1.创建战队
export async function createTeam(params) {
  return request('/guessing/team/create', {
    method: 'POST',
    contentType:'files',
    body: params,
  });
}

//win+ 01 战队列表

//win+ 02 上传战队信息


