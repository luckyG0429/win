webpackJsonp([18],{1400:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(1),u=r(n),s=a(297),i=r(s),c=a(1550),d=a(1551);t.default={namespace:"gamelist",state:{data:{list:[],pagination:{}},loading:!1,eventtype:[],gamequiz:[]},effects:{eventTypelist:i.default.mark(function e(t,a){var r,n=(t.payload,a.call),u=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(c.queryEventlist);case 2:if(r=e.sent,0===r.resultCode){e.next=5;break}return e.abrupt("return",!1);case 5:return e.next=7,u({type:"setEventtype",payload:r});case 7:case"end":return e.stop()}},e,this)}),teamfetch:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.enumTeam,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),fetch:i.default.mark(function e(t,a){var r,n=t.payload,u=a.call,s=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(c.queryGamelist,n);case 4:return r=e.sent,e.next=7,s({type:"setListdata",payload:r});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)}),addGamedata:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.addGame,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),updateGamedata:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.updateGame,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),submitGamedata:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.putGame,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),deleteGamedata:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.delGame,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),delayGameStarttime:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.setGamedstarttime,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),addGameQuiz:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.addQuiz,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),sendGameQuiz:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.sendQuiz,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),gameQuizlist:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(c.queryGameQuizlist,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),applyQuiz:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.auditQuiz,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),quizResult:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.addQuizResult,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),quizDelaytime:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.delayQuizTime,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)}),quizStop:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.stopQuiz,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setListdata:function(e,t){return console.log(t.payload),(0,u.default)({},e,{data:{list:t.payload.data,pagination:t.payload.edata}})},changeModal:function(e,t){return(0,u.default)({},e,{modal:t.payload})},setModalRecord:function(e,t){return(0,u.default)({},e,{modalrecord:t.payload})},setModalList:function(e,t){return(0,u.default)({},e,{modallist:t.payload})},setEventtype:function(e,t){return(0,u.default)({},e,{eventtype:t.payload.data})}}},e.exports=t.default},1458:function(e,t,a){e.exports={default:a(1479),__esModule:!0}},1479:function(e,t,a){var r=a(34),n=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},1550:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.sendGamescore=t.overGameguess=t.checkedGameguess=t.checkedGame=t.getGamedetail=t.queryCheckGamelist=t.setGamedstarttime=t.delGame=t.putGame=t.queryGameQuizlist=t.updateGame=t.addGame=t.queryGamelist=t.enumTeam=t.queryEventlist=void 0;var n=a(1458),u=r(n),s=a(297),i=r(s),c=a(520),d=r(c),o=(t.queryEventlist=function(){var e=(0,d.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="page=1&pageSize=100",e.abrupt("return",(0,f.default)("/guessing/game/recentlyGames?"+a));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.enumTeam=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/team/list?page=1&pageSize=1000&type="));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryGamelist=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r,n,u,s,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.startTime,u=t.gameId,s=t.name,c="page="+r+"&pageSize="+a,e.abrupt("return",(0,f.default)("/guessing/game/listGameData?"+c));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addGame=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/createGameData",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updateGame=function(){var e=(0,d.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.gameData,e.abrupt("return",(0,f.default)("/guessing/game/alterGameData",{method:"POST",contentType:"json",body:(0,u.default)(a)}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryGameQuizlist=function(){var e=(0,d.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="page=1&pageSize=10&gameDataId="+t,e.abrupt("return",(0,f.default)("/guessing/guess/list?"+a));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.putGame=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/postGameData",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.delGame=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/removeGameData",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setGamedstarttime=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.startTime,e.abrupt("return",(0,f.default)("/guessing/game/alterGameDataStartTime?",{method:"POST",body:"id="+a+"&startTime="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryCheckGamelist=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r,n,u,s,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.name,u=t.gameId,s=t.startTime,c="page="+r+"&pageSize="+a+"&status=2",e.abrupt("return",(0,f.default)("/guessing/game/listGameData?"+c));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.getGamedetail=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gamedatil?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGame=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.pass,e.abrupt("return",(0,f.default)("/guessing/game/authorizeGameData",{method:"POST",body:"id="+a+"&pass="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGameguess=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gameguessover",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.overGameguess=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gameguessover",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.sendGamescore=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r,n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.scoreA,n=t.scoreB,e.abrupt("return",(0,f.default)("/guessing/game/alterGameDataScore",{method:"POST",body:"id="+a+"&scoreA="+r+"&scoreB="+n}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(521)),f=r(o)},1551:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.queryAuditList=t.auditQuiz=t.addQuizResult=t.stopQuiz=t.delayQuizTime=t.sendQuiz=t.addQuiz=t.queryQuizlist=void 0;var n=a(1458),u=r(n),s=a(297),i=r(s),c=a(520),d=r(c),o=(t.queryQuizlist=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r,n,u,s,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.status,u=t.type,s=t.gameDataId,c="page="+r+"&pageSize="+a+"&status=",e.abrupt("return",(0,f.default)("/guessing/guess/list?"+c));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addQuiz=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/guess/create",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.sendQuiz=function(){var e=(0,d.default)(i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/guess/post",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.delayQuizTime=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.endTime,e.abrupt("return",(0,f.default)("/guessing/guess/alterEndTime",{method:"POST",body:"id="+a+"&endTime="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.stopQuiz=function(){var e=(0,d.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,e.abrupt("return",(0,f.default)("/guessing/guess/alterEndTime",{method:"POST",body:"id="+a+"&endTime="}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addQuizResult=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.isWinner,e.abrupt("return",(0,f.default)("/guessing/guess/stop",{method:"POST",body:"id="+a+"&isWinner="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.auditQuiz=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.id,r=t.pass,e.abrupt("return",(0,f.default)("/guessing/guess/authorize",{method:"POST",body:"id="+a+"&pass="+r}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryAuditList=function(){var e=(0,d.default)(i.default.mark(function e(t){var a,r,n,u,s;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,r=t.currentPage,n=t.name,u=t.type,s="page="+r+"&pageSize="+a+"&status=4",e.abrupt("return",(0,f.default)("/guessing/guess/list?"+s));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(521)),f=r(o)}});