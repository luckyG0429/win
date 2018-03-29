import fetch from 'dva/fetch';
import { notification,Modal } from 'antd';

function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function CheckResponse(data){
  if (data.resultCode ==0 ) {
     return data;
  } else{
   var errorText = (data)=>{switch(data.resultCode){
      case 1: return '请求参数引起的错误';
      case 2: return '系统内部错误';
      case 3: return '已存在的数据引起的错误';
      case 4: return '不存在的数据引起的错误';
      case 5: return '数据不完整引起的错误';
      case 6: return '不能有效验证引起的错误';
      case 7: return '身份验证引起的错误';
      case 8: return '没有授权引起的错误';
      case 9: return '未登录引起的错误';
      case 'A': return '某种原因导致的强制下线';
      case 'B': return '钱不够引起的错误';
      default: return '发生未知错误,请联系管理员';
    }};
   const msg = errorText(data);
   //  Modal.error({
   //    title:msg
   //  })
    return {...data,resultmsg:msg};
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };


  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if(newOptions.contentType === 'files'){
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }else{
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json()).then(CheckResponse)
    .catch((error) => {
      if (error.resultCode) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
