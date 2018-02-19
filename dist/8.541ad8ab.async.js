webpackJsonp([8,11,12,13,14,15,16,17,18,19,20],{1122:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.createGame=t.queryGamelist=void 0;var r=a(199),u=n(r),s=a(327),o=n(s),c=(t.queryGamelist=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/createGame"));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createGame=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/createGameData",{method:"POST",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(328)),l=n(c)},1123:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setLoginOut=t.setRegister=t.setLoginIn=void 0;var r=a(199),u=n(r),s=a(327),o=n(s),c=(t.setLoginIn=function(){var e=(0,o.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r="username="+a+"&password="+n+"&loginType=0&rememberMe=true",e.abrupt("return",(0,l.default)("/guessing/index/login",{method:"POST",body:r}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setRegister=function(){var e=(0,o.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r="username="+a+"&password="+n+"&registerType=0",e.abrupt("return",(0,l.default)("/guessing/index/register",{method:"POST",body:r}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setLoginOut=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/index/logout",{method:"POST",body:{}}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),a(328)),l=n(c)},1131:function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},1132:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.createGame=t.queryEventlist=t.enumEventtype=void 0;var r=a(199),u=n(r),s=a(327),o=n(s),c=(t.enumEventtype=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/listAllGameTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryEventlist=function(){var e=(0,o.default)(u.default.mark(function e(t){var a,n,r,s,o;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSequence,n=t.pageSize,r=t.name,s=t.type,o="pageSequence="+a+"&pageSize="+n+"&type="+s+"&name="+r,e.abrupt("return",(0,l.default)("/guessing/game/recentlyGames?"+o));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createGame=function(){var e=(0,o.default)(u.default.mark(function e(t){var a,n,r,s,o,c,d;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.name,n=t.icon,r=t.description,s=t.type,o=t.startTime,c=t.endTime,d="name="+a,e.abrupt("return",(0,l.default)("/guessing/game/createGame",{method:" POST",body:t}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(328)),l=n(c)},1133:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryQuizlist=t.queryQuiztype=void 0;var r=a(199),u=n(r),s=a(327),o=n(s),c=(t.queryQuiztype=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/quiz/quizrules"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryQuizlist=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/quiz/quizlist"));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(328)),l=n(c)},1134:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.addQuiztype=t.addEventtype=t.queryQuiztypelist=t.queryEventtypelist=void 0;var r=a(199),u=n(r),s=a(327),o=n(s),c=(t.queryEventtypelist=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/listAllGameTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryQuiztypelist=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/guess/listAllGuessTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.addEventtype=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/createGameType",{method:"POST",contentType:"files",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addQuiztype=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/aa/aaa"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),a(328)),l=n(c)},1135:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryCurrent=t.query=void 0;var r=a(199),u=n(r),s=a(327),o=n(s),c=(t.query=function(){var e=(0,o.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/modules/manage/sys/sysUserInfo.htm"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryCurrent=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.abrupt("return",(0,l.default)("/guessing/index/watchUserInfo?username="+t));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(328)),l=n(c)},1191:function(e,t,a){function n(e){return a(r(e))}function r(e){var t=u[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var u={"./eventlist.js":813,"./gamelist.js":814,"./global.js":215,"./index.js":823,"./login.js":815,"./quizlist.js":816,"./register.js":817,"./rule.js":818,"./systemlist.js":819,"./tradelist.js":820,"./user.js":821,"./userlist.js":822};n.keys=function(){return Object.keys(u)},n.resolve=r,e.exports=n,n.id=1191},813:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(1131),l=n(c),d=a(1132),i=a(1122);t.default={namespace:"eventlist",state:{data:{list:[{id:3,eventName:"\u4e2d\u56fdVS\u97e9\u56fd",eventclass:"2",eventclassStr:"\u8db3\u7403",eventTimeStart:"2018-02-01 09:00",eventTimeEnd:"2018-02-05 09:00",eventstatus:1,eventstatusStr:"\u5df2\u53d1\u5e03"}],pagination:!1},loading:!1,eventtype:[]},effects:{typefetch:o.default.mark(function e(t,a){var n,r=a.call,u=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,l.default)(t),e.next=3,r(d.enumEventtype);case 3:return n=e.sent,e.next=6,u({type:"setEventtype",payload:n});case 6:case"end":return e.stop()}},e,this)}),fetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(d.queryEventlist,r);case 4:return n=e.sent,console.log(n),e.next=8,s({type:"setListdata",payload:n});case 8:return e.next=10,s({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),gamefetch:o.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(i.queryGamelist,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return console.log(t.payload),(0,u.default)({},e,{data:{list:t.payload.data,pagination:!1}})},setEventtype:function(e,t){return(0,u.default)({},e,{eventtype:t.payload})}}},e.exports=t.default},814:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(1122);t.default={namespace:"gamelist",state:{data:{list:[],pagination:!1},loading:!1,eventtype:[]},effects:{fetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(c.queryGamelist,r);case 4:return n=e.sent,console.log(n),e.next=8,s({type:"setListdata",payload:n});case 8:return e.next=10,s({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),modalrecordfetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeModal",payload:!0});case 2:return e.next=4,u(c.queryBorrowOrderDetail,r);case 4:return n=e.sent,e.next=7,s({type:"setModalRecord",payload:n});case 7:case"end":return e.stop()}},e,this)}),modallistfetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(c.queryBorrowOrderDetail,r);case 2:return n=e.sent,e.next=5,s({type:"setModalList",payload:n});case 5:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return console.log(t.payload),(0,u.default)({},e,{data:{list:t.payload.data,pagination:!1}})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},setModalRecord:function(e,t){return(0,u.default)({},e,{modalrecord:t.payload})},setModalList:function(e,t){return(0,u.default)({},e,{modallist:t.payload})}}},e.exports=t.default},815:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(199),u=n(r),s=a(4),o=n(s),c=a(201),l=a(1123),d={id:localStorage.getItem("id"),name:localStorage.getItem("name"),nickname:localStorage.getItem("nickname"),username:localStorage.getItem("username")};t.default={namespace:"login",state:{status:!1,tipMessage:"",userdata:(0,o.default)({},d)},effects:{accountSubmit:u.default.mark(function e(t,a){var n,r=t.payload,s=a.call,c=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c({type:"changeSubmitting",payload:!0});case 2:return e.next=4,s(l.setLoginIn,r);case 4:return n=e.sent,e.next=7,c({type:"changeLoginStatus",payload:(0,o.default)({status:0==n.resultCode,resultmsg:n.resultmsg||""},n)});case 7:return e.next=9,c({type:"changeSubmitting",payload:!1});case 9:case"end":return e.stop()}},e,this)}),logout:u.default.mark(function e(t,a){var n=a.call,r=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"changeLoginStatus",payload:{status:!1}});case 2:return e.next=4,n(l.setLoginOut);case 4:return e.next=6,r({type:"deleteLoginStatus"});case 6:return e.next=8,r(c.routerRedux.push("/user/login"));case 8:case"end":return e.stop()}},e,this)})},reducers:{changeLoginStatus:function(e,t){var a=t.payload;for(var n in a.data)localStorage.setItem(n,a.data[n]);return(0,o.default)({},e,{status:a.status,tipMessage:a.resultmsg,userdata:a.data})},changeSubmitting:function(e,t){var a=t.payload;return(0,o.default)({},e,{submitting:a})},deleteLoginStatus:function(e,t){t.payload;for(var a in d)localStorage.removeItem(a);return(0,o.default)({},e,{userdata:{}})}}},e.exports=t.default},816:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(1133);t.default={namespace:"quizlist",state:{data:{list:[],pagination:!1},loading:!1,modal:!1,modalrecord:{},modallist:[]},effects:{fetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(c.queryQuizlist,r);case 4:return n=e.sent,console.log(n),e.next=8,s({type:"setListdata",payload:n});case 8:return e.next=10,s({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:!1}})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},setModalRecord:function(e,t){return(0,u.default)({},e,{modalrecord:t.payload})},setModalList:function(e,t){return(0,u.default)({},e,{modallist:t.payload})}}},e.exports=t.default},817:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(1123);t.default={namespace:"register",state:{status:void 0},effects:{submit:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeSubmitting",payload:!0});case 2:return e.next=4,u(c.setRegister,r);case 4:if(n=e.sent,0!==n.resultCode){e.next=8;break}return e.next=8,s({type:"registerHandle",payload:"ok"});case 8:return e.next=10,s({type:"changeSubmitting",payload:!1});case 10:case"end":return e.stop()}},e,this)})},reducers:{registerHandle:function(e,t){var a=t.payload;return(0,u.default)({},e,{status:a})},changeSubmitting:function(e,t){var a=t.payload;return(0,u.default)({},e,{submitting:a})}}},e.exports=t.default},818:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(344);t.default={namespace:"rule",state:{data:{list:[],pagination:{}},loading:!0,modal:!1,record:{}},effects:{fetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(c.queryRule,r);case 4:return n=e.sent,e.next=7,s({type:"save",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)}),add:o.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call,l=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"changeLoading",payload:!0});case 2:return e.next=4,s(c.addRule,r);case 4:return n=e.sent,e.next=7,l({type:"save",payload:n});case 7:return e.next=9,l({type:"changeLoading",payload:!1});case 9:u&&u();case 10:case"end":return e.stop()}},e,this)}),remove:o.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call,l=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"changeLoading",payload:!0});case 2:return e.next=4,s(c.removeRule,r);case 4:return n=e.sent,e.next=7,l({type:"save",payload:n});case 7:return e.next=9,l({type:"changeLoading",payload:!1});case 9:u&&u();case 10:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,u.default)({},e,{data:t.payload})},changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload.modal,record:t.payload.record})}}},e.exports=t.default},819:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(1134);t.default={namespace:"systemlist",state:{data:{list:[],pagination:!1},loading:!1,eventtype:[]},effects:{eventtypefetch:o.default.mark(function e(t,a){var n,r=t.callback,u=a.call;a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(c.queryEventtypelist);case 2:n=e.sent,r&&r(n);case 4:case"end":return e.stop()}},e,this)}),addEventtype:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(c.addEventtype,r);case 4:n=e.sent,callback&&callback(n);case 6:case"end":return e.stop()}},e,this)}),quizfetch:o.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.queryQuiztypelist,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return console.log(t.payload),(0,u.default)({},e,{data:{list:t.payload.data,pagination:!1}})},setEventtype:function(e,t){return(0,u.default)({},e,{eventtype:t.payload})}}},e.exports=t.default},820:function(e,t,a){"use strict"},821:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=(a(201),a(1135));t.default={namespace:"user",state:{list:[],loading:!1,currentUser:{}},effects:{fetchCurrent:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(c.queryCurrent,r);case 4:return n=e.sent,e.next=7,s({type:"saveCurrentUser",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,u.default)({},e,{list:t.payload})},changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},saveCurrentUser:function(e,t){return(0,u.default)({},e,{currentUser:t.payload.data})}}},e.exports=t.default},822:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(4),u=n(r),s=a(199),o=n(s),c=a(344);t.default={namespace:"userlist",state:{data:{list:[],pagination:{}},loading:!0,modal:!1,record:{},userinfo:{}},effects:{fetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(r),e.next=3,s({type:"changeLoading",payload:!0});case 3:return e.next=5,u(c.queryUserInfoList,r);case 5:return n=e.sent,e.next=8,s({type:"getListdata",payload:{list:JSON.parse(n.resultData),pagination:JSON.parse(n.page)}});case 8:return e.next=10,s({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),userDetailfetch:o.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(c.queryUserInfoDetail,r);case 2:return n=e.sent,e.next=5,s({type:"getUserdata",payload:JSON.parse(n.resultData)});case 5:return e.next=7,s({type:"changeModal",payload:!0});case 7:case"end":return e.stop()}},e,this)})},reducers:{getListdata:function(e,t){return(0,u.default)({},e,{data:t.payload})},changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},changeRecord:function(e,t){return(0,u.default)({},e,{record:t.payload})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},getUserdata:function(e,t){return(0,u.default)({},e,{userinfo:t.payload})}}},e.exports=t.default},823:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});for(var n=a(1191),r=n.keys().filter(function(e){return"./index.js"!==e}),u=[],s=0;s<r.length;s+=1)u.push(n(r[s]));t.default=u,e.exports=t.default}});