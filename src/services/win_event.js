/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';

//win+ 0 赛事分类枚举
export async function enumEventtype() {
  return request('/guessing/game/listGameTypes');
}


//win+ 01

// win+  02.赛事列表
export async function queryEventlist(params) {
  let { pageSize, currentPage, name,type} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&name=${name}&type=${type}`;
  return request(`/guessing/game/recentlyGames?${paramsStr}`);
}

// win+  03 新增赛事
export async function addEvent(params) {
  console.log(params);
  const {name, type, startTime, endTime} = params;
  const paramsStr = `name=${name}&type=${type}&startTime=${startTime}&endTime=${endTime}`;
  return request('/guessing/game/createGame', {
    method:'POST',
    body: paramsStr
  });
}

// win+  04 修改赛事

// win+  05 删除赛事

// win+  06 发布赛事

