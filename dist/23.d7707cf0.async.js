webpackJsonp([23],{1404:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=r(1),a=n(u),s=r(297),i=n(s),o=r(1568);t.default={namespace:"register",state:{status:void 0},effects:{submit:i.default.mark(function e(t,r){var n,u=t.payload,a=r.call,s=r.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeSubmitting",payload:!0});case 2:return e.next=4,a(o.setRegister,u);case 4:if(n=e.sent,0!==n.resultCode){e.next=8;break}return e.next=8,s({type:"registerHandle",payload:"ok"});case 8:return e.next=10,s({type:"changeSubmitting",payload:!1});case 10:case"end":return e.stop()}},e,this)})},reducers:{registerHandle:function(e,t){var r=t.payload;return(0,a.default)({},e,{status:r})},changeSubmitting:function(e,t){var r=t.payload;return(0,a.default)({},e,{submitting:r})}}},e.exports=t.default},1568:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setLoginOut=t.setRegister=t.setLoginIn=void 0;var u=r(297),a=n(u),s=r(519),i=n(s),o=(t.setLoginIn=function(){var e=(0,i.default)(a.default.mark(function e(t){var r,n,u;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.username,n=t.password,u="username="+r+"&password="+n+"&loginType=0&rememberMe=true",e.abrupt("return",(0,d.default)("/guessing/index/login",{method:"POST",body:u}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setRegister=function(){var e=(0,i.default)(a.default.mark(function e(t){var r,n,u;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.username,n=t.password,u="username="+r+"&password="+n+"&registerType=0",e.abrupt("return",(0,d.default)("/guessing/index/register",{method:"POST",body:u}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setLoginOut=function(){var e=(0,i.default)(a.default.mark(function e(){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/index/logout"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),r(520)),d=n(o)}});