webpackJsonp([27],{1407:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),u=n(a),s=r(297),o=n(s),i=r(1552);t.default={namespace:"systemlist",state:{eventdata:{list:[],pagination:{}},eventloading:!1,eventtype:[],roledata:{list:[],pagination:{}},roleloading:!1},effects:{eventtypefetch:o.default.mark(function e(t,r){var n,a=t.payload,u=(t.callback,r.call),s=r.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeEventLoading",payload:!0});case 2:return e.next=4,u(i.queryEventtypelist,a);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setEventListdata",payload:n});case 9:return e.next=11,s({type:"changeEventLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),addEventtype:o.default.mark(function e(t,r){var n,a=t.payload,u=t.callback,s=r.call,c=r.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c({type:"changeLoading",payload:!0});case 2:return e.next=4,s(i.createEventtype,a);case 4:n=e.sent,u&&u(n);case 6:case"end":return e.stop()}},e,this)}),rolefetch:o.default.mark(function e(t,r){var n,a=t.payload,u=r.call,s=r.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeRoleLoading",payload:!0});case 2:return e.next=4,u(i.queryAuthorizeRole,a);case 4:if(n=e.sent,0===n.resultCode){e.next=7;break}return e.abrupt("return",!1);case 7:return e.next=9,s({type:"setRoleListdata",payload:n});case 9:return e.next=11,s({type:"changeRoleLoading",payload:!1});case 11:case"end":return e.stop()}},e,this)}),delRole:o.default.mark(function e(t,r){var n,a=t.payload,u=t.callback,s=r.call;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(i.deleteAuthorRole,a);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),addRole:o.default.mark(function e(t,r){var n,a=t.payload,u=t.callback,s=r.call;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(i.createAuthorizeRole,a);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)}),updataRole:o.default.mark(function e(t,r){var n,a=t.payload,u=t.callback,s=r.call;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(i.alertAuthorRole,a);case 2:n=e.sent,u&&u(n);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeEventLoading:function(e,t){return(0,u.default)({},e,{eventloading:t.payload})},setEventListdata:function(e,t){return(0,u.default)({},e,{eventdata:{list:t.payload.data,pagination:t.payload.eData}})},changeRoleLoading:function(e,t){return(0,u.default)({},e,{roleloading:t.payload})},setRoleListdata:function(e,t){return(0,u.default)({},e,{roledata:{list:t.payload.data,pagination:t.payload.eData}})}}},e.exports=t.default},1485:function(e,t,r){e.exports={default:r(1504),__esModule:!0}},1504:function(e,t,r){var n=r(34),a=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},1552:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setAauthorizeRoles=t.userUnAuthorizedRoles=t.userAuthorizedRoles=t.queryUserlist=t.queryPermissionslist=t.deletePermission=t.alertPermission=t.createPermission=t.deleteResource=t.queryResourceslist=t.alertResource=t.createResource=t.deleteAuthorRole=t.alertAuthorRole=t.createAuthorizeRole=t.queryAuthorizeRole=t.createEventtype=t.queryEventtypelist=void 0;var a=r(1485),u=n(a),s=r(297),o=n(s),i=r(522),c=n(i),l=(t.queryEventtypelist=function(){var e=(0,c.default)(o.default.mark(function e(t){var r,n,a;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.pageSize,n=t.currentPage,a="page="+n+"&pageSize="+r,e.abrupt("return",(0,f.default)("/guessing/web/game/listGameTypes?"+a));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createEventtype=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/game/createGameType",{method:"POST",contentType:"files",body:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryAuthorizeRole=function(){var e=(0,c.default)(o.default.mark(function e(t){var r,n,a;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.pageSize,n=t.currentPage,a="page="+n+"&pageSize="+r,e.abrupt("return",(0,f.default)("/guessing/web/authorize/listRoles?"+a));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createAuthorizeRole=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/createRole",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.alertAuthorRole=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/alterRole",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.deleteAuthorRole=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/removeRole?id="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createResource=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/createResource",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.alertResource=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/alterResource",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryResourceslist=function(){var e=(0,c.default)(o.default.mark(function e(t){var r,n,a;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.pageSize,n=t.currentPage,a="page="+n+"&pageSize="+r,e.abrupt("return",(0,f.default)("/guessing/web/authorize/listResources?"+a));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.deleteResource=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/removeResource",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.createPermission=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/createPermission",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.alertPermission=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/alterPermission",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.deletePermission=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/removePermission",{method:"POST",body:"id="+t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryPermissionslist=function(){var e=(0,c.default)(o.default.mark(function e(t){var r,n,a;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.pageSize,n=t.currentPage,a="page="+n+"&pageSize="+r,e.abrupt("return",(0,f.default)("/guessing/web/authorize/listPermissions?"+a));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryUserlist=function(){var e=(0,c.default)(o.default.mark(function e(t){var r,n,a;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.pageSize,n=t.currentPage,a="page="+n+"&pageSize="+r,e.abrupt("return",(0,f.default)("/guessing/web/user/listUsers?"+a));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.userAuthorizedRoles=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/authorizedRoles?username="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.userUnAuthorizedRoles=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/unauthorizedRoles?username="+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setAauthorizeRoles=function(){var e=(0,c.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.default)("/guessing/web/authorize/authorizeRoles",{method:"POST",contentType:"json",body:(0,u.default)(t)}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(523)),f=n(l)}});