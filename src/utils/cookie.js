/**
 * Created by Administrator on 2017/12/11 0011.
 */



    export function setCookie(name,value){
          var Days = 1;
          var exp = new Date();
          exp.setTime(exp.getTime() + Days*24*60*60*1000);
          document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();
    }

    export function  clearCookie(){
      console.log('清除缓存');
      document.cookie.split(';').map(item=>{
            let tempArr = item.split('=');
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(tempArr[0].trim());
            if(cval!= null)
              document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        })
    }

    export function  getCookie(name){
       let tempObj = new Object();
       document.cookie.split(';').map(item=>{
          let keyValue = item.split('=');
          let keyName = keyValue[0].trim() , valueName = keyValue[1];
          tempObj[keyName] = valueName
       });
       if(tempObj.hasOwnProperty(name)) return tempObj[name];
       return null;
    }

