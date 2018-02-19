/**
 * win+ 系统参数配置相关
 * * */
import request from '../utils/request';


//win+ 0 赛事分类枚举
export async function queryEventtypelist() {
  return request('/guessing/game/listAllGameTypes');
}

//win+ 01 竞猜规则枚举
export async function queryQuiztypelist() {
  return request('/guessing/guess/listAllGuessTypes');
}

//win+ 02 新增赛事分类
export async function addEventtype(params) {
  return request('/guessing/game/createGameType',{
    method: 'POST',
    contentType:'files',
    body: params,
  });
}

//TODO:win+ 03 新增竞猜规则 -- 无接口
export async function addQuiztype() {
  return request('/guessing/aa/aaa');
}

//win+ 04 修改赛事的状态

