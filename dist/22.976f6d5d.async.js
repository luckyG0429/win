webpackJsonp([22],{1097:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.overGameguess=t.checkedGameguess=t.overGame=t.checkedGame=t.getGamedetail=t.setGamedstarttime=t.createGame=t.queryGamelist=t.enumTeam=void 0;var n=a(199),u=r(n),s=a(326),c=r(s),i=(t.enumTeam=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/team/allocatePlayers"));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryGamelist=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createGame=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/createGameData",{method:"POST",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setGamedstarttime=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gamedatil?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.getGamedetail=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gamedatil?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGame=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gamepass?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.overGame=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gameover?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.checkedGameguess=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gameguessover?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.overGameguess=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/game/gameguessover?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(327)),f=r(i)},814:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(4),u=r(n),s=a(199),c=r(s),i=a(1097);t.default={namespace:"gameauditlist",state:{list:{data:[],pagination:{}},loading:!1,activekey:""},effects:{fetch:c.default.mark(function e(t,a){var r,n=t.payload,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,u(i.queryGamelist,n);case 4:return r=e.sent,e.next=7,s({type:"setList",payload:r});case 7:return e.next=9,s({type:"changeLoading",payload:!1});case 9:case"end":return e.stop()}},e,this)}),showGamedetail:c.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call,f=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f({type:"setActiverecord",payload:n.id});case 2:return e.next=4,s(i.getGamedetail,n);case 4:r=e.sent,u&&u(r);case 6:case"end":return e.stop()}},e,this)}),delayGameStarttime:c.default.mark(function e(t,a){var r,n=t.payload,u=t.callback;a.call,a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,cal(i.setGamedstarttime,n);case 2:r=e.sent,u&&u(r);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeLoading:function(e,t){return(0,u.default)({},e,{loading:t.payload})},setList:function(e,t){return(0,u.default)({},e,{list:{data:t.payload.data,pagination:{}}})},setActiverecord:function(e,t){return(0,u.default)({},e,{activerecord:t.payload})}}},e.exports=t.default}});