webpackJsonp([13],{1422:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r,a,i=n(518),u=o(i),l=n(2),c=o(l),f=n(8),s=o(f),p=n(4),d=o(p),h=n(5),m=o(h),y=n(517),_=o(y);n(1543);var v=n(0),E=o(v),w=n(3),g=o(w),b=n(298),k=n(1589),x=o(k),O=n(1597),C=o(O),N=n(1782),U=o(N),M=[{title:"\u5e2e\u52a9",href:""},{title:"\u9690\u79c1",href:""},{title:"\u6761\u6b3e",href:""}],T=E.default.createElement("div",null,"Copyright ",E.default.createElement(_.default,{type:"copyright"})," 2017 Win\u7814\u53d1\u56e2\u961f\u5236\u4f5c"),j=(a=r=function(e){function t(){return(0,c.default)(this,t),(0,d.default)(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,s.default)(t,[{key:"getChildContext",value:function(){return{location:this.props.location}}},{key:"getPageTitle",value:function(){var e=this.props,t=e.getRouteData,n=e.location,o=n.pathname,r="Win+ admin";return t("UserLayout").forEach(function(e){e.path===o&&(r=e.name+" - Win+ admin")}),r}},{key:"render",value:function(){var e=this.props.getRouteData;return E.default.createElement(x.default,{title:this.getPageTitle()},E.default.createElement("div",{className:U.default.container},E.default.createElement("div",{className:U.default.top},E.default.createElement("div",{className:U.default.header},E.default.createElement(b.Link,{to:"/"},E.default.createElement("img",{alt:"",className:U.default.logo,src:"../assets/logo@2x.png"}),E.default.createElement("span",{className:U.default.title},"Win+ Admin"))),E.default.createElement("div",{className:U.default.desc},"\u540e\u7aef\u7ba1\u7406\u7cfb\u7edf")),e("UserLayout").map(function(e){return E.default.createElement(b.Route,{exact:e.exact,key:e.path,path:e.path,component:e.component})}),E.default.createElement(C.default,{className:U.default.footer,links:M,copyright:T})))}}]),t}(E.default.PureComponent),r.childContextTypes={location:g.default.object},a);t.default=j,e.exports=t.default},1543:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(296);n.n(o)},1589:function(e,t,n){"use strict";function o(e){var t=e[e.length-1];if(t)return t.title}function r(e){var t=e||"";t!==document.title&&(document.title=t)}function a(){}var i=n(0),u=n(3),l=n(1590);a.prototype=Object.create(i.Component.prototype),a.displayName="DocumentTitle",a.propTypes={title:u.string.isRequired},a.prototype.render=function(){return this.props.children?i.Children.only(this.props.children):null},e.exports=l(o,r)(a)},1590:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n(0),l=o(u),c=n(1591),f=o(c),s=n(46),p=o(s);e.exports=function(e,t,n){function o(e){return e.displayName||e.name||"Component"}if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(c){function s(){h=e(d.map(function(e){return e.props})),m.canUseDOM?t(h):n&&(h=n(h))}if("function"!=typeof c)throw new Error("Expected WrappedComponent to be a React component.");var d=[],h=void 0,m=function(e){function t(){return r(this,t),a(this,e.apply(this,arguments))}return i(t,e),t.peek=function(){return h},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=h;return h=void 0,d=[],e},t.prototype.shouldComponentUpdate=function(e){return!(0,p.default)(e,this.props)},t.prototype.componentWillMount=function(){d.push(this),s()},t.prototype.componentDidUpdate=function(){s()},t.prototype.componentWillUnmount=function(){var e=d.indexOf(this);d.splice(e,1),s()},t.prototype.render=function(){return l.default.createElement(c,this.props)},t}(u.Component);return m.displayName="SideEffect("+o(c)+")",m.canUseDOM=f.default.canUseDOM,m}}},1591:function(e,t,n){var o;!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),a={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};void 0!==(o=function(){return a}.call(t,n,t,e))&&(e.exports=o)}()},1597:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=o(r),i=n(7),u=o(i),l=n(1598),c=o(l);t.default=function(e){var t=e.className,n=e.links,o=e.copyright,r=(0,u.default)(c.default.globalFooter,t);return a.default.createElement("div",{className:r},n&&a.default.createElement("div",{className:c.default.links},n.map(function(e){return a.default.createElement("a",{key:e.title,target:e.blankTarget?"_blank":"_self",href:e.href},e.title)})),o&&a.default.createElement("div",{className:c.default.copyright},o))},e.exports=t.default},1598:function(e,t){e.exports={globalFooter:"globalFooter___3DBsQ",links:"links___6ev0g",copyright:"copyright___2RCkh"}},1782:function(e,t){e.exports={container:"container___13qaB",top:"top___15P5h",header:"header___wZzTk",logo:"logo___3ETkL",title:"title___1S-Sy",desc:"desc___2SfO0",footer:"footer___1_Jtj"}}});