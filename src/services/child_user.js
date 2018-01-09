import request from '../utils/request'

//幼儿园列表
export async function queryChildhomelist(params){
  let {kgName, state} = params;
  let paramsStr = `kgName=${kgName}&state=${state}`;
  return request('/manage/kindergarten/findAll?',{
    method:'POST',
    body: paramsStr
  })
}

//幼儿园服务列表
export async function queryChildservicelist(params){
  let {kgName, applyName, applyPhone, applyStartTime, applyEndTime, page, size} = params;
  let paramsStr = `kgName=${kgName}&applyName=${applyName}&applyPhone=${applyPhone}&applyStartTime=${applyStartTime}&applyEndTime=${applyEndTime}&page=${page}&size=${size}`;
  return request('/manage/brandservice/searchservicelist',{
    method:'POST',
    body: paramsStr
  })
}

//幼儿园---新增用户 /manage/kindergarten/add
export async function addChilduser(params){
  let {kgName, loginName}= params;
  let paramsStr = `kgName=${kgName}&loginName=${loginName}`;
  return request('/manage/kindergarten/add',{
    method:'POST',
    body: paramsStr
  })
}

//幼儿园---修改用户
export async function updateChilduser(params){
  let {id, kgName, loginName}= params;
  let paramsStr = `id=${id}&kgName=${kgName}&loginName=${loginName}`;
  return request('/manage/kindergarten/udate',{
    method:'POST',
    body: paramsStr
  })
}

//幼儿园---删除用户
export async function deleteChilduser(params){
  let {id}= params;
  let paramsStr = `id=${id}`;
  return request('/manage/kindergarten/delete',{
    method:'POST',
    body: paramsStr
  })
}


//幼儿园--- 重置密码用户
export async function resetpasChilduser(params){
  let {id, password }= params;
  let paramsStr = `id=${id}&password=${password}`;
  return request('/manage/kindergarten/resetPwd',{
    method:'POST',
    body: paramsStr
  })
}
