/**
 * 关于登录接口
 * setLoginIn:用户登录
 *setLoginOut:用户退出
 */
import request from '../utils/request';

export async function setLoginIn(params) {
  const { username, password } = params;
  const paramsStr = `username=${username}&password=${password}&loginType=0&rememberMe=true`;
  return request('/guessing/index/login', {
    method: 'POST',
    body: paramsStr,
  });
}

export async function setRegister(params) {
  const { username, password } = params;
  const paramsStr = `username=${username}&password=${password}&registerType=0`;
  return request('/guessing/index/register', {
    method: 'POST',
    body: paramsStr,
  });
}

export async function setLoginOut() {
  return request('/guessing/index/logout', {
    method: 'POST',
    body: {},
  });
}
