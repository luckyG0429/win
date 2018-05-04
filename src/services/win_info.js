import request from '../utils/request';


//win+ 资讯列表查询

export async function Querylist(params){
  const {pageSize, currentPage} = params;
  return require(`/guessing/notification/recentlyNews?pageSize=${pageSize}&page=${currentPage}`)
}

//win+ 新增资讯
export async function addInfo(params){
  return request('/guessing/notification/postNews',{
    method:'POST',
    contentType: 'file',
    body: params
  })
}


