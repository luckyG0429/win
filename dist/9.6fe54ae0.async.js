webpackJsonp([9],{1046:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryCurrent=t.query=void 0;var u=r(199),a=n(u),s=r(325),o=n(s),c=(t.query=function(){var e=(0,o.default)(a.default.mark(function e(){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/modules/manage/sys/sysUserInfo.htm"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryCurrent=function(){var e=(0,o.default)(a.default.mark(function e(t){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.abrupt("return",(0,f.default)("/guessing/index/watchUserInfo?username="+t));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(326)),f=n(c)},821:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=r(4),a=n(u),s=r(199),o=n(s),c=(r(201),r(1046));t.default={namespace:"user",state:{list:[],loading:!1,currentUser:{}},effects:{fetchCurrent:o.default.mark(function e(t,r){var n,u=t.payload,a=r.call,s=r.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,a(c.queryCurrent,u);case 4:return n=e.sent,e.next=7,s({type:"saveCurrentUser",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,a.default)({},e,{list:t.payload})},changeLoading:function(e,t){return(0,a.default)({},e,{loading:t.payload})},saveCurrentUser:function(e,t){return(0,a.default)({},e,{currentUser:t.payload.data})}}},e.exports=t.default}});