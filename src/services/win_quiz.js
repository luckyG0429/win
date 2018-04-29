/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';


//win+ 01 比赛的竞猜列表
export async function queryQuizlist(params) {
  let { pageSize, currentPage, status,type, gameDataId} = params;
  let paramsStr = `page=${currentPage}&pageSize=${pageSize}&status=`;
  return request(`/guessing/guess/list?${paramsStr}`);
}

//win+ 02 新增比赛竞猜
export async function addQuiz(params){
  return request('/guessing/guess/create',{
    method:'POST',
    contentType: 'json',
    body: JSON.stringify(params)
  })
}

//win+ 03 修改竞猜（暂无）

//win+ 04 延迟封盘
export async function delayQuizTime(params){
  const {id,endTime} = params;
  return request('/guessing/guess/alterEndTime',{
    method: 'POST',
    body: `id=${id}&endTime=${endTime}`
  })
}

//win+ 05 立即封盘 - 接口和参数
export async function stopQuiz(params){
  const {id} = params;
  return request('/guessing/guess/alterEndTime',{
    method: 'POST',
    body: `id=${id}&endTime=`
  })
}


//win+ 041 录入竞猜结果
export async function addQuizResult(params){
  const {id,isWinner} = params;
  return request('/guessing/guess/stop',{
    method:'POST',
    body: `id=${id}&isWinner=${isWinner}`
  })
}

//win+ 042 竞猜审核  guess/authorize
export async function auditQuiz(params){
  const {id,pass} = params;
  return request('/guessing/guess/authorize',{
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






