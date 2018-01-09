/**
 * 订单管理菜单目录 -- 所有接口请求
 */
import request from '../utils/request';

//订单管理 - 借款订单
export async function queryBorrowOrder(params){
  var { pageSize, currentPage, searchParams} = params;
  var paramsStr = `pageSize=${pageSize}&current=${currentPage}&searchParams=${searchParams}&interfaceWay=1`;
  return request('/modules/manage/borrow/borrowRepayList.htm', {
    method:'POST',
    body:paramsStr
  })
}

//订单管理 - 借款订单 - 订单详情
export async function queryBorrowOrderDetail(params){
  var { pageSize, currentPage, searchParams} = params;
  var paramsStr = `pageSize=${pageSize}&current=${currentPage}&searchParams=${searchParams}&interfaceWay=1`;
  return request('/modules/manage/borrow/borrowRepayList.htm', {
    method:'POST',
    body:paramsStr
  })
}

//订单管理 - 放款订单
export async function queryLoanOrder(params){
  var { pageSize, currentPage, searchParams} = params;
  var paramsStr = `pageSize=${pageSize}&current=${currentPage}&searchParams=${searchParams}`;
  return request('/modules/manage/borrow/borrowRepayList.htm',{
    method:'POST',
    body:paramsStr
  })
}

//订单管理 - 还款订单
export async function queryRepaymentOrder(params){
  var { pageSize, currentPage, searchParams} = params;
  var paramsStr = `pageSize=${pageSize}&current=${currentPage}&searchParams=${searchParams}`;
  return request('/modules/manage/borrow/repay/list.htm',{
    method:'POST',
    body:paramsStr
  })
}
