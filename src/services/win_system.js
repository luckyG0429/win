/**
 * win+ 系统参数配置相关
 * * */
import request from '../utils/request';

////////////////////////////赛事分类的接口/////////////////////////////////////

//win+ 0 赛事分类枚举
export async function queryEventtypelist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/web/game/listGameTypes?${paramsStr}`);
}

//win+ 02 新增赛事分类
export async function createEventtype(params) {
  return request('/guessing/web/game/createGameType',{
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
  return request(`/guessing/web/authorize/listRoles?${paramsStr}`);
}

//win+ 04 创建职位 authorize/createRole
export async function createAuthorizeRole(params){
  return request('/guessing/web/authorize/createRole',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 05 修改职位 authorize/alterRole
export async function alertAuthorRole(params){
  return request('/guessing/web/authorize/alterRole',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 06 删除职位 authorize/remove
export async function deleteAuthorRole(params){
  return request('/guessing/web/authorize/removeRole?id='+params)
}




////////////////////////////资源管理的接口/////////////////////////////////////

//win+ 07 创建资源 /authorize/createResource
export async function createResource(params){
  return request('/guessing/web/authorize/createResource',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 资源修改   /authorize/alterResource
export async function alertResource(params){
  return request('/guessing/web/authorize/alterResource',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}


//win+ 资源列表 /authorize/listResources
export async function queryResourceslist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/web/authorize/listResources?${paramsStr}`);
}

//win+ 资源删除  /authorize/removeResource
export async function deleteResource(params){
  return request('/guessing/web/authorize/removeResource',{
    method:'POST',
    body:`id=${params}`
  })
}



////////////////////////////权限的接口/////////////////////////////////////

//win+ 创建权限 /authorize/createPermission
export async function createPermission(params){
  return request('/guessing/web/authorize/createPermission',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 权限修改  /authorize/alterPermission
export async function alertPermission(params){
  return request('/guessing/web/authorize/alterPermission',{
    method:'POST',
    contentType: 'json',
    body:JSON.stringify(params)
  })
}

//win+ 权限删除 /authorize/removePermission
export async function deletePermission(params){
  return request('/guessing/web/authorize/removePermission',{
    method:'POST',
    body:`id=${params}`
  })
}


//win+  权限列表  /authorize/listPermissions
export async function queryPermissionslist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/web/authorize/listPermissions?${paramsStr}`);
}

//////////////  角色配置 ///////////////

//win+  角色配置列表

//win+  角色配置添加


////////////  资讯分类配置  //////////

//win+ 资讯分类列表


//win+ 资讯分类添加


////系统的用户列表 //////
//win+ 用户列表
export async function queryUserlist(params) {
  let { pageSize, currentPage } = params;
  let paramsStr=`page=${currentPage}&pageSize=${pageSize}`;
  return request(`/guessing/web/user/listUsers?${paramsStr}`);
}

//win+ 一个用户已授权职位 /authorize/authorizedRoles?username
export async function userAuthorizedRoles(params){
  return request('/guessing/web/authorize/authorizedRoles?username='+params)
}

//win+ 一个用户未被授权的职位 /authorize/unauthorizedRoles?username
// /web/authorize/unauthorizedRoles
export async function userUnAuthorizedRoles(params){
  return request('/guessing/web/authorize/unauthorizedRoles?username='+params)
}

//win+ 给用户授权  /authorize/authorizeRoles
export async function setAauthorizeRoles(params){
  return request('/guessing/web/authorize/authorizeRoles',{
    method:'POST',
    contentType: 'json',
    body: JSON.stringify(params)
  })
}
