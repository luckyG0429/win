import request from '../utils/request';


export async function query() {
  return request('/modules/manage/sys/sysUserInfo.htm');
}

export async function queryCurrent(params) {
  console.log(params);
  return request(`/guessing/index/watchUserInfo?username=${params}`);
}
