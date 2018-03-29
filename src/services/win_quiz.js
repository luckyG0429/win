/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';


//win+ 01 比赛的竞猜列表
export async function queryQuizlist(params) {
  let { pageSize, currentPage, status,type} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=`;
  return request(`/guessing/guess/list?${paramsStr}`);
}

//win+ 02 新增比赛竞猜
export async function addQuiz(params){
  return request('/guessing/guess/create',{
    method:'POST',
    body: JSON.stringify(params)
  })
}

//win+ 03 修改竞猜


//win+ 04 删除单个竞猜
export async function delQuiz(params){
  return request(`/guessing/guess/remove?id=${params}`)
}

//win+ 042 竞猜提交
export async function submitQuiz(params){
  return request(`/guessing/guess/post?id=${params}`)
}

//win+ 041 录入竞猜结果
export async function updataQuizResult(params){
  const {id,isWinner} = params;
  return request('/guessing/guess/stop',{
    method:'POST',
    body: `id=${id}&isWinner=${isWinner}`
  })
}

//win+ 042 竞猜审核
export async function auditQuiz(params){
  const {id,pass} = params;
  return request('/guessing/guess/stop',{
    method:'POST',
    body: `id=${id}&pass=${pass}`
  })
}


//win+ 00 竞猜结果审核 -- 结果列表
export async function queryAuditList(params){
  let { pageSize, currentPage, name,type} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=4`;
  return request(`/guessing/guess/list?${paramsStr}`);
}

//win+ 05 竞猜结果审核---驳回

//win+ 06 竞猜结果审核---结算

