import moment from 'moment';
import {Modal} from "antd/lib/index";

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - (day * oneDay);

    return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}


export function timestampToDatetime(t){
  try{
    if(t.length) return t;
    var timestamp = t.length<13?t*1000:t;
  }catch(e){
    return t;
  }
    // if(t.length) return t;
    // var timestamp = t.length<13?t*1000:t;
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000

    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate()<10? ('0'+date.getDate()+ ' '):(date.getDate()+ ' ');
    let h = date.getHours()<10? ('0'+date.getHours()+ ':'): (date.getHours()+ ':');
    let m = date.getMinutes()<10? ('0'+date.getMinutes()+ ':'): (date.getMinutes()+ ':');
    let s = date.getSeconds()<10?('0'+date.getSeconds()): date.getSeconds();
    return Y+M+D+h+m+s;
}

export function datetimeToTimestamp(d){
  let dataT = new Date(d);
  return Date.parse(dataT);
}

export const gameStatus = [{
    key:1,
    name:'编辑'
  },{
    key:2,
    name:'审核中'
  },{
    key:3,
    name:'已上架'
  },{
    key:4,
    name:'已删除'
  }];

export const  quizStatus =[{
    key:1,
    name:'编辑'
  },{
    key:2,
    name:'审核中'
  },{
    key:3,
    name:'审核通过'
  },{
    key:4,
    name:'结果核查'
  },{
    key:5,
    name:'系统结算中'
  },{
    key:6,
    name:'结算完毕'
  },{
    key:7,
    name:'删除'
  }];


export function handleResult(result,msg='操作成功',OKfn,Errorfn){
  if(result.resultCode === 0){
    Modal.success({
      title: '结果反馈',
      content: msg,
      onOk(){
        if(typeof OKfn === "function"){
          OKfn()
        }
      }
    });
  }else{
    Modal.error({
      title: '结果反馈',
      content: result.resultmsg,
      onOk(){
        if(typeof Errorfn === "function"){
          Errorfn()
        }
      }
    })
  }
}

export function CountDown ( str ) {
  if(!str || str.length ===0 ) return ;
  if(str.length === 10) str = str*1000;
  let _leftTime = parseFloat ((str-Date.now()) / 1000);
  console.log(_leftTime);
  if(_leftTime<0) return '竞猜已结束';
  let days = parseFloat (_leftTime/60*60*24);
  let hours = parseFloat (_leftTime/60*60 - days*24);
  let minutes = parseFloat (_leftTime/60 - days*24*60 - hours*60);
  let secondes = parseFloat (_leftTime/60 - days*24*60 - hours*60 - minutes*60);

  hours  = setSingletoDouble (hours);
  minutes  = setSingletoDouble (minutes);
  secondes  = setSingletoDouble (secondes);

  return `${days}天 ${hours}:${minutes}:${secondes}`
}

function setSingletoDouble (n) {
  if(n<10) return '0'+n
  return n
}
