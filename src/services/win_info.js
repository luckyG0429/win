import request from '../utils/request';


//win+ 资讯列表查询
export async function Querylist(params){
  const {pageSize, currentPage} = params;
  return request(`/guessing/web/notification/recentlyNews?pageSize=${pageSize}&page=${currentPage}`)
}

//win+ 新增资讯
export async function addInfo(params){
  return request('/guessing/web/notification/postNews', {
    method:'POST',
    contentType: 'file',
    body: params
  })
}


//win+ 移除资讯/notification/removeNews
export async function deleteInfo(params){
  return request('/guessing/web/notification/removeNews', {
    method:'POST',
    contentType: 'file',
    body: `id=${params}`
  })
}
