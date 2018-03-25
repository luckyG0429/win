/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';


//win+ 0 竞猜规则枚举
export async function queryQuiztype() {
  return request('/guessing/guess/listAllGuessTypes');
}

//win+ 01 比赛的竞猜列表
export async function queryQuizlist(params) {
  return request('/guessing/quiz/quizlist');
}

//win+ 02 新增比赛竞猜
export async function addQuiz(params){
  return request('/guessing/guess/create',{
    method:'POST',
    body: params
  })
}

//win+ 03 修改竞猜


//win+ 04 删除竞猜





//win+ 00 竞猜结果审核 -- 列表
export async function queryAuditList(params){
  const {} = params;
  const paramsStr = ``
}

//win+ 05 竞猜结果审核---驳回
export async function sendReject(params){
  return request(`/guessing/quiz/reject?id=${params}`)
}

//win+ 06 竞猜结果审核---结算
export async function sendAccout(params){
  return request(`/guessing/quiz/accout?id=${params}`)
}

