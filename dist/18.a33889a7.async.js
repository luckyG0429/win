webpackJsonp([18],{1406:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),o=a(297),s=n(o),c=a(1569);t.default={namespace:"systemlist",state:{eventdata:{list:[],pagination:{}},eventloading:!1,eventtype:[],roledata:{list:[],pagination:{}},roleloading:!1},effects:{eventtypefetch:s.default.mark(function e(t,a){var n,r=t.payload,u=(t.callback,a.call),o=a.put;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({type:"changeEventLoading",payload:!0});case 2:return e.next=4,u(c.queryEventtypelist,r);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,o({type:"setEventListdata",payload:n});case 9:return e.next=11,o({type:"changeEventLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),addEventtype:s.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,o=a.call,l=a.put;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({type:"changeLoading",payload:!0});case 2:return e.next=4,o(c.addEventtype,r);case 4:n=e.sent,u&&u(n);case 6:case"end":return e.stop()}},e,this)}),rolefetch:s.default.mark(function e(t,a){var n,r=t.payload,u=a.call,o=a.put;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({type:"changeRoleLoading",payload:!0});case 2:return e.next=4,u(c.queryAuthorizeRole,r);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,o({type:"setRoleListdata",payload:n});case 9:return e.next=11,o({type:"changeRoleLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),delRole:s.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,o=a.call;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(c.deleteAuthorRole,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),addRole:s.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,o=a.call;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(c.addAuthorizeRole,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),updataRole:s.default.mark(function e(t,a){var n,r=t.payload,u=t.callback,o=a.call;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(c.updataAuthorRole,r);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeEventLoading:function(e,t){return(0,u.default)({},e,{eventloading:t.payload})},setEventListdata:function(e,t){return(0,u.default)({},e,{eventdata:{list:t.payload.data,pagination:t.payload.eData}})},changeRoleLoading:function(e,t){return(0,u.default)({},e,{roleloading:t.payload})},setRoleListdata:function(e,t){return(0,u.default)({},e,{roledata:{list:t.payload.data,pagination:t.payload.eData}})}}},e.exports=t.default},1458:function(e,t,a){e.exports={default:a(1476),__esModule:!0}},1476:function(e,t,a){var n=a(34),r=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},1569:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.addResource=t.deleteAuthorRole=t.updataAuthorRole=t.addAuthorizeRole=t.queryAuthorizeRole=t.addEventtype=t.queryEventtypelist=void 0;var r=a(1458),u=n(r),o=a(297),s=n(o),c=a(519),l=n(c),i=(t.queryEventtypelist=function(){var e=(0,l.default)(s.default.mark(function e(t){var a,n,r;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r="page="+n+"&pageSize="+a,e.abrupt("return",(0,d.default)("/guessing/game/listGameTypes?"+r));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addEventtype=function(){var e=(0,l.default)(s.default.mark(function e(t){return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/game/createGameType",{method:"POST",contentType:"files",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryAuthorizeRole=function(){var e=(0,l.default)(s.default.mark(function e(t){var a,n,r;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.pageSize,n=t.currentPage,r="page="+n+"&pageSize="+a,e.abrupt("return",(0,d.default)("/guessing/authorize/listRoles?"+r));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addAuthorizeRole=function(){var e=(0,l.default)(s.default.mark(function e(t){return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/authorize/createRole",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updataAuthorRole=function(){var e=(0,l.default)(s.default.mark(function e(t){return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/authorize/alterRole",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.deleteAuthorRole=function(){var e=(0,l.default)(s.default.mark(function e(t){return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/authorize/removeRole?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addResource=function(){var e=(0,l.default)(s.default.mark(function e(t){return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/guessing/authorize/createRole",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(520)),d=n(i)}});