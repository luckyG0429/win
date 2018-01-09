import request from '../utils/request';


export async function query() {
  return request('/modules/manage/sys/sysUserInfo.htm');
}

export async function queryCurrent() {
  return request('/modules/manage/sys/sysUserInfo.htm');
}
