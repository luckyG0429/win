/**
 * win+ 系统参数配置相关
 * * */
import request from '../utils/request';

////////////////////////////赛事分类的接口/////////////////////////////////////

//win+ 0 赛事分类枚举
export async function queryEventtypelist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/game/listGameTypes?${paramsStr}`);
}

//win+ 02 新增赛事分类
export async function createEventtype(params) {
  return request('/guessing/game/createGameType',{
    method: 'POST',
    contentType:'files',
    body: params,
  });
}

////////////////////////////职位管理的接口/////////////////////////////////////

//win+ 职位列表 -- authorize/listRoles
export async function queryAuthorizeRole(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/authorize/listRoles?${paramsStr}`);
}

//win+ 04 创建职位 authorize/createRole
export async function createAuthorizeRole(params){
  return request('/guessing/authorize/createRole',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 05 修改职位 authorize/alterRole
export async function alertAuthorRole(params){
  return request('/guessing/authorize/alterRole',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 06 删除职位 authorize/remove
export async function deleteAuthorRole(params){
  return request('/guessing/authorize/removeRole?id='+params)
}

//win+ 一个用户对应的职位 /authorize/authorizedRoles?username
export async function userAuthorizedRoles(params){
  return request('/guessing//authorize/authorizedRoles?username='+params)
}


////////////////////////////资源管理的接口/////////////////////////////////////

//win+ 07 创建资源 /authorize/createResource
export async function createResource(params){
  return request('/guessing/authorize/createResource',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 资源修改   /authorize/alterResource
export async function alertResource(params){
  return request('/guessing/authorize/alterResource',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}


//win+ 资源列表 /authorize/listResources
export async function queryResourceslist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/authorize/listResources?${paramsStr}`);
}

//win+ 资源删除  /authorize/removeResource
export async function deleteResource(params){
  return request('/guessing/authorize/removeResource',{
    method:'POST',
    body:`id=${params}`
  })
}



////////////////////////////权限的接口/////////////////////////////////////

//win+ 创建权限 /authorize/createPermission
export async function createPermission(params){
  return request('/guessing/authorize/createPermission',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 权限修改  /authorize/alterPermission
export async function alertPermission(params){
  return request('/guessing/authorize/alterPermission',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 权限删除 /authorize/removePermission
export async function deletePermission(params){
  return request('/guessing/authorize/removePermission',{
    method:'POST',
    body:`id=${params}`
  })
}

//win+  一个账户的权限 /authorize/authorizedRoles?username
export async function  userPermission(params) {
  return request('/guessing/authorize/authorizedRoles?username='+params);
}

//win+  权限列表  /authorize/listPermissions
export async function queryPermissionslist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/authorize/listPermissions?${paramsStr}`);
}
