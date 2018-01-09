/**
 * 关于登录接口
 * setLoginIn:用户登录
 *setLoginOut:用户退出
 */
import request from '../utils/request';

export async function setLoginIn(params) {
  var { username, password, imgcode} = params;
  var paramsStr = `username=${username}&password=${password}&imgcode=${imgcode}`;
  return request('/system/user/login.htm',{
    method: 'POST',
    body: paramsStr,
  });
}

export async function setLoginOut() {
  return request('/system/user/logout.htm',{
    method: 'POST',
    body: {},
  });
}
