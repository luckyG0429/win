webpackJsonp([22],{1401:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(297),u=n(r),s=a(1),o=n(s),i=a(298),c=a(1566),d={id:localStorage.getItem("id"),name:localStorage.getItem("name"),nickname:localStorage.getItem("nickname"),username:localStorage.getItem("username")};t.default={namespace:"login",state:{status:!1,tipMessage:"",userdata:(0,o.default)({},d)},effects:{accountSubmit:u.default.mark(function e(t,a){var n,r=t.payload,s=a.call,i=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i({type:"changeSubmitting",payload:!0});case 2:return e.next=4,s(c.setLoginIn,r);case 4:return n=e.sent,e.next=7,i({type:"changeLoginStatus",payload:(0,o.default)({status:0==n.resultCode,resultmsg:n.resultmsg||""},n)});case 7:return e.next=9,i({type:"changeSubmitting",payload:!1});case 9:case"end":return e.stop()}},e,this)}),logout:u.default.mark(function e(t,a){var n=a.call,r=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"changeLoginStatus",payload:{status:!1}});case 2:return e.next=4,n(c.setLoginOut);case 4:return e.next=6,r({type:"deleteLoginStatus"});case 6:return e.next=8,r(i.routerRedux.push("/user/login"));case 8:case"end":return e.stop()}},e,this)})},reducers:{changeLoginStatus:function(e,t){var a=t.payload;for(var n in a.data)localStorage.setItem(n,a.data[n]);return(0,o.default)({},e,{status:a.status,tipMessage:a.resultmsg,userdata:a.data})},changeSubmitting:function(e,t){var a=t.payload;return(0,o.default)({},e,{submitting:a})},deleteLoginStatus:function(e,t){t.payload;for(var a in d)localStorage.removeItem(a);return(0,o.default)({},e,{userdata:{}})}}},e.exports=t.default},1566:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setLoginOut=t.setRegister=t.setLoginIn=void 0;var r=a(297),u=n(r),s=a(519),o=n(s),i=(t.setLoginIn=function(){var e=(0,o.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r="username="+a+"&password="+n+"&loginType=0&rememberMe=true",e.abrupt("return",(0,c.default)("/guessing/index/login",{method:"POST",body:r}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setRegister=function(){var e=(0,o.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r="username="+a+"&password="+n+"&registerType=0",e.abrupt("return",(0,c.default)("/guessing/index/register",{method:"POST",body:r}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setLoginOut=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.default)("/guessing/index/logout",{method:"POST",body:{}}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),a(520)),c=n(i)}});