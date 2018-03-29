/**
 * win+ 系统参数配置相关
 * * */
import request from '../utils/request';


//win+ 0 赛事分类枚举
export async function queryEventtypelist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/game/listGameTypes?${paramsStr}`);
}

//win+ 02 新增赛事分类
export async function addEventtype(params) {
  return request('/guessing/game/createGameType',{
    method: 'POST',
    contentType:'files',
    body: params,
  });
}

//win+ 职位列表 -- authorize/listRoles
export async function queryAuthorizeRole(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/authorize/listRoles?${paramsStr}`);
}

//win+ 04 创建职位 authorize/createRole
export async function addAuthorizeRole(params){
  return request('/guessing/authorize/createRole',{
    method:'POST',
    body:JSON.stringify(params)
  })
}

//win+ 05 修改职位 authorize/alterRole
export async function updataAuthorRole(params){
  return request('/guessing/authorize/alterRole',{
    method:'POST',
    body:JSON.stringify(params)
  })
}

//win+ 06 删除职位 authorize/remove
export async function deleteAuthorRole(params){
  return request('/guessing/authorize/removeRole?id='+params)
}

