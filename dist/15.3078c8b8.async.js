webpackJsonp([15],{1407:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),u=a(r),s=n(1564),c=a(s),i=n(297),o=a(i),d=n(1585),f=n(1565);t.default={namespace:"teamlist",state:{data:{list:[],pagination:{}},loading:!1,eventType:[]},effects:{fetch:o.default.mark(function e(t,n){var a,r=t.payload,u=n.call,s=n.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(d.queryTeamlist,r);case 4:if(a=e.sent,0===a.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setListdata",payload:a});case 9:return e.next=11,s({type:"changeLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),addTeam:o.default.mark(function e(t,n){var a,r=t.payload,u=t.callback,s=n.call;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.createTeam,r);case 2:a=e.sent,u&&u(a);case 4:case"end":return e.stop()}},e,this)}),typefetch:o.default.mark(function e(t,n){var a,r=n.call,u=n.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,c.default)(t),e.next=3,r(f.enumEventtype);case 3:return a=e.sent,e.next=6,u({type:"setEventtype",payload:a.data});case 6:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.edata}})},setEventtype:function(e,t){return(0,u.default)({},e,{eventType:t.payload})}}},e.exports=t.default},1564:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},1565:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.addEvent=t.queryEventlist=t.enumEventtype=void 0;var r=n(297),u=a(r),s=n(519),c=a(s),i=(t.enumEventtype=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.default)("/guessing/game/listGameTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryEventlist=function(){var e=(0,c.default)(u.default.mark(function e(t){var n,a,r,s,c;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.pageSize,a=t.currentPage,r=t.name,s=t.type,c="page="+a+"&pageSize="+n+"&name="+r+"&type="+s,e.abrupt("return",(0,o.default)("/guessing/game/recentlyGames?"+c));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addEvent=function(){var e=(0,c.default)(u.default.mark(function e(t){var n,a,r,s,c;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),n=t.name,a=t.type,r=t.startTime,s=t.endTime,c="name="+n+"&type="+a+"&startTime="+r+"&endTime="+s,e.abrupt("return",(0,o.default)("/guessing/game/createGame",{method:"POST",body:c}));case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n(520)),o=a(i)},1585:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryTeamlist=t.createTeam=void 0;var r=n(297),u=a(r),s=n(519),c=a(s),i=(t.createTeam=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.default)("/guessing/team/create",{method:"POST",contentType:"files",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryTeamlist=function(){var e=(0,c.default)(u.default.mark(function e(t){var n,a,r,s;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.pageSize,a=t.currentPage,r=t.type,s="page="+a+"&pageSize="+n+"&type="+r,e.abrupt("return",(0,o.default)("/guessing/team/list?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n(520)),o=a(i)}});