webpackJsonp([19],{1398:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(1),u=r(n),s=a(297),i=r(s),c=a(1548),o=r(c),f=a(1591),d=a(1559),p=a(300);t.default={namespace:"eventlist",state:{data:{list:[],pagination:!1},loading:!1,eventtype:[],activateEvent:{}},effects:{typefetch:i.default.mark(function e(t,a){var r,n=a.call,u=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,o.default)(t),e.next=3,n(f.enumEventtype);case 3:return r=e.sent,e.next=6,u({type:"setEventtype",payload:r});case 6:case"end":return e.stop()}},e,this)}),fetch:i.default.mark(function e(t,a){var r,n=t.payload,u=a.call,s=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(f.queryEventlist,n);case 4:if(r=e.sent,0===r.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setListdata",payload:r});case 9:return e.next=11,s({type:"changeLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),gamefetch:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.queryGamelist,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),addgame:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(f.addEvent,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),changeRouter:i.default.mark(function e(t,a){var r=t.payload,n=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:"setActivateEvent",payload:r});case 2:return e.next=4,n(p.routerRedux.push("/gamelist"));case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.edata}})},setEventtype:function(e,t){return(0,u.default)({},e,{eventtype:t.payload.data})},setActivateEvent:function(e,t){return console.log(t.payload),(0,u.default)({},e,{activateEvent:t.payload})}}},e.exports=t.default},1485:function(e,t,a){e.exports={default:a(1504),__esModule:!0}},1504:function(e,t,a){var r=a(34),n=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},1548:function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},1559:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.sendGamescore=t.overGameguess=t.checkedGameguess=t.checkedGame=t.getGamedetail=t.queryCheckGamelist=t.setGamedstarttime=t.delGame=t.putGame=t.queryGameQuizlist=t.updateGame=t.addGame=t.queryGamelist=t.enumTeam=t.queryEventlist=void 0;var n=a(1485),u=r(n),s=a(297),i=r(s),c=a(522),o=r(c),f=(t.queryEventlist=function(){var e=(0,o.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="page=1&pageSize=100",e.abrupt("return",(0,d.default)("/guessing/web/game/recentlyGames?"+a));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.enumTeam=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/team/list?page=1&pageSize=1000&type="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryGamelist=function(){var e=(0,o.default)(i.default.mark(function e(t){var a,r,n,u,s,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.startTime,u=t.gameId,s=t.name,c="page="+r+"&pageSize="+a,u&&(c+="gameId="+u),n&&(c+="startTime="+n),s&&(c+="name="+s),e.abrupt("return",(0,d.default)("/guessing/web/game/listGameData?"+c));case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addGame=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/game/createGameData",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updateGame=function(){var e=(0,o.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.gameData,e.abrupt("return",(0,d.default)("/guessing/web/game/alterGameData",{method:"POST",contentType:"json",body:(0,u.default)(a)}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryGameQuizlist=function(){var e=(0,o.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="page=1&pageSize=10&gameDataId="+t,e.abrupt("return",(0,d.default)("/guessing/web/guess/list?"+a));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.putGame=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/game/postGameData",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.delGame=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/game/removeGameData",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setGamedstarttime=function(){var e=(0,o.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.startTime,e.abrupt("return",(0,d.default)("/guessing/web/game/alterGameDataStartTime?",{method:"POST",body:"id="+a+"&startTime="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryCheckGamelist=function(){var e=(0,o.default)(i.default.mark(function e(t){var a,r,n,u,s,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.name,u=t.gameId,s=t.startTime,c="page="+r+"&pageSize="+a+"&status=2",e.abrupt("return",(0,d.default)("/guessing/web/game/listGameData?"+c));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.getGamedetail=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/game/gamedatil?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGame=function(){var e=(0,o.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.pass,e.abrupt("return",(0,d.default)("/guessing/web/game/authorizeGameData",{method:"POST",body:"id="+a+"&pass="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGameguess=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/game/gameguessover",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.overGameguess=function(){var e=(0,o.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/web/game/gameguessover",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.sendGamescore=function(){var e=(0,o.default)(i.default.mark(function e(t){var a,r,n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.scoreA,n=t.scoreB,e.abrupt("return",(0,d.default)("/guessing/web/game/alterGameDataScore",{method:"POST",body:"id="+a+"&scoreA="+r+"&scoreB="+n}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(523)),d=r(f)},1591:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.addEvent=t.queryEventlist=t.enumEventtype=void 0;var n=a(297),u=r(n),s=a(522),i=r(s),c=(t.enumEventtype=function(){var e=(0,i.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.default)("/guessing/web/game/listGameTypes"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.queryEventlist=function(){var e=(0,i.default)(u.default.mark(function e(t){var a,r,n,s,i;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.name,s=t.type,i="page="+r+"&pageSize="+a+"&name="+(n||"")+"&type="+s,e.abrupt("return",(0,o.default)("/guessing/web/game/recentlyGames?"+i));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addEvent=function(){var e=(0,i.default)(u.default.mark(function e(t){var a,r,n,s,i;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),a=t.name,r=t.type,n=t.startTime,s=t.endTime,i="name="+a+"&type="+r+"&startTime="+n+"&endTime="+s,e.abrupt("return",(0,o.default)("/guessing/web/game/createGame",{method:"POST",body:i}));case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(523)),o=r(c)}});