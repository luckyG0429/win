/**
 * win+ 赛事相关
 * * */
import request from '../utils/request';


//win+ 0 竞猜规则枚举
export async function queryQuiztype() {
  return request('/guessing/quiz/quizrules');
}

//win+ 01 比赛的竞猜列表
export async function queryQuizlist(params) {
  return request('/guessing/quiz/quizlist');
}

//win+ 02 新增竞猜

//win+ 03 修改竞猜

//win+ 04 删除竞猜

