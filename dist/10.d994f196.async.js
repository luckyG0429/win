webpackJsonp([10,13,14,15,16,17,18,19,20,21,22,23,24,25],{1398:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(1564),i=n(o),d=a(1565),l=a(1544),f=a(298);t.default={namespace:"eventlist",state:{data:{list:[],pagination:!1},loading:!1,eventtype:[],activateEvent:{}},effects:{typefetch:c.default.mark(function e(t,a){var n,r=a.call,u=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,i.default)(t),e.next=3,r(d.enumEventtype);case 3:return n=e.sent,e.next=6,u({type:"setEventtype",payload:n});case 6:case"end":return e.stop()}},e,this)}),fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(d.queryEventlist,r);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setListdata",payload:n});case 9:return e.next=11,s({type:"changeLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),gamefetch:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(l.queryGamelist,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),addgame:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.addEvent,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),changeRouter:c.default.mark(function e(t,a){var n=t.payload,r=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"setActivateEvent",payload:n});case 2:return e.next=4,r(f.routerRedux.push("/gamelist"));case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.edata}})},setEventtype:function(e,t){return(0,u.default)({},e,{eventtype:t.payload.data})},setActivateEvent:function(e,t){return console.log(t.payload),(0,u.default)({},e,{activateEvent:t.payload})}}},e.exports=t.default},1399:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(1544);t.default={namespace:"gameauditlist",state:{data:{list:[{name:"1"}],pagination:{}},loading:!1,activekey:""},effects:{fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(o.queryCheckGamelist,r);case 4:return n=e.sent,e.next=7,s({type:"setListdata",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)}),showGamedetail:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call,i=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i({type:"setActiverecord",payload:r.id});case 2:return e.next=4,s(o.getGamedetail,r);case 4:n=e.sent,u&&u(n);case 6:case"end":return e.stop()}},e,this)}),delayGameStarttime:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback;a.call,a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,cal(o.setGamedstarttime,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),sendGameScore:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.sendGamescore,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),sendGamePass:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.checkedGame,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.eData}})},setActiverecord:function(e,t){return(0,u.default)({},e,{activerecord:t.payload})}}},e.exports=t.default},1400:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(1544),i=a(1545);t.default={namespace:"gamelist",state:{data:{list:[],pagination:!1},loading:!1,eventtype:[]},effects:{eventTypelist:c.default.mark(function e(t,a){var n,r=(t.payload,a.call),u=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(o.queryEventlist);case 2:if(n=e.sent,0===n.resultCode){e.next=5;break}return e.abrupt("return",!1);case 5:return e.next=7,u({type:"setEventtype",payload:n});case 7:case"end":return e.stop()}},e,this)}),teamfetch:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.enumTeam,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(o.queryGamelist,r);case 4:return n=e.sent,console.log(n),e.next=8,s({type:"setListdata",payload:n});case 8:return e.next=10,s({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),addGamedata:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.addGame,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),submitGamedata:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.putGame,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),deleteGamedata:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.delGame,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),delayGameStarttime:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.setGamedstarttime,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),addGameQuiz:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(i.addQuiz,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return console.log(t.payload),(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.eData}})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},setModalRecord:function(e,t){return(0,u.default)({},e,{modalrecord:t.payload})},setModalList:function(e,t){return(0,u.default)({},e,{modallist:t.payload})},setEventtype:function(e,t){return(0,u.default)({},e,{eventtype:t.payload.data})}}},e.exports=t.default},1401:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(297),u=n(r),s=a(1),c=n(s),o=a(298),i=a(1566),d={id:localStorage.getItem("id"),name:localStorage.getItem("name"),nickname:localStorage.getItem("nickname"),username:localStorage.getItem("username")};t.default={namespace:"login",state:{status:!1,tipMessage:"",userdata:(0,c.default)({},d)},effects:{accountSubmit:u.default.mark(function e(t,a){var n,r=t.payload,s=a.call,o=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({type:"changeSubmitting",payload:!0});case 2:return e.next=4,s(i.setLoginIn,r);case 4:return n=e.sent,e.next=7,o({type:"changeLoginStatus",payload:(0,c.default)({status:0==n.resultCode,resultmsg:n.resultmsg||""},n)});case 7:return e.next=9,o({type:"changeSubmitting",payload:!1});case 9:case"end":return e.stop()}},e,this)}),logout:u.default.mark(function e(t,a){var n=a.call,r=a.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"changeLoginStatus",payload:{status:!1}});case 2:return e.next=4,n(i.setLoginOut);case 4:return e.next=6,r({type:"deleteLoginStatus"});case 6:return e.next=8,r(o.routerRedux.push("/user/login"));case 8:case"end":return e.stop()}},e,this)})},reducers:{changeLoginStatus:function(e,t){var a=t.payload;for(var n in a.data)localStorage.setItem(n,a.data[n]);return(0,c.default)({},e,{status:a.status,tipMessage:a.resultmsg,userdata:a.data})},changeSubmitting:function(e,t){var a=t.payload;return(0,c.default)({},e,{submitting:a})},deleteLoginStatus:function(e,t){t.payload;for(var a in d)localStorage.removeItem(a);return(0,c.default)({},e,{userdata:{}})}}},e.exports=t.default},1402:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(1545);t.default={namespace:"quizauditlist",state:{loading:!1,data:{list:[],pagination:{}}},effects:{fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(o.queryAuditList,r);case 4:return n=e.sent,e.next=7,s({type:"setList",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!0});case 9:case"end":return e.stop()}},e,this)}),checkReject:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.sendReject,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),checkAccout:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(o.sendAccout,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setList:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:{}}})}}},e.exports=t.default},1403:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(1545);t.default={namespace:"quizlist",state:{data:{list:[],pagination:!1},loading:!1,modal:!1,modalrecord:{},modallist:[]},effects:{fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(o.queryQuizlist,r);case 4:return n=e.sent,e.next=7,s({type:"setListdata",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:!1}})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},setModalRecord:function(e,t){return(0,u.default)({},e,{modalrecord:t.payload})},setModalList:function(e,t){return(0,u.default)({},e,{modallist:t.payload})}}},e.exports=t.default},1404:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(1566);t.default={namespace:"register",state:{status:void 0},effects:{submit:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeSubmitting",payload:!0});case 2:return e.next=4,u(o.setRegister,r);case 4:if(n=e.sent,0!==n.resultCode){e.next=8;break}return e.next=8,s({type:"registerHandle",payload:"ok"});case 8:return e.next=10,s({type:"changeSubmitting",payload:!1});case 10:case"end":return e.stop()}},e,this)})},reducers:{registerHandle:function(e,t){var a=t.payload;return(0,u.default)({},e,{status:a})},changeSubmitting:function(e,t){var a=t.payload;return(0,u.default)({},e,{submitting:a})}}},e.exports=t.default},1405:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(549);t.default={namespace:"rule",state:{data:{list:[],pagination:{}},loading:!0,modal:!1,record:{}},effects:{fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(o.queryRule,r);case 4:return n=e.sent,e.next=7,s({type:"save",payload:n});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)}),add:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call,i=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i({type:"changeLoading",payload:!0});case 2:return e.next=4,s(o.addRule,r);case 4:return n=e.sent,e.next=7,i({type:"save",payload:n});case 7:return e.next=9,i({type:"changeLoading",payload:!1});case 9:u&&u();case 10:case"end":return e.stop()}},e,this)}),remove:c.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call,i=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i({type:"changeLoading",payload:!0});case 2:return e.next=4,s(o.removeRule,r);case 4:return n=e.sent,e.next=7,i({type:"save",payload:n});case 7:return e.next=9,i({type:"changeLoading",payload:!1});case 9:u&&u();case 10:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,u.default)({},e,{data:t.payload})},changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload.modal,record:t.payload.record})}}},e.exports=t.default},1406:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(9),u=n(r),s=a(1),c=n(s),o=a(297),i=n(o),d=a(1584);t.default={namespace:"systemlist",state:{eventdata:{list:[],pagination:{}},eventloading:!1,eventtype:[],roledata:{list:[],pagination:{}},roleLoading:!1},effects:{eventtypefetch:i.default.mark(function e(t,a){var n,r=t.payload,u=(t.callback,a.call),s=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeEventLoading",payload:!0});case 2:return e.next=4,u(d.queryEventtypelist,r);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setEventListdata",payload:n});case 9:return e.next=11,s({type:"changeEventLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),addEventtype:i.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call,c=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c({type:"changeLoading",payload:!0});case 2:return e.next=4,s(d.addEventtype,r);case 4:n=e.sent,u&&u(n);case 6:case"end":return e.stop()}},e,this)})},reducers:{changeEventLoading:function(e,t){return(0,c.default)({},e,{eventloading:t.payload})},setEventListdata:function(e,t){return(0,c.default)({},e,{eventdata:(0,u.default)({list:t.payload.data,pagination:t.payload.eData},"pagination",!1)})},changeRoleLoading:function(e,t){return(0,c.default)({},e,{eventloading:t.payload})},setRoleListdata:function(e,t){return(0,c.default)({},e,{roledata:{list:t.payload.data,pagination:t.payload.eData}})},setEventtype:function(e,t){return(0,c.default)({},e,{eventtype:t.payload})}}},e.exports=t.default},1407:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(1564),c=n(s),o=a(297),i=n(o),d=a(1585),l=a(1565);t.default={namespace:"teamlist",state:{data:{list:[],pagination:{}},loading:!1,eventType:[]},effects:{fetch:i.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(d.queryTeamlist,r);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setListdata",payload:n});case 9:return e.next=11,s({type:"changeLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),addTeam:i.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.createTeam,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),typefetch:i.default.mark(function e(t,a){var n,r=a.call,u=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,c.default)(t),e.next=3,r(l.enumEventtype);case 3:return n=e.sent,e.next=6,u({type:"setEventtype",payload:n.data});case 6:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.edata}})},setEventtype:function(e,t){return(0,u.default)({},e,{eventType:t.payload})}}},e.exports=t.default},1408:function(e,t,a){"use strict"},1409:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(298),i=a(1586);t.default={namespace:"user",state:{list:[],loading:!1,currentUser:{}},effects:{fetchCurrent:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(i.queryCurrent,r);case 4:if(n=e.sent,0!==n.resultCode){e.next=10;break}return e.next=8,s({type:"saveCurrentUser",payload:n});case 8:e.next=12;break;case 10:return e.next=12,s(o.routerRedux.push("/user/login"));case 12:return e.next=14,s({type:"changeLoading",payload:!1});case 14:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return(0,u.default)({},e,{list:t.payload})},changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},saveCurrentUser:function(e,t){return(0,u.default)({},e,{currentUser:t.payload.data})}}},e.exports=t.default},1410:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),s=a(297),c=n(s),o=a(549);t.default={namespace:"userlist",state:{data:{list:[],pagination:{}},loading:!0,modal:!1,record:{},userinfo:{}},effects:{fetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(r),e.next=3,s({type:"changeLoading",payload:!0});case 3:return e.next=5,u(o.queryUserInfoList,r);case 5:return n=e.sent,e.next=8,s({type:"getListdata",payload:{list:JSON.parse(n.resultData),pagination:JSON.parse(n.page)}});case 8:return e.next=10,s({type:"changeLoading",payload:!1});case 10:case"end":return e.stop()}},e,this)}),userDetailfetch:c.default.mark(function e(t,a){var n,r=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(o.queryUserInfoDetail,r);case 2:return n=e.sent,e.next=5,s({type:"getUserdata",payload:JSON.parse(n.resultData)});case 5:return e.next=7,s({type:"changeModal",payload:!0});case 7:case"end":return e.stop()}},e,this)})},reducers:{getListdata:function(e,t){return(0,u.default)({},e,{data:t.payload})},changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},changeRecord:function(e,t){return(0,u.default)({},e,{record:t.payload})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},getUserdata:function(e,t){return(0,u.default)({},e,{userinfo:t.payload})}}},e.exports=t.default},1411:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});for(var n=a(1637),r=n.keys().filter(function(e){return"./index.js"!==e}),u=[],s=0;s<r.length;s+=1)u.push(n(r[s]));t.default=u,e.exports=t.default},1475:function(e,t,a){e.exports={default:a(1494),__esModule:!0}},1494:function(e,t,a){var n=a(34),r=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},1544:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.sendGamescore=t.overGameguess=t.checkedGameguess=t.checkedGame=t.getGamedetail=t.queryCheckGamelist=t.setGamedstarttime=t.delGame=t.putGame=t.updateGame=t.addGame=t.queryGamelist=t.enumTeam=t.queryEventlist=void 0;var r=a(1475),u=n(r),s=a(297),c=n(s),o=a(519),i=n(o),d=(t.queryEventlist=function(){var e=(0,i.default)(c.default.mark(function e(t){var a;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="page=1&pageSize=100&name=&type=",e.abrupt("return",(0,l.default)("/guessing/game/recentlyGames?"+a));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.enumTeam=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/team/list?page=1&pageSize=1000&type="));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryGamelist=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n,r,u,s;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r=t.name,u=t.type,s="page="+n+"&pageSize="+a+"&status=",e.abrupt("return",(0,l.default)("/guessing/game/listGameData?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addGame=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),a=t.gameData,n=t.gameGuesses,e.abrupt("return",(0,l.default)("/guessing/game/createGameData",{method:"POST",body:(0,u.default)(t)}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updateGame=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/alterGameData",{method:"POST",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.putGame=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/postGameData?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.delGame=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/removeGameData?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setGamedstarttime=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,n=t.startTime,e.abrupt("return",(0,l.default)("/guessing/game/alterGameDataStartTime?",{method:"POST",body:"id="+a+"&startTime="+n}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryCheckGamelist=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n,r,u,s;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r=t.name,u=t.type,s="page="+n+"&pageSize="+a+"&status=2",e.abrupt("return",(0,l.default)("/guessing/game/listGameData?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.getGamedetail=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/gamedatil?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGame=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,n=t.pass,e.abrupt("return",(0,l.default)("/guessing/game/authorGameData",{method:"POST",body:"id="+a+"&pass="+n}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGameguess=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/gameguessover?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.overGameguess=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/game/gameguessover?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.sendGamescore=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n,r;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,n=t.scoreA,r=t.scoreB,e.abrupt("return",(0,l.default)("/guessing/game/alterGameDataScore",{method:"POST",body:"id="+a+"&scoreA="+n+"&scoreB="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),l=n(d)},1545:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryAuditList=t.auditQuiz=t.updataQuizResult=t.submitQuiz=t.delQuiz=t.addQuiz=t.queryQuizlist=void 0;var r=a(1475),u=n(r),s=a(297),c=n(s),o=a(519),i=n(o),d=(t.queryQuizlist=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n,r,u,s;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r=t.status,u=t.type,s="page="+n+"&pageSize="+a+"&status=",e.abrupt("return",(0,l.default)("/guessing/guess/list?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addQuiz=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/guess/create",{method:"POST",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.delQuiz=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/guess/remove?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.submitQuiz=function(){var e=(0,i.default)(c.default.mark(function e(t){return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,l.default)("/guessing/guess/post?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updataQuizResult=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,n=t.isWinner,e.abrupt("return",(0,l.default)("/guessing/guess/stop",{method:"POST",body:"id="+a+"&isWinner="+n}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.auditQuiz=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,n=t.pass,e.abrupt("return",(0,l.default)("/guessing/guess/stop",{method:"POST",body:"id="+a+"&pass="+n}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryAuditList=function(){var e=(0,i.default)(c.default.mark(function e(t){var a,n,r,u,s;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r=t.name,u=t.type,s="page="+n+"&pageSize="+a+"&status=4",e.abrupt("return",(0,l.default)("/guessing/guess/list?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),l=n(d)},1564:function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},1565:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.addEvent=t.queryEventlist=t.enumEventtype=void 0;var r=a(297),u=n(r),s=a(519),c=n(s),o=(t.enumEventtype=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/guessing/game/listGameTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryEventlist=function(){var e=(0,c.default)(u.default.mark(function e(t){var a,n,r,s,c;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r=t.name,s=t.type,c="page="+n+"&pageSize="+a+"&name="+r+"&type="+s,e.abrupt("return",(0,i.default)("/guessing/game/recentlyGames?"+c));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addEvent=function(){var e=(0,c.default)(u.default.mark(function e(t){var a,n,r,s,c;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),a=t.name,n=t.type,r=t.startTime,s=t.endTime,c="name="+a+"&type="+n+"&startTime="+r+"&endTime="+s,e.abrupt("return",(0,i.default)("/guessing/game/createGame",{method:"POST",body:c}));case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),i=n(o)},1566:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setLoginOut=t.setRegister=t.setLoginIn=void 0;var r=a(297),u=n(r),s=a(519),c=n(s),o=(t.setLoginIn=function(){var e=(0,c.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r="username="+a+"&password="+n+"&loginType=0&rememberMe=true",e.abrupt("return",(0,i.default)("/guessing/index/login",{method:"POST",body:r}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setRegister=function(){var e=(0,c.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r="username="+a+"&password="+n+"&registerType=0",e.abrupt("return",(0,i.default)("/guessing/index/register",{method:"POST",body:r}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setLoginOut=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/guessing/index/logout",{method:"POST",body:{}}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),a(520)),i=n(o)},1584:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.deleteAuthorRole=t.updataAuthorRole=t.addAuthorizeRole=t.addQuiztype=t.addEventtype=t.queryQuiztypelist=t.queryEventtypelist=void 0;var r=a(297),u=n(r),s=a(519),c=n(s),o=(t.queryEventtypelist=function(){var e=(0,c.default)(u.default.mark(function e(t){var a,n,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r="page="+n+"&pageSize="+a,e.abrupt("return",(0,i.default)("/guessing/game/listGameTypes?"+r));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryQuiztypelist=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/guessing/guess/listAllGuessTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.addEventtype=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/guessing/game/createGameType",{method:"POST",contentType:"files",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addQuiztype=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/guessing/aa/aaa"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.addAuthorizeRole=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("authorize/createRole",{method:"POST",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updataAuthorRole=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("authorize/alterRole",{method:"POST",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.deleteAuthorRole=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("authorize/remove?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),i=n(o)},1585:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryTeamlist=t.createTeam=void 0;var r=a(297),u=n(r),s=a(519),c=n(s),o=(t.createTeam=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/guessing/team/create",{method:"POST",contentType:"files",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryTeamlist=function(){var e=(0,c.default)(u.default.mark(function e(t){var a,n,r,s;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r=t.type,s="page="+n+"&pageSize="+a+"&type="+r,e.abrupt("return",(0,i.default)("/guessing/team/list?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),i=n(o)},1586:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryCurrent=t.query=void 0;var r=a(297),u=n(r),s=a(519),c=n(s),o=(t.query=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.default)("/modules/manage/sys/sysUserInfo.htm"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryCurrent=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.abrupt("return",(0,i.default)("/guessing/index/watchUserInfo?username="+t));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),i=n(o)},1637:function(e,t,a){function n(e){return a(r(e))}function r(e){var t=u[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var u={"./eventlist.js":1398,"./gameauditlist.js":1399,"./gamelist.js":1400,"./global.js":322,"./index.js":1411,"./login.js":1401,"./quizauditlist.js":1402,"./quizlist.js":1403,"./register.js":1404,"./rule.js":1405,"./systemlist.js":1406,"./teamlist.js":1407,"./tradelist.js":1408,"./user.js":1409,"./userlist.js":1410};n.keys=function(){return Object.keys(u)},n.resolve=r,e.exports=n,n.id=1637}});